import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@/lib/auth';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { text } = await request.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Event details text is required', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `You are an assistant that extracts structured event data from free-form text. 
Extract the information and return a JSON object with these fields:

{
  "title": "Event title (max 150 chars)",
  "subtitle": "A compelling tagline/subtitle for the event landing page (max 200 chars)",
  "description": "A brief SEO-friendly description of the event (max 200 chars, one sentence)",
  "date": "ISO 8601 datetime string (e.g. 2026-06-30T17:00:00.000Z). If only a date is given, assume 17:00 local time.",
  "timezone": "IANA timezone string (e.g. Europe/Madrid). Default to Europe/Madrid if in Spain.",
  "location": "Venue name and area (max 200 chars)",
  "heroImage": "/images/la-sala-venue.jpg",
  "highlights": [
    { "title": "Short title (max 100 chars)", "description": "Brief description (max 200 chars)" }
  ],
  "aboutHeading": "A heading for the about section (max 150 chars)",
  "aboutBody": "Detailed multi-paragraph description of the event. Include partnership details, what attendees will learn, who it's for. Use line breaks between paragraphs. (max 3000 chars)",
  "schedule": [
    { "time": "e.g. 17:00", "title": "Activity name", "description": "Brief description" }
  ],
  "ctaHeading": "A compelling call-to-action heading (max 150 chars)",
  "ctaBody": "Supporting text for the CTA banner (max 500 chars)",
  "registrationNote": "Text shown next to the registration form explaining why to register (max 500 chars)"
}

Rules:
- Extract 3-4 highlights from the key topics/benefits mentioned
- Create a compelling subtitle that would work as a sales hook
- The aboutBody should be well-written marketing copy based on the provided details
- If a schedule is mentioned, extract time slots. If not explicit, create logical ones from the event flow
- The ctaHeading should highlight the main value proposition (e.g. a commission percentage, a key benefit)
- Make the registrationNote create urgency (limited places, exclusive event, etc.)
- If information is not available, use empty string "" for text fields and empty array [] for arrays
- Always return valid JSON`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Failed to parse event details', code: 'PARSE_ERROR' },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error parsing event with AI:', error);
    return NextResponse.json(
      { error: 'Failed to parse event details', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
