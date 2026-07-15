import Hero from '@/components/Hero';
import TourCard from '@/components/TourCard';
import { supabase } from '@/lib/supabaseClient';
import { unstable_noStore as noStore } from 'next/cache';

export default async function Home() {
  noStore(); // डेटा को हमेशा ताज़ा रखने के लिए

  // Supabase से डेटा मंगाएं
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*');

  if (error) {
    console.error("Supabase Error:", error);
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Featured Tours</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours && tours.length > 0 ? (
            tours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour} />
            ))
          ) : (
            <p className="text-zinc-600">
              {error ? `Error: ${error.message}` : "No tours found."}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}