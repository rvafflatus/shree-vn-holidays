import React, { useState } from 'react';
import { Plane, Bus, Train, ArrowRightLeft, Calendar, User, Search } from 'lucide-react';

export default function TravelBookingForm() {
  const [transportType, setTransportType] = useState('flight'); // 'flight' | 'bus' | 'train'
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const handleSwapLocations = () => {
    setFormData((prev) => ({
      ...prev,
      fromLocation: prev.toLocation,
      toLocation: prev.fromLocation,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', { transportType, ...formData });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ================= 1. TRANSPORT TYPE SELECTOR ================= */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Travel Mode
          </label>
          <div className="inline-flex p-1 bg-gray-100 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setTransportType('flight')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                transportType === 'flight'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plane className="w-4 h-4" />
              Flight
            </button>

            <button
              type="button"
              onClick={() => setTransportType('bus')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                transportType === 'bus'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bus className="w-4 h-4" />
              Bus
            </button>

            <button
              type="button"
              onClick={() => setTransportType('train')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                transportType === 'train'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Train className="w-4 h-4" />
              Train
            </button>
          </div>
        </div>

        {/* ================= 2. FROM & TO DESTINATION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* From Field */}
          <div className="md:col-span-5 relative">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              From
            </label>
            <input
              type="text"
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
              placeholder={
                transportType === 'flight'
                  ? 'City or Airport'
                  : transportType === 'train'
                  ? 'Station Name / Code'
                  : 'Departure City'
              }
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-800"
            />
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center pt-5">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors focus:outline-none"
              title="Swap From & To"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Field */}
          <div className="md:col-span-5 relative">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              To
            </label>
            <input
              type="text"
              name="toLocation"
              value={formData.toLocation}
              onChange={handleChange}
              placeholder={
                transportType === 'flight'
                  ? 'Destination City or Airport'
                  : transportType === 'train'
                  ? 'Arrival Station'
                  : 'Destination City'
              }
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-800"
            />
          </div>
        </div>

        {/* ================= ADDITIONAL TRIP DETAILS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Departure Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Departure
            </label>
            <div className="relative">
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Return (Optional)
            </label>
            <div className="relative">
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Passengers / Seats
            </label>
            <input
              type="number"
              name="passengers"
              min="1"
              max="10"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-800"
            />
          </div>
        </div>

        {/* ================= SUBMIT BUTTON ================= */}
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-base"
        >
          <Search className="w-5 h-5" />
          Search {transportType.charAt(0).toUpperCase() + transportType.slice(1)}s
        </button>
      </form>
    </div>
  );
}