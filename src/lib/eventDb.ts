import { ObjectId } from 'mongodb';
import { getDb } from './mongodb';
import {
  EventFormData,
  RegistrationFormData,
  Event,
  Registration,
  generateReferenceId,
  generateSlug,
} from './eventSchema';

// --- Event Functions ---

/**
 * Creates a new event with auto-generated slug, draft status, and timestamps.
 */
export async function createEvent(data: EventFormData): Promise<Event> {
  const db = await getDb();
  const now = new Date();
  const slug = generateSlug(data.title);

  const doc = {
    ...data,
    slug,
    status: 'draft' as const,
    registrationCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection('events').insertOne(doc);

  return {
    ...doc,
    _id: result.insertedId.toString(),
  };
}

/**
 * Updates an event's fields and updatedAt timestamp.
 */
export async function updateEvent(
  id: string,
  data: Partial<EventFormData> & { status?: string }
): Promise<void> {
  const db = await getDb();

  await db.collection('events').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    }
  );
}

/**
 * Deletes an event and all associated registrations (cascade delete).
 */
export async function deleteEvent(id: string): Promise<void> {
  const db = await getDb();

  await db.collection('registrations').deleteMany({ eventId: new ObjectId(id) });
  await db.collection('events').deleteOne({ _id: new ObjectId(id) });
}

/**
 * Returns a published event by its slug, or null if not found or not published.
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const db = await getDb();

  const doc = await db.collection('events').findOne({ slug, status: 'published' });

  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id.toString(),
  } as Event;
}

/**
 * Returns an event by its ObjectId, or null if not found.
 */
export async function getEventById(id: string): Promise<Event | null> {
  const db = await getDb();

  const doc = await db.collection('events').findOne({ _id: new ObjectId(id) });

  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id.toString(),
  } as Event;
}

/**
 * Returns events sorted by date descending, optionally filtered by status.
 */
export async function listEvents(filter?: { status?: string }): Promise<Event[]> {
  const db = await getDb();

  const query: Record<string, unknown> = {};
  if (filter?.status) {
    query.status = filter.status;
  }

  const docs = await db
    .collection('events')
    .find(query)
    .sort({ date: -1 })
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  })) as Event[];
}

// --- Registration Functions ---

/**
 * Creates a new registration with generated referenceId, active status,
 * default remindersSent flags, and increments the event's registrationCount.
 */
export async function createRegistration(
  data: RegistrationFormData,
  eventDate: Date
): Promise<Registration> {
  const db = await getDb();
  const now = new Date();
  const referenceId = generateReferenceId(eventDate);

  const doc = {
    eventId: new ObjectId(data.eventId),
    numberOfAttendees: data.numberOfAttendees,
    attendeeNames: data.attendeeNames,
    agencyName: data.agencyName,
    email: data.email,
    phone: data.phone,
    status: 'active' as const,
    referenceId,
    confirmationEmailSent: false,
    confirmationEmailError: false,
    remindersSent: {
      sevenDay: false,
      oneDay: false,
    },
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection('registrations').insertOne(doc);

  // Increment the event's registration count
  await db.collection('events').updateOne(
    { _id: new ObjectId(data.eventId) },
    { $inc: { registrationCount: 1 } }
  );

  return {
    ...doc,
    _id: result.insertedId.toString(),
    eventId: data.eventId,
  };
}

/**
 * Checks if a registration already exists for the given event and email.
 */
export async function checkDuplicateRegistration(
  eventId: string,
  email: string
): Promise<boolean> {
  const db = await getDb();

  const existing = await db.collection('registrations').findOne({
    eventId: new ObjectId(eventId),
    email: email.toLowerCase(),
    status: 'active',
  });

  return !!existing;
}

/**
 * Returns registrations for an event, sorted by createdAt descending.
 * Optionally filtered by status.
 */
export async function listRegistrations(
  eventId: string,
  status?: string
): Promise<Registration[]> {
  const db = await getDb();

  const query: Record<string, unknown> = { eventId: new ObjectId(eventId) };
  if (status) {
    query.status = status;
  }

  const docs = await db
    .collection('registrations')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    eventId: doc.eventId.toString(),
  })) as Registration[];
}

/**
 * Cancels a registration by setting status to 'cancelled' and
 * decrements the event's registrationCount.
 */
export async function cancelRegistration(id: string): Promise<void> {
  const db = await getDb();

  const registration = await db.collection('registrations').findOne({
    _id: new ObjectId(id),
  });

  if (!registration) return;

  await db.collection('registrations').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: 'cancelled',
        updatedAt: new Date(),
      },
    }
  );

  // Decrement the event's registration count
  await db.collection('events').updateOne(
    { _id: registration.eventId },
    { $inc: { registrationCount: -1 } }
  );
}

/**
 * Returns active registrations for the given event IDs that haven't received
 * the specified reminder type.
 */
export async function getRegistrationsForReminder(
  type: 'sevenDay' | 'oneDay',
  eventIds: string[]
): Promise<Registration[]> {
  const db = await getDb();

  const objectIds = eventIds.map((id) => new ObjectId(id));

  const docs = await db
    .collection('registrations')
    .find({
      eventId: { $in: objectIds },
      status: 'active',
      [`remindersSent.${type}`]: false,
    })
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    eventId: doc.eventId.toString(),
  })) as Registration[];
}

/**
 * Marks a specific reminder type as sent for a registration.
 */
export async function markReminderSent(
  registrationId: string,
  type: 'sevenDay' | 'oneDay'
): Promise<void> {
  const db = await getDb();

  await db.collection('registrations').updateOne(
    { _id: new ObjectId(registrationId) },
    {
      $set: {
        [`remindersSent.${type}`]: true,
        updatedAt: new Date(),
      },
    }
  );
}

// --- Index Setup ---

/**
 * Creates all required indexes for the events and registrations collections.
 * Safe to call multiple times — MongoDB will skip existing indexes.
 */
export async function ensureEventIndexes(): Promise<void> {
  const db = await getDb();

  // Events indexes
  await db.collection('events').createIndex({ slug: 1 }, { unique: true });
  await db.collection('events').createIndex({ status: 1, date: -1 });
  await db.collection('events').createIndex({ date: 1, status: 1 });

  // Registrations indexes
  await db.collection('registrations').createIndex(
    { eventId: 1, email: 1 },
    { unique: true }
  );
  await db.collection('registrations').createIndex({ eventId: 1, status: 1 });
  await db.collection('registrations').createIndex({
    status: 1,
    'remindersSent.sevenDay': 1,
  });
  await db.collection('registrations').createIndex({
    status: 1,
    'remindersSent.oneDay': 1,
  });
}
