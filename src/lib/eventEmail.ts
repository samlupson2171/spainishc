import { Resend } from 'resend';
import { ObjectId } from 'mongodb';
import { getDb } from './mongodb';
import { Event, Registration } from './eventSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAILS = ['david@spanishconveyancing.es', 'damian@spanishconveyancing.es'];
const SENDER = 'Spanish Conveyancing <noreply@spanishconveyancing.es>';

// --- Helper Functions ---

/**
 * Waits for the specified number of milliseconds.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats a date for display in emails using the event's timezone.
 * Returns an object with formatted date and time strings.
 */
function formatEventDateTime(dateStr: string, timezone: string) {
  const date = new Date(dateStr);

  const dateFormatted = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timezone,
  });

  const timeFormatted = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });

  return { dateFormatted, timeFormatted };
}

/**
 * Formats a timestamp for admin notification in "DD MMM YYYY, HH:MM timezone" format.
 */
export function formatAdminTimestamp(date: Date, timezone: string): string {
  // Get the date parts in the specified timezone
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).formatToParts(date);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const dayPart = getPart('day');
  const monthPart = getPart('month');
  const yearPart = getPart('year');
  const hourPart = getPart('hour');
  const minutePart = getPart('minute');

  return `${dayPart} ${monthPart} ${yearPart}, ${hourPart}:${minutePart} ${timezone}`;
}

/**
 * Marks a registration as having a confirmation email error.
 */
async function markConfirmationEmailError(registrationId: string): Promise<void> {
  const db = await getDb();

  await db.collection('registrations').updateOne(
    { _id: new ObjectId(registrationId) },
    {
      $set: {
        confirmationEmailError: true,
        updatedAt: new Date(),
      },
    }
  );
}

/**
 * Marks a registration's confirmation email as sent.
 */
async function markConfirmationEmailSent(registrationId: string): Promise<void> {
  const db = await getDb();

  await db.collection('registrations').updateOne(
    { _id: new ObjectId(registrationId) },
    {
      $set: {
        confirmationEmailSent: true,
        updatedAt: new Date(),
      },
    }
  );
}

// --- Email Functions ---

/**
 * Sends a confirmation email to the attendee with event details and registration reference.
 * Retry logic: on failure, waits up to 30s and retries once.
 * If retry fails, marks confirmationEmailError: true on the registration.
 */
export async function sendConfirmationEmail(
  registration: Registration,
  event: Event
): Promise<{ success: boolean }> {
  const { dateFormatted, timeFormatted } = formatEventDateTime(event.date, event.timezone);

  const html = `
    <h2>Registration Confirmed</h2>
    <p>Hi ${registration.name},</p>
    <p>Thank you for registering for <strong>${event.title}</strong>.</p>
    <h3>Event Details</h3>
    <ul>
      <li><strong>Date:</strong> ${dateFormatted}</li>
      <li><strong>Time:</strong> ${timeFormatted}</li>
      <li><strong>Location:</strong> ${event.location}</li>
      <li><strong>Timezone:</strong> ${event.timezone}</li>
    </ul>
    <p><strong>Your Registration Reference:</strong> ${registration.referenceId}</p>
    <p>We look forward to seeing you there!</p>
    <p>Best regards,<br/>Spanish Conveyancing</p>
  `;

  // First attempt
  try {
    const { error } = await resend.emails.send({
      from: SENDER,
      to: [registration.email],
      subject: `Registration Confirmed: ${event.title}`,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    await markConfirmationEmailSent(registration._id);
    return { success: true };
  } catch (err) {
    console.error('Confirmation email failed (attempt 1):', err);
  }

  // Retry after delay (up to 30s)
  await delay(30000);

  try {
    const { error } = await resend.emails.send({
      from: SENDER,
      to: [registration.email],
      subject: `Registration Confirmed: ${event.title}`,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    await markConfirmationEmailSent(registration._id);
    return { success: true };
  } catch (err) {
    console.error('Confirmation email failed (attempt 2):', err);
    await markConfirmationEmailError(registration._id);
    return { success: false };
  }
}

/**
 * Sends an admin notification email when a new registration is received.
 * Retry logic: on failure, retries once.
 */
export async function sendAdminNotification(
  registration: Registration,
  event: Event
): Promise<{ success: boolean }> {
  const timestamp = formatAdminTimestamp(registration.createdAt, event.timezone);

  const html = `
    <h2>New Event Registration</h2>
    <p>A new registration has been received for <strong>${event.title}</strong>.</p>
    <h3>Attendee Details</h3>
    <ul>
      <li><strong>Name:</strong> ${registration.name}</li>
      <li><strong>Email:</strong> ${registration.email}</li>
      <li><strong>Phone:</strong> ${registration.phone}</li>
    </ul>
    <p><strong>Event:</strong> ${event.title}</p>
    <p><strong>Registered:</strong> ${timestamp}</p>
  `;

  // First attempt
  try {
    const { error } = await resend.emails.send({
      from: SENDER,
      to: NOTIFICATION_EMAILS,
      subject: `New Registration: ${event.title} - ${registration.name}`,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (err) {
    console.error('Admin notification failed (attempt 1):', err);
  }

  // Retry once
  try {
    const { error } = await resend.emails.send({
      from: SENDER,
      to: NOTIFICATION_EMAILS,
      subject: `New Registration: ${event.title} - ${registration.name}`,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (err) {
    console.error('Admin notification failed (attempt 2, final):', err);
    return { success: false };
  }
}

/**
 * Sends a reminder email to an attendee about an upcoming event.
 * Retry logic: on failure, retries up to 3 times with 5-minute intervals.
 * If all retries fail, logs failure with attendee email, event ID, and reason.
 */
export async function sendReminderEmail(
  registration: Registration,
  event: Event,
  type: 'sevenDay' | 'oneDay'
): Promise<{ success: boolean }> {
  const { dateFormatted, timeFormatted } = formatEventDateTime(event.date, event.timezone);
  const eventUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://spanishconveyancing.es'}/events/${event.slug}`;

  const subjectPrefix = type === 'sevenDay' ? 'Reminder: 1 Week Until' : 'Reminder: Tomorrow';
  const reminderText = type === 'sevenDay'
    ? 'This is a friendly reminder that the following event is taking place in one week:'
    : 'This is a friendly reminder that the following event is taking place tomorrow:';

  const html = `
    <h2>${subjectPrefix}: ${event.title}</h2>
    <p>Hi ${registration.name},</p>
    <p>${reminderText}</p>
    <h3>Event Details</h3>
    <ul>
      <li><strong>Event:</strong> ${event.title}</li>
      <li><strong>Date:</strong> ${dateFormatted}</li>
      <li><strong>Time:</strong> ${timeFormatted}</li>
      <li><strong>Location:</strong> ${event.location}</li>
    </ul>
    <p><a href="${eventUrl}">View Event Details</a></p>
    <p>We look forward to seeing you there!</p>
    <p>Best regards,<br/>Spanish Conveyancing</p>
  `;

  const maxRetries = 3;
  const retryInterval = 5 * 60 * 1000; // 5 minutes

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { error } = await resend.emails.send({
        from: SENDER,
        to: [registration.email],
        subject: `${subjectPrefix}: ${event.title}`,
        html,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.error(
        `Reminder email failed (attempt ${attempt}/${maxRetries}):`,
        { attendeeEmail: registration.email, eventId: event._id, reason }
      );

      if (attempt < maxRetries) {
        await delay(retryInterval);
      } else {
        // All retries exhausted — log final failure
        console.error(
          'Reminder email delivery failed after all retries:',
          {
            attendeeEmail: registration.email,
            eventId: event._id,
            reason,
            type,
          }
        );
        return { success: false };
      }
    }
  }

  return { success: false };
}
