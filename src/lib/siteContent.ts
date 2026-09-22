import { getDb } from '@/lib/mongodb';

export type SiteContentMap = Record<string, string>;

type SiteContentDocument = {
  key: string;
  value: string;
  updatedAt: Date;
  updatedBy?: string;
};

async function getCollection() {
  const db = await getDb();
  return db.collection<SiteContentDocument>('siteContent');
}

export async function getSiteContent(): Promise<SiteContentMap> {
  const collection = await getCollection();
  const entries = await collection.find({}, { projection: { key: 1, value: 1 } }).toArray();

  return Object.fromEntries(entries.map(({ key, value }) => [key, value]));
}

export async function setSiteContent(key: string, value: string, updatedBy?: string) {
  const collection = await getCollection();
  await collection.updateOne(
    { key },
    {
      $set: {
        value,
        updatedAt: new Date(),
        ...(updatedBy ? { updatedBy } : {}),
      },
      $setOnInsert: { key },
    },
    { upsert: true },
  );
}

export async function deleteSiteContent(key: string) {
  const collection = await getCollection();
  await collection.deleteOne({ key });
}
