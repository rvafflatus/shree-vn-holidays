import { supabase } from '@/lib/supabaseClient';
import LeadForm from '@/components/LeadForm';

// Next.js 15+ के लिए params को Promise के रूप में हैंडल करना सही है
export default async function TourDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: tour, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">टूर नहीं मिला या कोई एरर आया!</h1>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 pt-24">
      {/* इमेज के लिए Shadow और Rounding */}
      <div className="relative">
        <img 
          src={tour.image_url} 
          alt={tour.title} 
          className="w-full h-96 object-cover rounded-3xl shadow-xl" 
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-semibold text-blue-900">
          {tour.category}
        </div>
      </div>

      <h1 className="text-5xl font-extrabold mt-8 text-blue-950">{tour.title}</h1>
      
      {/* हाइलाइट्स सेक्शन */}
      <div className="flex flex-wrap gap-4 mt-6 text-gray-700">
        <span className="bg-gray-100 px-4 py-2 rounded-lg font-medium">🕒 {tour.duration}</span>
        <span className="bg-blue-100 px-4 py-2 rounded-lg font-bold text-blue-900">💰 ₹{tour.price}</span>
      </div>

      <p className="mt-8 text-lg text-gray-700 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {tour.description}
      </p>
      
      {/* लीड फॉर्म सेक्शन */}
      <div className="mt-12 bg-blue-900 p-8 rounded-3xl text-white">
        <h3 className="text-3xl font-bold mb-2">इस टूर के लिए पूछताछ करें</h3>
        <p className="mb-6 opacity-90">अपनी डिटेल्स भरें, हम आपसे जल्द संपर्क करेंगे।</p>
        <div className="bg-white p-6 rounded-xl">
           <LeadForm tourId={tour.id} />
        </div>
      </div>
    </main>
  );
}