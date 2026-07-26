import { supabase } from '@/lib/supabaseClient';

// Next.js 15+ के लिए params को Promise के रूप में हैंडल करना
export default async function TourDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: tour, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <h1 className="text-2xl font-bold text-gray-800">टूर नहीं मिला या कोई एरर आया!</h1>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 pt-28">
      {/* इमेज के लिए Shadow और Rounding */}
      <div className="relative">
        <img 
          src={tour.image_url} 
          alt={tour.title} 
          className="w-full h-96 object-cover rounded-3xl shadow-xl" 
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full font-bold text-blue-900 shadow-sm">
          {tour.category}
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mt-8 text-blue-950">{tour.title}</h1>
      
      {/* हाइलाइट्स सेक्शन */}
      <div className="flex flex-wrap gap-4 mt-6 text-gray-700">
        <span className="bg-gray-100 px-4 py-2 rounded-xl font-medium text-sm">🕒 {tour.duration}</span>
        <span className="bg-blue-50 px-4 py-2 rounded-xl font-bold text-blue-900 text-sm border border-blue-100">💰 ₹{tour.price}</span>
      </div>

      <p className="mt-8 text-base md:text-lg text-gray-700 leading-relaxed bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        {tour.description}
      </p>
      
      {/* पूछताछ / बुकिंग कॉल-टू-एक्शन सेक्शन */}
      <div className="mt-12 bg-gradient-to-r from-blue-950 to-blue-900 p-8 md:p-10 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold">Ready for this adventure?</h3>
          <p className="text-gray-300 text-sm">Customize your travel dates, group size, and meal plans instantly.</p>
        </div>
        
        <a
          href={`https://wa.me/919782147688?text=Hello,%20I%20am%20interested%20in%20the%20tour:%20${encodeURIComponent(tour.title)}%20(Price:%20₹${tour.price}).%20Please%20share%20details.`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition shadow-lg shrink-0 flex items-center gap-2"
        >
          💬 Inquire via WhatsApp
        </a>
      </div>
    </main>
  );
}