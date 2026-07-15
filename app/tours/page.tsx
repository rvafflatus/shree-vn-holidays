import { supabase } from '@/lib/supabaseClient';
import TourCard from '@/components/TourCard';

export default async function TourListPage() {
  const { data: tours } = await supabase.from('tours').select('*');

  return (
    <main className="max-w-7xl mx-auto p-8 pt-24">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">All Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tours?.map((tour: any) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
}