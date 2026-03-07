'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, Phone, Mail, Clock, Trash2, RefreshCw, Search, Filter } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  agency?: string;
  email: string;
  phone: string;
  callbackPreference: 'today' | 'tomorrow' | 'this_week';
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-green-100 text-green-800',
};

const callbackLabels = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  this_week: 'This Week',
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = statusFilter ? `/api/leads?status=${statusFilter}` : '/api/leads';
      const res = await fetch(url);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    (lead.agency && lead.agency.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <Image src="/images/image001.png" alt="Spanish Conveyancing" width={150} height={40} />
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Leads Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-white rounded-lg hover:bg-[#b8921f]"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Total Leads</p>
            <p className="text-2xl font-bold text-[#1a1a2e]">{leads.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">New</p>
            <p className="text-2xl font-bold text-blue-600">{leads.filter(l => l.status === 'new').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Closed</p>
            <p className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'closed').length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="animate-spin text-[#c9a227] mx-auto" size={32} />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No leads found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Agency</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Callback</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.agency || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-[#c9a227] hover:underline text-sm">
                            <Phone size={14} /> {lead.phone}
                          </a>
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-gray-600 hover:underline text-sm">
                            <Mail size={14} /> {lead.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-sm">
                          <Clock size={14} className="text-[#c9a227]" />
                          {callbackLabels[lead.callbackPreference]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                          className={`px-2 py-1 rounded text-sm ${statusColors[lead.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
