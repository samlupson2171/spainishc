import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { leadSchema } from '@/lib/schema';
import { sendLeadNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const db = await getDb();
    const leads = db.collection('leads');

    const lead = {
      ...validatedData,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await leads.insertOne(lead);

    // Send email notification via Resend
    await sendLeadNotification(validatedData);

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDb();
    const leads = db.collection('leads');

    const query = status ? { status } : {};
    const results = await leads
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
