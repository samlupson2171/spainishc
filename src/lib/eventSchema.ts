import { z } from 'zod';

// --- Zod Validation Schemas ---

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150, 'Title must be 150 characters or less'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be 2000 characters or less'),
  date: z.string().datetime({ message: 'Valid date and time required' }),
  timezone: z.string().min(1, 'Timezone is required'),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be 200 characters or less'),
  // Landing page content fields
  subtitle: z.string().max(200, 'Subtitle must be 200 characters or less'),
  heroImage: z.string().max(500, 'Image path must be 500 characters or less'),
  highlights: z.array(z.object({
    title: z.string().max(100),
    description: z.string().max(200),
  })),
  aboutHeading: z.string().max(150, 'About heading must be 150 characters or less'),
  aboutBody: z.string().max(3000, 'About body must be 3000 characters or less'),
  schedule: z.array(z.object({
    time: z.string().max(50),
    title: z.string().max(100),
    description: z.string().max(200),
  })),
  ctaHeading: z.string().max(150, 'CTA heading must be 150 characters or less'),
  ctaBody: z.string().max(500, 'CTA body must be 500 characters or less'),
  registrationNote: z.string().max(500, 'Registration note must be 500 characters or less'),
});

export const registrationSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be 100 characters or less'),
  email: z.string().email('Please enter a valid email address').max(254),
  phone: z.string().regex(
    /^\+?\d{7,15}$/,
    'Phone number must be 7-15 digits, optionally prefixed with a country code'
  ),
});

// --- Inferred Types ---

export type EventFormData = z.infer<typeof eventSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;

// --- Database Interfaces ---

export interface Event extends EventFormData {
  _id: string;
  slug: string;
  status: 'draft' | 'published';
  registrationCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  _id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'cancelled';
  referenceId: string;
  confirmationEmailSent: boolean;
  confirmationEmailError: boolean;
  remindersSent: {
    sevenDay: boolean;
    oneDay: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

// --- Utility Functions ---

/**
 * Generates a registration reference ID in the format EVT-YYYYMMDD-XXXX
 * where YYYYMMDD is the event date and XXXX is 4 random uppercase alphanumeric chars.
 */
export function generateReferenceId(eventDate: Date): string {
  const year = eventDate.getFullYear();
  const month = String(eventDate.getMonth() + 1).padStart(2, '0');
  const day = String(eventDate.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `EVT-${datePart}-${randomPart}`;
}

/**
 * Generates a URL-friendly slug from an event title.
 * Converts to lowercase, replaces non-alphanumeric characters with hyphens,
 * collapses multiple hyphens, and trims leading/trailing hyphens.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
