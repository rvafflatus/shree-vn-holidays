'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState<any>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tours:', error);
    } else {
      setTours(data || []);
    }
    setLoading(false);
  };

  const handleEditClick = (tour: any) => {
    setCurrentTour(tour);
    setIsEditModalOpen(true);
  };

  const handleUpdateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('tours')
      .update({
        title: currentTour.title,
        category: currentTour.category,
        price: currentTour.price,
        duration: currentTour.duration,
        description: currentTour.description,
        slug: currentTour.slug,
        seo_title: currentTour.seo_title,
        seo_description: currentTour.seo_description,
        booking_type: currentTour.booking_type,
      })
      .eq('id', currentTour.id);

    if (error) {
      alert('Error updating tour: ' + error.message);
    } else {
      alert('Tour updated successfully!');
      setIsEditModalOpen(false);
      fetchTours();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-blue-950">Manage Tours & Packages</h1>
            <p className="text-gray-500 text-sm mt-1">View, edit, and organize your active tour inventory.</p>
          </div>
          <button 
            onClick={fetchTours}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            Refresh Tours 🔄
          </button>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading tours inventory...</div>
        ) : tours.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-gray-500">
            No tours found in database. You can insert them via Supabase dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                      {tour.category || 'General'}
                    </span>
                    <span className="text-sm font-extrabold text-orange-600">
                      ₹{tour.price}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">{tour.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Duration: {tour.duration}</p>
                    {tour.booking_type && (
                      <p className="text-xs font-semibold text-blue-800 mt-1">Type: {tour.booking_type}</p>
                    )}
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{tour.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handleEditClick(tour)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow"
                  >
                    Edit Tour ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Edit Tour Modal */}
      {isEditModalOpen && currentTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-2xl relative border border-gray-200 my-8 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-blue-950 mb-4">Edit Tour Package & SEO</h2>
            
            <form onSubmit={handleUpdateTour} className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">Tour Title</label>
                <input 
                  type="text" 
                  value={currentTour.title || ''} 
                  onChange={(e) => setCurrentTour({ ...currentTour, title: e.target.value })} 
                  className="w-full p-3 border rounded-lg text-sm text-black"
                  required 
                />
              </div>

              {/* Booking Type Dropdown */}
              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">Type of Booking</label>
                <select 
                  value={currentTour.booking_type || ''} 
                  onChange={(e) => setCurrentTour({ ...currentTour, booking_type: e.target.value })}
                  className="w-full p-3 border rounded-lg text-sm text-black bg-white"
                >
                  <option value="">-- बुकिंग का प्रकार चुनें --</option>
                  <option value="Hotel Booking">Hotel Booking</option>
                  <option value="Air Booking">Air Booking</option>
                  <option value="Domestic Tour Package">Domestic Tour Package</option>
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Wedding Planning">Wedding Planning</option>
                  <option value="Cruise Booking">Cruise Booking</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">Category / Type</label>
                  <input 
                    type="text" 
                    value={currentTour.category || ''} 
                    onChange={(e) => setCurrentTour({ ...currentTour, category: e.target.value })} 
                    className="w-full p-3 border rounded-lg text-sm text-black" 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={currentTour.price || ''} 
                    onChange={(e) => setCurrentTour({ ...currentTour, price: e.target.value })} 
                    className="w-full p-3 border rounded-lg text-sm text-black" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">Duration</label>
                <input 
                  type="text" 
                  value={currentTour.duration || ''} 
                  onChange={(e) => setCurrentTour({ ...currentTour, duration: e.target.value })} 
                  className="w-full p-3 border rounded-lg text-sm text-black" 
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={currentTour.description || ''} 
                  onChange={(e) => setCurrentTour({ ...currentTour, description: e.target.value })} 
                  className="w-full p-3 border rounded-lg text-sm text-black" 
                />
              </div>

              {/* SEO Fields Section inside Edit Modal */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold text-gray-700 text-sm">SEO Settings</h3>
                <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">URL Slug</label>
                  <input 
                    type="text" 
                    value={currentTour.slug || ''} 
                    onChange={(e) => setCurrentTour({ ...currentTour, slug: e.target.value })} 
                    className="w-full p-3 border rounded-lg text-sm text-black bg-gray-50" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">SEO Title</label>
                  <input 
                    type="text" 
                    value={currentTour.seo_title || ''} 
                    onChange={(e) => setCurrentTour({ ...currentTour, seo_title: e.target.value })} 
                    className="w-full p-3 border rounded-lg text-sm text-black" 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">SEO Description</label>
                  <textarea 
                    rows={2}
                    value={currentTour.seo_description || ''} 
                    onChange={(e) => setCurrentTour({ ...currentTour, seo_description: e.target.value })} 
                    className="w-full p-3 border rounded-lg text-sm text-black" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-xl font-bold text-sm transition shadow mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}