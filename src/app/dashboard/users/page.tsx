'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LogOut,
  RefreshCw,
  Calendar,
  Users,
  UserPlus,
  Trash2,
  Mail,
  User,
  Lock,
  ArrowLeft,
} from 'lucide-react';

interface AdminUser {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUsers();
    }
  }, [status]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin-users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create user');
      } else {
        setSuccess('User created successfully');
        setFormData({ email: '', name: '', password: '' });
        setShowForm(false);
        fetchUsers();
      }
    } catch {
      setError('Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (email: string) => {
    try {
      const res = await fetch('/api/admin-users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to delete user');
      } else {
        setDeleteConfirm(null);
        fetchUsers();
      }
    } catch {
      setError('Failed to delete user');
    }
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
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/images/newlogo.png" alt="Spanish Conveyancing" width={150} height={40} />
            <span className="text-gray-400">|</span>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <Mail size={18} />
              Leads
            </Link>
            <Link
              href="/dashboard/events"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <Calendar size={18} />
              Events
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-2 text-white font-medium"
            >
              <Users size={18} />
              Users
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Admin Users</h1>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setError(''); setSuccess(''); }}
            className="btn-accent flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        {/* Add User Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border">
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-4">Create New Admin User</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="form-control pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="form-control pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Minimum 6 characters"
                    className="form-control pl-10"
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-accent flex items-center gap-2"
                >
                  {submitting ? <RefreshCw className="animate-spin" size={16} /> : <UserPlus size={16} />}
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="animate-spin text-[#c9a227] mx-auto" size={24} />
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No admin users found.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.email === session.user?.email ? (
                        <span className="text-xs text-gray-400 italic">You</span>
                      ) : deleteConfirm === user.email ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(user.email)}
                            className="text-red-600 text-sm font-medium hover:text-red-800"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-gray-500 text-sm hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(user.email)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
