import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { cancelRegistration } from '@/lib/eventDb';

export async function PATCH(
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

    await cancelRegistration(id);

    return NextResponse.json({ success: true, message: 'Registration cancelled' });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
