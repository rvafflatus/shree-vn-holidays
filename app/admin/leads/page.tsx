'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLeadsCRM() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  // स्टेटस अपडेट करने का फंक्शन
  const updateLeadField = async (id: number, field: string, value: string) => {
    const { error } = await supabase
      .from('inquiries')
      .update({ [field]: value })
      .eq('id', id);

    if (!error) {
      setLeads(leads.map(lead => lead.id === id ? { ...lead, [field]: value } : lead));
    } else {
      alert('Failed to update: ' + error.message);
    }
  };

  const filteredLeads = leads.filter((lead: any) => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-blue-950">Lead Management CRM</h1>
            <p className="text-gray-500 text-sm mt-1">Track inquiry pipeline, follow-ups, payment statuses, and client feedback.</p>
          </div>
          <button 
            onClick={fetchLeads}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            Refresh CRM 🔄
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
          <input 
            type="text" 
            placeholder="Search leads by name, email, destination..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-sm text-gray-500 hidden md:block font-medium">
            Total Leads: <span className="font-bold text-blue-950">{filteredLeads.length}</span>
          </div>
        </div>

        {/* Leads CRM Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading CRM data...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No leads found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4 font-semibold">Client Details</th>
                    <th className="p-4 font-semibold">Destination</th>
                    <th className="p-4 font-semibold">Pipeline Status</th>
                    <th className="p-4 font-semibold">Payment Status</th>
                    <th className="p-4 font-semibold">Admin Notes</th>
                    <th className="p-4 font-semibold text-center">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredLeads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-blue-50/30 transition">
                      
                      {/* Client Info */}
                      <td className="p-4">
                        <div className="font-bold text-blue-950">{lead.name}</div>
                        <div className="text-gray-500 text-xs">{lead.email}</div>
                      </td>

                      {/* Destination */}
                      <td className="p-4">
                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-md">
                          {lead.destination || 'Custom'}
                        </span>
                      </td>

                      {/* Pipeline Status Dropdown */}
                      <td className="p-4">
                        <select 
                          value={lead.status || 'New'} 
                          onChange={(e) => updateLeadField(lead.id, 'status', e.target.value)}
                          className={`p-2 rounded-lg text-xs font-bold border ${
                            lead.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                            lead.status === 'Follow-up' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            lead.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          <option value="New">New Inquiry</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Payment Status Dropdown */}
                      <td className="p-4">
                        <select 
                          value={lead.payment_status || 'Pending'} 
                          onChange={(e) => updateLeadField(lead.id, 'payment_status', e.target.value)}
                          className={`p-2 rounded-lg text-xs font-bold border ${
                            lead.payment_status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                            lead.payment_status === 'Partial' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Partial">Partial (Advance)</option>
                          <option value="Paid">Fully Paid</option>
                        </select>
                      </td>

                      {/* Admin Notes Input */}
                      <td className="p-4">
                        <input 
                          type="text"
                          defaultValue={lead.admin_notes || ''}
                          onBlur={(e) => updateLeadField(lead.id, 'admin_notes', e.target.value)}
                          placeholder="Add feedback/notes..."
                          className="p-2 border rounded-lg text-xs text-black w-48 bg-gray-50 focus:bg-white"
                        />
                      </td>

                      {/* WhatsApp Direct Action */}
                      <td className="p-4 text-center">
                        <a
                          href={`https://wa.me/919782147688?text=Hello%20${lead.name},%20regarding%20your%20inquiry%20for%20${lead.destination}...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition shadow"
                        >
                          💬 Chat
                        </a>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}s