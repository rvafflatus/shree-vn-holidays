"use client";
import { useState } from 'react';
import InquiryModal from '@/components/InquiryModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample Tour Cards Data (आप यहाँ अपनी इमेजेस और डिटेल्स बदल सकते हैं)
  const tourPackages = [
    {
      id: 1,
      title: "Royal Rajasthan Heritage Tour",
      duration: "5 Days / 4 Nights",
      price: "₹14,999",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop",
      description: "Explore majestic forts, palaces, and vibrant desert culture with luxury stays."
    },
    {
      id: 2,
      title: "Kerala Backwaters & Nature Special",
      duration: "6 Days / 5 Nights",
      price: "₹18,500",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop",
      description: "Experience serene houseboats, lush tea gardens, and pristine beaches."
    },
    {
      id: 3,
      title: "Himalayan Adventure & Valley Escapes",
      duration: "7 Days / 6 Nights",
      price: "₹21,000",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
      description: "Breathtaking mountain views, snow valleys, and peaceful spiritual retreats."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <section 
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="text-center text-white px-6 max-w-4xl z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">
            Explore the World with <span className="text-orange-400">Shree VN Holidays</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
            Customized Tour Packages, Unforgettable Experiences, and Hassle-free Family Vacations.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transition transform hover:-translate-y-1 text-lg"
          >
            Plan Your Custom Trip
          </button>
        </div>
      </section>

      {/* --- FEATURED TOUR CARDS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-950 mb-3">Popular Tour Packages</h2>
          <p className="text-gray-600">Handcrafted holiday packages designed for your comfort and budget.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {tour.duration}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{tour.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 block">Starting from</span>
                    <span className="text-lg font-extrabold text-orange-600">{tour.price}</span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-orange-400 text-3xl font-bold mb-2">100% Customized</div>
            <p className="text-gray-300 text-sm">Tailor-made itineraries crafted according to your schedule and choices.</p>
          </div>
          <div className="p-6">
            <div className="text-orange-400 text-3xl font-bold mb-2">Family & Senior Friendly</div>
            <p className="text-gray-300 text-sm">Special care, comfortable travel, and relaxed pacing for senior citizens & kids.</p>
          </div>
          <div className="p-6">
            <div className="text-orange-400 text-3xl font-bold mb-2">24/7 Support</div>
            <p className="text-gray-300 text-sm">Dedicated assistance from our team throughout your holiday.</p>
          </div>
        </div>
      </section>

      {/* --- INQUIRY POPUP MODAL --- */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}