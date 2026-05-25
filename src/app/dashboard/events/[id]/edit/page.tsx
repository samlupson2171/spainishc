'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { LogOut, ArrowLeft } from 'lucide-react';
import { signOut } from 'next-auth/react';
import EventForm from '@/components/admin/EventForm';
import type { EventFormData } from '@/lib/eventSchema';

export default function EditEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [defaultValues, setDefaultValues] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && eventId) {
      fetchEvent();
    }
  }, [status, eventId]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}`);
      if (!res.ok) {
        const errorData = await res.json();
        setFetchError(errorData.error || 'Failed to load event');
        return;
      }
      const event = await res.json();
      setDefaultValues({
        title: event.title,
        description: event.description,
        date: event.date,
        timezone: event.timezone,
        location: event.location,
      });
    } catch {
      setFetchError('A network error occurred while loading the event.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: EventFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setServerError(errorData.error || 'Failed to update event');
        return;
      }

      router.push('/dashboard/events');
    } catch {
      setServerError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/images/newlogo.png" alt="Spanish Conveyancing" width={150} height={40} />
            <span className="text-gray-400">|</span>
            <span>Dashboard</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/events')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1a1a2e] mb-4"
          >
            <ArrowLeft size={18} />
            Back to Events
          </button>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Edit Event</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {fetchError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {fetchError}
            </div>
          ) : defaultValues ? (
            <EventForm
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              serverError={serverError}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              Event not found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
