This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables

The following environment variables are required in `.env.local` (local development) and in your Vercel project settings (production):

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `NEXTAUTH_SECRET` | NextAuth.js session secret |
| `CRON_SECRET` | Secret token for authenticating cron job requests (used by `/api/cron/reminders`) |

### Generating a CRON_SECRET

```bash
openssl rand -hex 32
```

Add the generated value to your Vercel project environment variables under **Settings > Environment Variables**.

## Database Setup

On first deployment, run the index setup script to create required MongoDB indexes:

```bash
npx tsx src/lib/setupIndexes.ts
```

This creates indexes for:
- Events: slug (unique), status+date compound, date+status compound
- Registrations: eventId+email (unique compound), eventId+status, reminder query indexes

The script calls `ensureEventIndexes()` from `src/lib/eventDb.ts` and is safe to run multiple times (MongoDB skips existing indexes).

## Cron Jobs

The project uses Vercel Cron Jobs (configured in `vercel.json`) to run the event reminder scheduler:

- **Schedule:** Daily at 09:00 UTC
- **Endpoint:** `POST /api/cron/reminders`
- **Authentication:** Requires `Authorization: Bearer <CRON_SECRET>` header (Vercel sends this automatically when `CRON_SECRET` is set in environment variables)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
