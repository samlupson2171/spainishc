'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, ArrowLeft, RefreshCw, Users } from 'lucide-react';
import { signOut } from 'next-auth/react';
import RegistrationTable from '@/components/admin/RegistrationTable';

interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  timezone: string;
  location: string;
  status: 'draft' | 'published';
  registrationCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Registration {
  _id: string;
  eventId: string;
  numberOfAttendees: number;
  attendeeNames: string;
  agencyName: string;
  email: string;
  phone: string;
  status: 'active' | 'cancelled';
  referenceId: string;
  createdAt: string;
}

export default function EventRegistrationsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (sessionStatus === 'authenticated' && eventId) {
      fetchData();
    }
  }, [sessionStatus, eventId]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [eventRes, regsRes] = await Promise.all([
        fetch(`/api/events/${eventId}`),
        fetch(`/api/registrations/event/${eventId}`),
      ]);

      if (!eventRes.ok) {
        const data = await eventRes.json();
        setError(data.error || 'Failed to load event');
        return;
      }

      if (!regsRes.ok) {
        const data = await regsRes.json();
        setError(data.error || 'Failed to load registrations');
        return;
      }

      const eventData = await eventRes.json();
      const regsData = await regsRes.json();

      setEvent(eventData);
      setRegistrations(regsData);
      setActiveCount(regsData.filter((r: Registration) => r.status === 'active').length);
    } catch {
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSuccess = (cancelledId: string) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r._id === cancelledId ? { ...r, status: 'cancelled' as const } : r
      )
    );
    setActiveCount((prev) => Math.max(0, prev - 1));
  };

  if (sessionStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <RefreshCw className="animate-spin text-[#c9a227]" size={32} />
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#b8921f] mb-6"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="animate-spin text-[#c9a227]" size={32} />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 border border-red-200 rounded-lg p-4">
            {error}
          </div>
        ) : event ? (
          <>
            {/* Event Title & Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a2e]">{event.title}</h1>
                <p className="text-gray-500 mt-1">
                  {new Date(event.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  {' · '}
                  {event.location}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                <Users size={20} className="text-[#c9a227]" />
                <span className="text-lg font-semibold text-[#1a1a2e]">{activeCount}</span>
                <span className="text-gray-500 text-sm">active registration{activeCount !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Registrations */}
            {registrations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No registrations yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Registrations will appear here once attendees sign up for this event.
                </p>
              </div>
            ) : (
              <RegistrationTable
                registrations={registrations}
                onCancelSuccess={handleCancelSuccess}
              />
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
