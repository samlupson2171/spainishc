import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { eventSchema } from '@/lib/eventSchema';
import { getEventById, updateEvent, deleteEvent } from '@/lib/eventDb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const event = await getEventById(id);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found', code: 'EVENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await getEventById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Event not found', code: 'EVENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // If only updating status (publish/unpublish toggle), skip full validation
    if (body.status && Object.keys(body).length === 1) {
      if (body.status !== 'draft' && body.status !== 'published') {
        return NextResponse.json(
          { error: 'Invalid status value', code: 'VALIDATION_ERROR' },
          { status: 400 }
        );
      }
      await updateEvent(id, { status: body.status });
      return NextResponse.json({ success: true });
    }

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

    await updateEvent(id, { ...parsed.data, ...(body.status && { status: body.status }) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await getEventById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Event not found', code: 'EVENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    await deleteEvent(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
