/**
 * Database Index Setup Script
 *
 * Creates all required MongoDB indexes for the events and registrations collections.
 * Run this script on first deployment or when indexes need to be recreated.
 *
 * Usage:
 *   npx tsx src/lib/setupIndexes.ts
 *
 * Required environment variables:
 *   - MONGODB_URI: MongoDB connection string
 *
 * Indexes created:
 *   Events collection:
 *     - { slug: 1 } — unique, for public URL lookups
 *     - { status: 1, date: -1 } — for listing published events sorted by date
 *     - { date: 1, status: 1 } — for reminder scheduler queries
 *
 *   Registrations collection:
 *     - { eventId: 1, email: 1 } — unique compound, prevents duplicate registrations
 *     - { eventId: 1, status: 1 } — for listing active registrations per event
 *     - { status: 1, "remindersSent.sevenDay": 1 } — for 7-day reminder queries
 *     - { status: 1, "remindersSent.oneDay": 1 } — for 1-day reminder queries
 */

import { ensureEventIndexes } from './eventDb';

async function main() {
  console.log('Setting up MongoDB indexes for events and registrations...');

  try {
    await ensureEventIndexes();
    console.log('All indexes created successfully.');
  } catch (error) {
    console.error('Failed to create indexes:', error);
    process.exit(1);
  }

  // Allow the process to exit after the async operation completes
  process.exit(0);
}

main();
