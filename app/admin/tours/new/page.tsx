'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewTour() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from('tours').insert([
      {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        duration: formData.get('duration'),
        category: formData.get('category'),
        image_url: formData.get('image_url'),
      },
    ]);

    if (error) alert("Error: " + error.message);
    else {
      alert("टूर सफलतापूर्वक जुड़ गया!");
      router.push('/admin/tours');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">नया टूर जोड़ें</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="टूर का नाम" className="w-full p-3 border rounded" required />
        <textarea name="description" placeholder="विवरण (Description)" className="w-full p-3 border rounded" required />
        <input name="price" type="number" placeholder="कीमत (Price)" className="w-full p-3 border rounded" required />
        <input name="duration" placeholder="अवधि (जैसे: 3 Days)" className="w-full p-3 border rounded" required />
        <input name="category" placeholder="कैटेगरी (जैसे: Adventure)" className="w-full p-3 border rounded" required />
        <input name="image_url" placeholder="इमेज URL" className="w-full p-3 border rounded" required />
        <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white p-3 rounded font-bold">
          {loading ? "जुड़ रहा है..." : "टूर सेव करें"}
        </button>
      </form>
    </main>
  );
}