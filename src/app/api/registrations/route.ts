import { NextRequest, NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/eventSchema';
import { getEventById, checkDuplicateRegistration, createRegistration } from '@/lib/eventDb';
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/eventEmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body with Zod schema
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message, code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const { eventId, name, email, phone } = parsed.data;

    // Check event exists and is published
    const event = await getEventById(eventId);
    if (!event || event.status !== 'published') {
      return NextResponse.json(
        { error: 'Event not found', code: 'EVENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check event date is in the future
    const eventDate = new Date(event.date);
    if (eventDate <= new Date()) {
      return NextResponse.json(
        { error: 'Registration is closed for past events', code: 'EVENT_PAST' },
        { status: 400 }
      );
    }

    // Check duplicate email+event
    const isDuplicate = await checkDuplicateRegistration(eventId, email);
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'This email is already registered for this event', code: 'DUPLICATE_REGISTRATION' },
        { status: 409 }
      );
    }

    // Create the registration
    const registration = await createRegistration(
      { eventId, name, email, phone },
      eventDate
    );

    // Trigger emails asynchronously (don't block response)
    sendConfirmationEmail(registration, event).catch((err) => {
      console.error('Error sending confirmation email:', err);
    });
    sendAdminNotification(registration, event).catch((err) => {
      console.error('Error sending admin notification:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully registered for ${event.title}. A confirmation email has been sent to ${email}.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: 'Failed to create registration', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
