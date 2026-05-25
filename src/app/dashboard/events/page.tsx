'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  RefreshCw,
  Plus,
  Pencil,
  Users,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import type { Event } from '@/lib/eventSchema';

export default function EventsListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEvents();
    }
  }, [status]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      setDeleteConfirm(null);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleToggleStatus = async (event: Event) => {
    const newStatus = event.status === 'published' ? 'draft' : 'published';
    try {
      await fetch(`/api/events/${event._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchEvents();
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  };

  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <RefreshCw className="animate-spin text-[#c9a227]" size={32} />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Events</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your events, registrations, and publication status.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ← Dashboard
            </Link>
            <Link
              href="/dashboard/events/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-white rounded-lg hover:bg-[#b8921f]"
            >
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="animate-spin text-[#c9a227] mx-auto" size={32} />
            </div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No events found. Create your first event to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Registrations
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {events.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-[#1a1a2e]">
                        {event.title}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(event.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {event.registrationCount}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/events/${event.slug}`}
                            target="_blank"
                            className="text-gray-500 hover:text-[#c9a227]"
                            title="View Landing Page"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/events/${event._id}/edit`}
                            className="text-gray-500 hover:text-[#c9a227]"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/events/${event._id}/registrations`}
                            className="text-gray-500 hover:text-[#c9a227]"
                            title="View Registrations"
                          >
                            <Users size={16} />
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(event)}
                            className={`${
                              event.status === 'published'
                                ? 'text-green-600 hover:text-green-800'
                                : 'text-gray-500 hover:text-green-600'
                            }`}
                            title={
                              event.status === 'published'
                                ? 'Unpublish'
                                : 'Publish'
                            }
                          >
                            {event.status === 'published' ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(event._id)}
                            className="text-gray-500 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-2">
              Delete Event
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this event? This will also remove
              all associated registrations. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
