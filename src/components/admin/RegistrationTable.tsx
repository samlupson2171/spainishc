'use client';

import { useState } from 'react';
import { XCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface Registration {
  _id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'cancelled';
  referenceId: string;
  createdAt: string;
}

interface RegistrationTableProps {
  registrations: Registration[];
  onCancelSuccess: (id: string) => void;
}

export default function RegistrationTable({ registrations, onCancelSuccess }: RegistrationTableProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCancelClick = (id: string) => {
    setConfirmId(id);
    setMessage(null);
  };

  const handleConfirmCancel = async () => {
    if (!confirmId) return;

    setCancellingId(confirmId);
    setConfirmId(null);

    try {
      const res = await fetch(`/api/registrations/${confirmId}`, {
        method: 'PATCH',
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to cancel registration' });
        return;
      }

      setMessage({ type: 'success', text: 'Registration cancelled successfully' });
      onCancelSuccess(confirmId);
    } catch {
      setMessage({ type: 'error', text: 'Failed to cancel registration. Please try again.' });
    } finally {
      setCancellingId(null);
    }
  };

  const handleCancelDialog = () => {
    setConfirmId(null);
  };

  const statusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">Active</span>;
    }
    return <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-600">Cancelled</span>;
  };

  return (
    <div>
      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {message.text}
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">Cancel Registration</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this registration? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDialog}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Keep Registration
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Cancel Registration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Registration Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {registrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{reg.name}</td>
                  <td className="px-4 py-3 text-gray-600">{reg.email}</td>
                  <td className="px-4 py-3 text-gray-600">{reg.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">{statusBadge(reg.status)}</td>
                  <td className="px-4 py-3">
                    {reg.status === 'active' && (
                      <button
                        onClick={() => handleCancelClick(reg._id)}
                        disabled={cancellingId === reg._id}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        <XCircle size={16} />
                        {cancellingId === reg._id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
