'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, ArrowLeft } from 'lucide-react';
import { signOut } from 'next-auth/react';
import EventForm from '@/components/admin/EventForm';
import type { EventFormData } from '@/lib/eventSchema';

export default function NewEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  const handleSubmit = async (data: EventFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setServerError(errorData.error || 'Failed to create event');
        return;
      }

      router.push('/dashboard/events');
    } catch {
      setServerError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
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
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Create New Event</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <EventForm
            onSubmit={handleSubmit}
            serverError={serverError}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
    </div>
  );
}
