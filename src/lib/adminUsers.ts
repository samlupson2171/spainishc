import { getDb } from '@/lib/mongodb';

export interface AdminUser {
  _id?: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'spanishconveyancing_2026');
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password);
  return computed === hash;
}

export async function getAdminUsersCollection() {
  const db = await getDb();
  return db.collection<AdminUser>('adminUsers');
}

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const collection = await getAdminUsersCollection();
  return collection.findOne({ email: email.toLowerCase() });
}

export async function createAdminUser(email: string, name: string, password: string): Promise<AdminUser> {
  const collection = await getAdminUsersCollection();
  
  const existing = await collection.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new Error('A user with this email already exists');
  }

  const user: AdminUser = {
    email: email.toLowerCase(),
    name,
    passwordHash: await hashPassword(password),
    createdAt: new Date(),
  };

  await collection.insertOne(user);
  return user;
}

export async function listAdminUsers(): Promise<Omit<AdminUser, 'passwordHash'>[]> {
  const collection = await getAdminUsersCollection();
  const users = await collection
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
  return users;
}

export async function deleteAdminUser(email: string): Promise<boolean> {
  const collection = await getAdminUsersCollection();
  const result = await collection.deleteOne({ email: email.toLowerCase() });
  return result.deletedCount > 0;
}

/**
 * Seeds the initial admin user from env vars if no admin users exist yet.
 * This ensures backward compatibility with the original hardcoded credentials.
 */
export async function seedInitialAdmin(): Promise<void> {
  const collection = await getAdminUsersCollection();
  const count = await collection.countDocuments();
  
  if (count === 0) {
    // Seed with the default admin
    await createAdminUser(
      'admin@spanishconveyancing.es',
      'Admin',
      'damian2026'
    );
  }
}
