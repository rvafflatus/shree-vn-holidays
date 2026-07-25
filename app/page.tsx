"use client";
import { useState } from 'react';
import InquiryModal from '@/components/InquiryModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Explore, Dream, Discover with <span className="text-orange-400">Shree VN Holidays</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Your trusted partner for unforgettable travel experiences, custom holidays, and seamless event planning.
        </p>

        {/* बटन जो पॉप-अप फॉर्म खोलेगा */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl transition transform hover:-translate-y-1"
        >
          Book / Plan Your Trip
        </button>
      </section>

      {/* Features / Highlights Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl shadow-md border border-blue-50">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Customized Packages</h3>
          <p className="text-gray-600 text-sm">Tailor-made itineraries designed precisely to fit your preferences, budget, and schedule.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-blue-50">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Family & Group Tours</h3>
          <p className="text-gray-600 text-sm">Special care for senior citizens, comfortable pacing, and engaging options for young travelers and kids.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-blue-50">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Trusted Support</h3>
          <p className="text-gray-600 text-sm">24/7 assistance throughout your journey to ensure a safe, smooth, and hassle-free vacation.</p>
        </div>
      </section>

      {/* Inquiry Modal Popup */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}