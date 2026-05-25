import { NextRequest, NextResponse } from 'next/server';
import {
  listEvents,
  getRegistrationsForReminder,
  markReminderSent,
} from '@/lib/eventDb';
import { sendReminderEmail } from '@/lib/eventEmail';
import { Event, Registration } from '@/lib/eventSchema';

/**
 * POST /api/cron/reminders
 *
 * Cron endpoint that sends event reminder emails.
 * - 7-day reminders for events within the next 7 days + buffer
 * - 1-day reminders for events within the next 1 day + buffer
 * - Skips draft (unpublished) events
 * - Handles late registrations by marking sevenDay as sent and only sending 1-day reminder
 *
 * Authenticated via CRON_SECRET in Authorization: Bearer header.
 * Configured to run daily at 09:00 UTC via Vercel Cron (vercel.json).
 */
export async function POST(request: NextRequest) {
  // --- Authentication ---
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error('CRON_SECRET environment variable is not configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  const now = new Date();
  // Buffer of 1 hour to account for scheduling variance
  const bufferMs = 60 * 60 * 1000;

  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const oneDayMs = 24 * 60 * 60 * 1000;

  const sevenDayWindowEnd = new Date(now.getTime() + sevenDaysMs + bufferMs);
  const oneDayWindowEnd = new Date(now.getTime() + oneDayMs + bufferMs);

  const summary: {
    sevenDay: { eventId: string; eventTitle: string; sent: number; failed: number }[];
    oneDay: { eventId: string; eventTitle: string; sent: number; failed: number }[];
    lateRegistrations: { registrationId: string; eventId: string; markedSevenDay: boolean }[];
  } = {
    sevenDay: [],
    oneDay: [],
    lateRegistrations: [],
  };

  try {
    // --- Fetch published events ---
    const allPublishedEvents = await listEvents({ status: 'published' });

    // --- 7-Day Reminder Window ---
    // Events with dates between now and now + 7 days + buffer
    const sevenDayEvents = allPublishedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate > now && eventDate <= sevenDayWindowEnd;
    });

    if (sevenDayEvents.length > 0) {
      const sevenDayEventIds = sevenDayEvents.map((e) => e._id);
      const registrations = await getRegistrationsForReminder('sevenDay', sevenDayEventIds);

      // Group registrations by eventId for summary
      const eventMap = new Map<string, Event>();
      for (const event of sevenDayEvents) {
        eventMap.set(event._id, event);
      }

      // Process each registration
      const eventCounts: Record<string, { sent: number; failed: number }> = {};

      for (const registration of registrations) {
        const event = eventMap.get(registration.eventId);
        if (!event) continue;

        if (!eventCounts[event._id]) {
          eventCounts[event._id] = { sent: 0, failed: 0 };
        }

        const result = await sendReminderEmail(registration, event, 'sevenDay');
        if (result.success) {
          await markReminderSent(registration._id, 'sevenDay');
          eventCounts[event._id].sent++;
        } else {
          eventCounts[event._id].failed++;
        }
      }

      // Build summary for 7-day reminders
      for (const [eventId, counts] of Object.entries(eventCounts)) {
        const event = eventMap.get(eventId);
        summary.sevenDay.push({
          eventId,
          eventTitle: event?.title || 'Unknown',
          sent: counts.sent,
          failed: counts.failed,
        });
      }
    }

    // --- 1-Day Reminder Window ---
    // Events with dates between now and now + 1 day + buffer
    const oneDayEvents = allPublishedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate > now && eventDate <= oneDayWindowEnd;
    });

    if (oneDayEvents.length > 0) {
      const oneDayEventIds = oneDayEvents.map((e) => e._id);
      const registrations = await getRegistrationsForReminder('oneDay', oneDayEventIds);

      // Group registrations by eventId for summary
      const eventMap = new Map<string, Event>();
      for (const event of oneDayEvents) {
        eventMap.set(event._id, event);
      }

      // Process each registration
      const eventCounts: Record<string, { sent: number; failed: number }> = {};

      for (const registration of registrations) {
        const event = eventMap.get(registration.eventId);
        if (!event) continue;

        if (!eventCounts[event._id]) {
          eventCounts[event._id] = { sent: 0, failed: 0 };
        }

        // Handle late registrations: if the 7-day window has already passed
        // and sevenDay reminder hasn't been sent, mark it as sent to prevent future sends
        await handleLateRegistration(registration, event, now, sevenDaysMs, bufferMs, summary);

        const result = await sendReminderEmail(registration, event, 'oneDay');
        if (result.success) {
          await markReminderSent(registration._id, 'oneDay');
          eventCounts[event._id].sent++;
        } else {
          eventCounts[event._id].failed++;
        }
      }

      // Build summary for 1-day reminders
      for (const [eventId, counts] of Object.entries(eventCounts)) {
        const event = eventMap.get(eventId);
        summary.oneDay.push({
          eventId,
          eventTitle: event?.title || 'Unknown',
          sent: counts.sent,
          failed: counts.failed,
        });
      }
    }

    // --- Log Summary ---
    const totalSevenDaySent = summary.sevenDay.reduce((acc, e) => acc + e.sent, 0);
    const totalSevenDayFailed = summary.sevenDay.reduce((acc, e) => acc + e.failed, 0);
    const totalOneDaySent = summary.oneDay.reduce((acc, e) => acc + e.sent, 0);
    const totalOneDayFailed = summary.oneDay.reduce((acc, e) => acc + e.failed, 0);

    console.log('Reminder scheduler completed:', {
      sevenDay: { sent: totalSevenDaySent, failed: totalSevenDayFailed, events: summary.sevenDay },
      oneDay: { sent: totalOneDaySent, failed: totalOneDayFailed, events: summary.oneDay },
      lateRegistrations: summary.lateRegistrations.length,
    });

    return NextResponse.json({
      success: true,
      summary: {
        sevenDay: { sent: totalSevenDaySent, failed: totalSevenDayFailed },
        oneDay: { sent: totalOneDaySent, failed: totalOneDayFailed },
        lateRegistrations: summary.lateRegistrations.length,
      },
    });
  } catch (error) {
    console.error('Reminder scheduler error:', error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

/**
 * Handles late registrations: if a registration was created after the 7-day window
 * has passed (i.e., the event is less than 7 days away and sevenDay hasn't been sent),
 * mark sevenDay as sent to prevent future sends. Only the 1-day reminder will be sent.
 */
async function handleLateRegistration(
  registration: Registration,
  event: Event,
  now: Date,
  sevenDaysMs: number,
  bufferMs: number,
  summary: { lateRegistrations: { registrationId: string; eventId: string; markedSevenDay: boolean }[] }
): Promise<void> {
  const eventDate = new Date(event.date);
  const sevenDayWindowStart = new Date(eventDate.getTime() - sevenDaysMs - bufferMs);

  // If the registration hasn't had sevenDay sent and the 7-day window has already passed
  // (i.e., the registration was created after the 7-day window or the scheduler missed it)
  if (!registration.remindersSent.sevenDay) {
    // The 7-day window has passed if we're now within 7 days of the event
    // and this registration hasn't received the sevenDay reminder
    const sevenDayWindowPassed = now > sevenDayWindowStart;

    if (sevenDayWindowPassed) {
      // Mark sevenDay as sent to prevent future sends
      await markReminderSent(registration._id, 'sevenDay');
      summary.lateRegistrations.push({
        registrationId: registration._id,
        eventId: event._id,
        markedSevenDay: true,
      });
    }
  }
}
