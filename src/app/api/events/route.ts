import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { eventSchema } from '@/lib/eventSchema';
import { createEvent, listEvents } from '@/lib/eventDb';

export async function GET() {
  try {
    const session = await auth();

    if (session) {
      // Admin: return all events
      const events = await listEvents();
      return NextResponse.json(events);
    }

    // Public: return only published events sorted by date descending
    const events = await listEvents({ status: 'published' });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message, code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    // Check that the event date is in the future
    const eventDate = new Date(parsed.data.date);
    if (eventDate <= new Date()) {
      return NextResponse.json(
        { error: 'Event date must be in the future', code: 'EVENT_PAST' },
        { status: 400 }
      );
    }

    const event = await createEvent(parsed.data);

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
