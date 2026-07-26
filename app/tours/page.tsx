import React from 'react';
import Link from 'next/link';

export default function TourPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-950">Explore Our Tour Packages</h1>
            <p className="text-gray-500 text-sm mt-1">Discover handcrafted travel itineraries designed for unforgettable memories.</p>
          </div>
          <Link
            href="/"
            className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow"
          >
            Back to Home 🏠
          </Link>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-3xl text-center space-y-3">
          <h2 className="text-2xl font-bold text-blue-950">Looking to manage your tours?</h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            You can view and edit your active tour inventory directly from the admin management panel.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/tours"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow"
            >
              Go to Admin Tours Panel ⚙️
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}