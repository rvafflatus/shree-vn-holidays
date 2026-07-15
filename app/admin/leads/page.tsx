import { supabase } from '@/lib/supabaseClient';

export default async function AdminLeads() {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*, tours(title)')
    .order('created_at', { ascending: false });

  if (error) return <div>Error loading leads: {error.message}</div>;

  return (
    <main className="max-w-6xl mx-auto p-8 pt-20">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">आने वाली पूछताछ (Leads Dashboard)</h1>
      {/* टेबल वाला कोड यहाँ रहेगा */}
    </main>
  );
}