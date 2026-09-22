import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { deleteSiteContent, getSiteContent, setSiteContent } from '@/lib/siteContent';

const keyPattern = /^[a-z0-9][a-z0-9._-]{1,119}$/;

export async function GET() {
  try {
    return NextResponse.json(await getSiteContent());
  } catch (error) {
    console.error('Error fetching site content:', error);
    return NextResponse.json({ error: 'Failed to fetch site content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const key = typeof body.key === 'string' ? body.key.trim() : '';
    const value = typeof body.value === 'string' ? body.value.trim() : '';

    if (!keyPattern.test(key)) {
      return NextResponse.json({ error: 'Invalid content key' }, { status: 400 });
    }
    if (!value || value.length > 5000) {
      return NextResponse.json({ error: 'Content must be between 1 and 5,000 characters' }, { status: 400 });
    }

    await setSiteContent(key, value, session.user?.email ?? undefined);
    return NextResponse.json({ key, value });
  } catch (error) {
    console.error('Error updating site content:', error);
    return NextResponse.json({ error: 'Failed to update site content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const key = request.nextUrl.searchParams.get('key')?.trim() ?? '';
    if (!keyPattern.test(key)) {
      return NextResponse.json({ error: 'Invalid content key' }, { status: 400 });
    }

    await deleteSiteContent(key);
    return NextResponse.json({ key });
  } catch (error) {
    console.error('Error resetting site content:', error);
    return NextResponse.json({ error: 'Failed to reset site content' }, { status: 500 });
  }
}
