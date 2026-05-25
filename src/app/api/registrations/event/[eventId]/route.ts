import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { listRegistrations } from '@/lib/eventDb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { eventId } = await params;
    const registrations = await listRegistrations(eventId);

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
