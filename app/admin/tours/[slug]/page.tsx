import { createClient } from '@supabase/supabase-js';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: { slug: string };
};

// 1. हर टूर के लिए डायनेमिक SEO मेटाडेटा जनरेट करना
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const { data: tour } = await supabase
    .from('tours')
    .select('seo_title, seo_description, title, description, image_url')
    .eq('slug', slug)
    .single();

  if (!tour) {
    return {
      title: "Tour Not Found | DesiTrails",
    };
  }

  return {
    title: tour.seo_title || tour.title,
    description: tour.seo_description || tour.description.substring(0, 160),
    openGraph: {
      title: tour.seo_title || tour.title,
      description: tour.seo_description || tour.description.substring(0, 160),
      images: tour.image_url ? [{ url: tour.image_url }] : [],
    },
  };
}

// 2. टूर डिटेल पेज का मुख्य कंपोनेंट
export default async function TourDetailPage({ params }: Props) {
  const { slug } = params;

  const { data: tour } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!tour) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* टूर इमेज */}
      {tour.image_url && (
        <img 
          src={tour.image_url} 
          alt={tour.title} 
          className="w-full h-96 object-cover rounded-xl mb-8 shadow-md"
        />
      )}

      {/* टूर शीर्षक और कैटेगरी */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {tour.category}
        </span>
        <span className="text-gray-500 font-medium">⏱ {tour.duration}</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{tour.title}</h1>
      
      {/* कीमत */}
      <div className="text-2xl font-bold text-green-600 mb-6">
        ₹ {tour.price} <span className="text-sm font-normal text-gray-500">/ person</span>
      </div>

      {/* विवरण */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
        {tour.description}
      </div>

      {/* बुकिंग बटन */}
      <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-lg shadow transition-colors">
        Book This Tour Now
      </button>
    </main>
  );
}