"use client";
import { useState, useEffect } from 'react';
import InquiryModal from '@/components/InquiryModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  const slogans = [
    "Explore the Unseen Adventure Awaits",
    "Discover Breathtaking Mountains & Valleys",
    "Plan Your Dream Family Holidays Today",
    "Unforgettable Journeys Crafted Just For You"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slogans.length]);

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
    <div className="min-h-screen flex flex-col bg-gray-50 pt-20"> {/* Fixed navbar के नीचे कंटेंट को शिफ्ट करने के लिए pt-20 */}
      
      {/* --- HERO SECTION --- */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-report px-6 py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 19, 43, 0.85), rgba(11, 19, 43, 0.75)), url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="text-center text-white max-w-4xl z-10 flex flex-col items-center">
          <span className="bg-orange-600 text-white text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-md">
            Welcome to Shree VN Holidays
          </span>
          
          {/* डायनेमिक एनिमेटेड स्लोगन */}
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight min-h-[90px] md:min-h-[120px] flex items-center justify-center drop-shadow-lg">
            <span className="text-orange-400 transition-all duration-700">
              {slogans[currentSloganIndex]}
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-200 mb-8 max-w-2xl font-light leading-relaxed drop-shadow">
            Your trusted professional partner for custom tour packages, thrilling mountain treks, and seamless family getaways.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transition transform hover:-translate-y-1 text-lg border border-orange-500"
          >
            Plan Your Adventure Now
          </button>
        </div>
      </section>

      {/* --- FEATURED TOUR CARDS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-950 mb-3">Trending Adventure & Holiday Packages</h2>
          <p className="text-gray-600">Handcrafted itineraries designed for thrill-seekers and family relaxation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 flex flex-col transform hover:-translate-y-1">
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
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
                    className="bg-blue-950 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow"
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
      <section className="bg-blue-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-900/40 rounded-xl border border-blue-800/50">
            <div className="text-orange-400 text-3xl font-bold mb-2">100% Customized</div>
            <p className="text-gray-300 text-sm">Tailor-made travel routes and luxury or budget stays crafted for your style.</p>
          </div>
          <div className="p-6 bg-blue-900/40 rounded-xl border border-blue-800/50">
            <div className="text-orange-400 text-3xl font-bold mb-2">Safe & Family Friendly</div>
            <p className="text-gray-300 text-sm">Special care for kids and senior citizens, ensuring secure and peaceful holidays.</p>
          </div>
          <div className="p-6 bg-blue-900/40 rounded-xl border border-blue-800/50">
            <div className="text-orange-400 text-3xl font-bold mb-2">24/7 Ground Support</div>
            <p className="text-gray-300 text-sm">Dedicated assistance from our experts all through your trip experience.</p>
          </div>
        </div>
      </section>

      {/* --- INQUIRY POPUP MODAL --- */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}