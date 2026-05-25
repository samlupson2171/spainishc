# Implementation Plan

## Overview

This plan implements the Event Registration feature for the spanish-conveyancing website. It covers database schemas, API routes, public event landing pages, admin management UI, email notifications, and a cron-based reminder scheduler. Tasks are ordered by dependency — foundational modules first, then API routes, then UI components, then the scheduler.

## Tasks

- [x] 1. Create Zod validation schemas and TypeScript types for events and registrations
  - Create `src/lib/eventSchema.ts` with Zod schema for event creation/editing (title max 150 chars, description max 2000 chars, date as ISO datetime string, timezone as IANA string, location max 200 chars)
  - Add Zod schema for registration submission (eventId required, name 2-100 chars, email valid format max 254 chars, phone regex `^\+?\d{7,15}$`)
  - Export TypeScript types `EventFormData` and `RegistrationFormData` inferred from schemas
  - Define `Event` interface with `_id`, `slug`, `status` ('draft' | 'published'), `registrationCount`, `createdAt`, `updatedAt` fields
  - Define `Registration` interface with `_id`, `eventId`, `status` ('active' | 'cancelled'), `referenceId`, `confirmationEmailSent`, `confirmationEmailError`, `remindersSent` ({ sevenDay, oneDay }), `createdAt`, `updatedAt` fields
  - Add `generateReferenceId(eventDate: Date)` utility function that produces format `EVT-YYYYMMDD-XXXX` (4 random uppercase alphanumeric chars)
  - Add `generateSlug(title: string)` utility function that produces URL-friendly slugs from event titles
  - **Requirements:** 2.1, 6.2

- [x] 2. Create database access module for events and registrations
  - Create `src/lib/eventDb.ts` importing `getDb` from existing `mongodb.ts`
  - Implement `createEvent(data: EventFormData)` — inserts event with auto-generated slug, status 'draft', registrationCount 0, timestamps
  - Implement `updateEvent(id: string, data: Partial<EventFormData> & { status?: string })` — updates event fields and `updatedAt`
  - Implement `deleteEvent(id: string)` — deletes event and all associated registrations (cascade)
  - Implement `getEventBySlug(slug: string)` — returns published event by slug or null
  - Implement `getEventById(id: string)` — returns event by ObjectId
  - Implement `listEvents(filter?: { status?: string })` — returns events sorted by date descending
  - Implement `createRegistration(data: RegistrationFormData, eventDate: Date)` — inserts registration with generated referenceId, status 'active', remindersSent defaults, increments event registrationCount
  - Implement `checkDuplicateRegistration(eventId: string, email: string)` — returns boolean
  - Implement `listRegistrations(eventId: string, status?: string)` — returns registrations sorted by createdAt descending
  - Implement `cancelRegistration(id: string)` — sets status to 'cancelled', decrements event registrationCount
  - Implement `getRegistrationsForReminder(type: 'sevenDay' | 'oneDay', eventIds: string[])` — returns active registrations that haven't received the specified reminder type
  - Implement `markReminderSent(registrationId: string, type: 'sevenDay' | 'oneDay')` — updates remindersSent flag
  - Add index creation helper `ensureEventIndexes()` for slug (unique), status+date, and registration compound indexes
  - **Requirements:** 2.2, 2.6, 6.1, 6.3, 6.5, 6.6, 7.1, 7.4, 7.7, 8.1

- [x] 3. Create email service module for event-related emails
  - Create `src/lib/eventEmail.ts` importing Resend client pattern from existing `email.ts`
  - Implement `sendConfirmationEmail(registration, event)` — sends email to attendee with event title, date, time, location, timezone, attendee name greeting, and registration referenceId
  - Implement `sendAdminNotification(registration, event)` — sends email to admin addresses with attendee name, email, phone, event title, and formatted timestamp ("DD MMM YYYY, HH:MM timezone")
  - Implement `sendReminderEmail(registration, event, type: 'sevenDay' | 'oneDay')` — sends reminder with event title, date, time, location, and link to event page
  - Add retry logic for confirmation email: on failure, wait up to 30s and retry once; if retry fails, mark `confirmationEmailError: true` on registration
  - Add retry logic for admin notification: on failure, retry once
  - Add retry logic for reminder emails: on failure, retry up to 3 times with 5-minute intervals; log failure with attendee email, event ID, and reason if all retries fail
  - Use admin notification emails from existing `NOTIFICATION_EMAILS` constant pattern (david@spanishconveyancing.es, damian@spanishconveyancing.es)
  - Use sender address `Spanish Conveyancing <noreply@spanishconveyancing.es>` consistent with existing email module
  - **Requirements:** 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.3, 5.5

- [x] 4. Create Events API routes (CRUD)
  - Create `src/app/api/events/route.ts` with GET handler — if authenticated admin session, return all events; otherwise return only published events sorted by date descending
  - Add POST handler to `src/app/api/events/route.ts` — requires admin session, validates with eventSchema, checks date is in future, calls `createEvent`, returns 201
  - Create `src/app/api/events/[id]/route.ts` with GET handler — returns event by ID (admin only)
  - Add PUT handler to `src/app/api/events/[id]/route.ts` — requires admin session, validates with eventSchema, checks date is in future, calls `updateEvent`
  - Add DELETE handler to `src/app/api/events/[id]/route.ts` — requires admin session, calls `deleteEvent` (cascading delete of registrations)
  - Create `src/app/api/events/slug/[slug]/route.ts` with GET handler — returns published event by slug (public), returns 404 if not found or draft
  - Return consistent error responses using `{ error, code }` format with appropriate HTTP status codes (400, 401, 404, 500)
  - Use `auth()` from existing `src/lib/auth.ts` for session checking on admin-only routes
  - **Requirements:** 6.3, 6.5, 6.6, 6.7, 6.8, 8.3

- [x] 5. Create Registrations API routes
  - Create `src/app/api/registrations/route.ts` with POST handler — validates with registrationSchema, checks event exists and is published, checks event date is in future, checks duplicate email+event, calls `createRegistration`
  - After successful registration insert, trigger `sendConfirmationEmail` and `sendAdminNotification` asynchronously (don't block response)
  - Return 201 with success message including event name and registered email on success
  - Return 409 with `DUPLICATE_REGISTRATION` code if email already registered for event
  - Return 400 with `EVENT_PAST` code if event date has passed
  - Create `src/app/api/registrations/event/[eventId]/route.ts` with GET handler — requires admin session, returns registrations for event sorted by createdAt descending
  - Create `src/app/api/registrations/[id]/route.ts` with PATCH handler — requires admin session, calls `cancelRegistration`, returns updated registration
  - **Requirements:** 2.2, 2.3, 2.6, 2.7, 3.1, 4.1, 7.1, 7.4

- [x] 6. Create public event landing page
  - Create `src/app/(marketing)/events/[slug]/page.tsx` as a server component that fetches event data via `getEventBySlug`
  - Display event title, description, date, time, location, and timezone
  - If event date is in the future, render the `RegistrationForm` component below event details
  - If event date has passed, render the `EventClosedBanner` component instead of the form
  - Return Next.js `notFound()` if event doesn't exist or has status 'draft'
  - Display an error message if event data fails to load (try/catch around data fetch)
  - Create `src/components/events/EventClosedBanner.tsx` — displays "Registration for this event is now closed" message
  - Add appropriate metadata (title, description) for SEO using Next.js `generateMetadata`
  - **Requirements:** 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 8.3, 8.5

- [x] 7. Create registration form component
  - Create `src/components/events/RegistrationForm.tsx` as a client component ('use client')
  - Use react-hook-form with @hookform/resolvers/zod and the registrationSchema (excluding eventId which is passed as prop)
  - Render input fields for full name, email address, and phone number with labels and placeholders
  - Display inline validation errors below each field on submit (without clearing other fields)
  - On successful submission, POST to `/api/registrations` with form data + eventId prop
  - Display success confirmation message with event name and registered email after successful registration
  - Display server error messages (duplicate registration, event past, system error) as a banner above the form without clearing form data
  - Display loading state on submit button while request is in progress
  - Style with Tailwind CSS consistent with existing site design
  - **Requirements:** 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7

- [x] 8. Create admin events list page
  - Create `src/app/dashboard/events/page.tsx` — fetches all events from `/api/events` (with admin session)
  - Display events in a table/list with columns: title, date, status (draft/published badge), registration count
  - Sort events by date descending (most recent first)
  - Add "Create Event" button linking to `/dashboard/events/new`
  - Add action buttons per event: Edit (link to `/dashboard/events/[id]/edit`), View Registrations (link to `/dashboard/events/[id]/registrations`), Delete (with confirmation prompt), Publish/Unpublish toggle
  - Implement delete with confirmation dialog — on confirm, DELETE to `/api/events/[id]`
  - Implement publish/unpublish toggle — on click, PUT to `/api/events/[id]` with updated status
  - Display current publication status badge for each event (draft = grey, published = green)
  - Add navigation link to events in the dashboard (update dashboard page or layout if needed)
  - **Requirements:** 6.1, 6.6, 8.1, 8.2, 8.4, 8.6

- [x] 9. Create admin event create/edit pages and form component
  - Create `src/components/admin/EventForm.tsx` — shared form component using react-hook-form + zod eventSchema
  - Form fields: title (text input, max 150), description (textarea, max 2000), date (datetime-local input), timezone (select with common IANA timezones), location (text input, max 200)
  - Display inline validation errors for each field (required, max length, past date)
  - Add client-side validation that date must be in the future
  - Accept optional `defaultValues` prop for edit mode (pre-populates form)
  - Accept `onSubmit` callback prop that receives validated form data
  - Create `src/app/dashboard/events/new/page.tsx` — renders EventForm, on submit POSTs to `/api/events`, redirects to events list on success
  - Create `src/app/dashboard/events/[id]/edit/page.tsx` — fetches event by ID, renders EventForm with defaultValues, on submit PUTs to `/api/events/[id]`, redirects to events list on success
  - Display server-side validation errors (e.g., duplicate slug) as banner above form
  - **Requirements:** 6.2, 6.3, 6.4, 6.5, 6.7, 6.8

- [x] 10. Create admin registrations management page
  - Create `src/app/dashboard/events/[id]/registrations/page.tsx` — fetches event details and registrations from API
  - Display event title and total active registration count at the top
  - Create `src/components/admin/RegistrationTable.tsx` — table with columns: name, email, phone, registration date, status, actions
  - Sort registrations by registration date descending (most recent first)
  - Display "No registrations yet" message when event has zero registrations
  - Add "Cancel Registration" button for each active registration
  - Implement cancel with confirmation dialog — on confirm, PATCH to `/api/registrations/[id]`
  - Display success message after successful cancellation
  - Display error message if cancellation fails
  - Update active registration count immediately after cancellation (optimistic or refetch)
  - Add "Back to Events" link
  - **Requirements:** 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7

- [x] 11. Create reminder scheduler cron endpoint
  - Create `src/app/api/cron/reminders/route.ts` with POST handler
  - Authenticate cron requests using a `CRON_SECRET` environment variable (compare against `Authorization: Bearer <secret>` header)
  - Query events that are published and have dates within the 7-day window (between now and now + 7 days + buffer)
  - For events in the 7-day window, get active registrations that haven't received the sevenDay reminder, send reminder emails, mark as sent
  - Query events that are published and have dates within the 1-day window (between now and now + 1 day + buffer)
  - For events in the 1-day window, get active registrations that haven't received the oneDay reminder, send reminder emails, mark as sent
  - Skip events with status 'draft' (unpublished events don't get reminders)
  - For late registrations (registered after 7-day window passed), only send 1-day reminder — mark sevenDay as sent to prevent future sends
  - Log summary of reminders sent (count per event, any failures)
  - Create `vercel.json` with cron configuration to run the endpoint daily (e.g., every day at 09:00 UTC)
  - **Requirements:** 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 8.4

- [x] 12. Add environment variables and database indexes setup
  - Add `CRON_SECRET` to `.env.local` (generate a random secret)
  - Create `src/lib/setupIndexes.ts` script that creates all required MongoDB indexes: events slug (unique), events status+date, registrations eventId+email (unique compound), registrations eventId+status, registrations reminder query indexes
  - Add a note in README or create a setup script that runs `ensureEventIndexes()` on first deployment
  - Verify `RESEND_API_KEY` and `MONGODB_URI` are already configured in `.env.local`
  - Add `CRON_SECRET` to the vercel.json or document it for Vercel environment variables
  - **Requirements:** 2.6, 5.1, 5.2

## Task Dependency Graph

```json
{
  "waves": [
    [1, 12],
    [2, 3],
    [4, 5],
    [6, 7, 8, 9, 10, 11]
  ]
}
```

## Notes

- The project uses Next.js 16 with App Router, MongoDB, Resend, NextAuth, react-hook-form, and Zod — all already installed.
- Admin routes are under `/dashboard/` and protected by NextAuth session (existing pattern).
- Public pages use the `(marketing)` route group with shared Header/Footer layout.
- Email sender and admin notification addresses follow the existing `src/lib/email.ts` pattern.
- The reminder scheduler uses Vercel Cron Jobs to avoid additional infrastructure.
- No new npm dependencies are required — all libraries are already in package.json.
