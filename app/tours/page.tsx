'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function ToursListingPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching tours:', error);
    } else {
      setTours(data || []);
    }
    setLoading(false);
  };

  const filteredTours = tours.filter((tour: any) =>
    tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-blue-950">Explore Curated Tour Packages</h1>
            <p className="text-gray-500 text-sm">Discover unforgettable destinations, handpicked itineraries, and complete customization options.</p>
          </div>
          <Link
            href="/"
            className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-2xl font-bold text-sm transition shadow-md"
          >
            Home 🏠
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by destination, title, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-sm text-gray-500 font-medium">
            Available Packages: <span className="font-bold text-blue-950">{filteredTours.length}</span>
          </div>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="p-16 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200">
            Loading amazing destinations...
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="p-16 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200 space-y-3">
            <p>No tour packages found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 font-bold text-sm underline hover:text-blue-800"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour: any) => (
              <div 
                key={tour.id} 
                className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Tour Image & Category Badge */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={tour.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm">
                      {tour.category || 'Special Tour'}
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-blue-950 line-clamp-1">{tour.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {tour.description}
                    </p>

                    {/* Highlights (Duration & Price) */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                        🕒 {tour.duration || 'Flexible'}
                      </span>
                      <span className="text-lg font-extrabold text-blue-900">
                        ₹{tour.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link
                    href={`/tours/${tour.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-blue-950 text-center py-3 rounded-2xl text-xs font-bold transition"
                  >
                    View Details
                  </Link>
                  <a
                    href={`https://wa.me/919782147688?text=Hello,%20I%20want%20to%20customize%20or%20inquire%20about%20the%20tour:%20${encodeURIComponent(tour.title)}%20(Price:%20₹${tour.price}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-2xl text-xs font-bold transition shadow"
                  >
                    💬 Customize / Inquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}