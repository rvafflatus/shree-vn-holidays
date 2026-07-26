"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // डेटाबेस से लीड्स फेच करना
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

  // फिल्टर और सर्च लॉजिक
  const filteredLeads = leads.filter((lead: any) => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // इनसाइट्स / मेट्रिक्स कैलकुलेशन
  const totalLeads = leads.length;
  const popularDestination = leads.length > 0 ? 
    Object.entries(leads.reduce((acc: any, lead: any) => {
      acc[lead.destination] = (acc[lead.destination] || 0) + 1;
      return acc;
    }, {})).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A' : 'N/A';

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER TITLE --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-950">Admin Control Center</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all your travel inquiries, client preferences, and booking insights.</p>
          </div>
          <button 
            onClick={fetchLeads}
            className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow"
          >
            Refresh Data 🔄
          </button>
        </div>

        {/* --- INSIGHTS & METRICS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Inquiries</p>
              <h3 className="text-3xl font-extrabold text-blue-950 mt-1">{totalLeads}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">📊</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Top Destination</p>
              <h3 className="text-xl font-extrabold text-orange-600 mt-1 truncate max-w-[200px]">{popularDestination}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl font-bold">🌍</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">System Status</p>
              <h3 className="text-xl font-extrabold text-green-600 mt-1 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> Live & Synced
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl font-bold">⚡</div>
          </div>
        </div>

        {/* --- SEARCH & FILTERS BAR --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search by client name, email, or destination..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Showing <span className="text-blue-950 font-bold">{filteredLeads.length}</span> inquiries
          </div>
        </div>

        {/* --- LEADS TABLE SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-medium">Loading inquiries from database...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">No inquiries found matching your criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4 font-semibold">Client Info</th>
                    <th className="p-4 font-semibold">Destination</th>
                    <th className="p-4 font-semibold">Travel Dates</th>
                    <th className="p-4 font-semibold">Guests & Budget</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredLeads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-blue-50/40 transition">
                      <td className="p-4">
                        <div className="font-bold text-blue-950">{lead.name}</div>
                        <div className="text-gray-500 text-xs">{lead.email}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-md">
                          {lead.destination}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 text-xs">
                        <div>📅 Start: {lead.start_date || 'Not specified'}</div>
                        <div className="mt-1">🏁 End: {lead.end_date || 'Not specified'}</div>
                      </td>
                      <td className="p-4 text-xs text-gray-700">
                        <div>👥 Adults: {lead.young}, Seniors: {lead.senior}, Kids: {lead.child}</div>
                        <div className="mt-1 font-semibold text-blue-950">💰 Budget: {lead.budget || 'N/A'}</div>
                      </td>
                      <td className="p-4 text-center">
                        <a
                          href={`https://wa.me/919782147688?text=Hello%20${lead.name},%20we%20received%20your%20inquiry%20for%20${lead.destination}.%20Let's%20discuss%20your%20trip!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition shadow"
                        >
                          💬 WhatsApp
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
}