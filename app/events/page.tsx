'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // मोडल और फॉर्म के लिए स्टेट्स
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travel_date: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    // यदि आपकी टेबल का नाम 'events' है, तो यह उससे डेटा लाएगा
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleOpenModal = (eventItem: any) => {
    setSelectedEvent(eventItem);
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: eventItem.title || eventItem.name,
      travel_date: eventItem.date || '',
      notes: ''
    });
    setSuccessMessage('');
    setIsModalOpen(true);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('inquiries').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: `Event: ${formData.destination}`,
        travel_date: formData.travel_date,
        admin_notes: formData.notes,
        status: 'New',
        payment_status: 'Pending'
      }
    ]);

    if (error) {
      alert('Failed to submit: ' + error.message);
    } else {
      setSuccessMessage('Thank you! Your event inquiry has been submitted successfully.');
      setFormData({ name: '', email: '', phone: '', destination: '', travel_date: '', notes: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage('');
      }, 2500);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-blue-950">Upcoming Special Events</h1>
            <p className="text-gray-500 text-sm">Join our exclusive group tours, cultural fests, and seasonal travel events.</p>
          </div>
          <Link
            href="/"
            className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-2xl font-bold text-sm transition shadow-md"
          >
            Home 🏠
          </Link>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="p-16 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200">
            Loading upcoming events...
          </div>
        ) : events.length === 0 ? (
          <div className="p-16 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200 space-y-3">
            <p className="text-lg font-bold text-blue-950">No events found right now.</p>
            <p className="text-sm text-gray-500">Check back later or explore our regular tour packages.</p>
            <div>
              <Link
                href="/tours"
                className="inline-block mt-3 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-orange-700 transition"
              >
                Browse Tour Packages ✈️
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <div 
                key={event.id} 
                className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={event.image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm">
                      📅 {event.date || 'Upcoming'}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-blue-950 line-clamp-1">{event.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                        📍 {event.location || 'Special Venue'}
                      </span>
                      <span className="text-lg font-extrabold text-blue-900">
                        ₹{event.price || 'On Request'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-2xl text-xs font-bold transition shadow"
                  >
                    🎫 Register / Inquire Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
                Event Registration
              </span>
              <h2 className="text-2xl font-extrabold text-blue-950 mt-2">{selectedEvent?.title}</h2>
              <p className="text-gray-500 text-xs mt-1">Fill out your details to secure your spot for this event.</p>
            </div>

            {successMessage ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-sm font-medium text-center">
                {successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Event Name</label>
                    <input 
                      type="text" 
                      readOnly
                      value={formData.destination}
                      className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-blue-950 font-bold cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Event Date</label>
                    <input 
                      type="text" 
                      readOnly
                      value={formData.travel_date}
                      className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-blue-950 font-bold cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Additional Notes / Seats Required</label>
                  <textarea 
                    rows={3}
                    placeholder="Mention number of tickets or special requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 rounded-2xl text-sm transition shadow-lg mt-2"
                >
                  {submitting ? 'Submitting Registration...' : 'Confirm Event Registration'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}