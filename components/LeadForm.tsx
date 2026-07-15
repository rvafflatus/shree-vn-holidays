'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LeadForm({ tourId }: { tourId: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // सफलता के लिए नई स्टेट

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const { error } = await supabase.from('leads').insert([
      {
        full_name: formData.get('full_name'),
        phone: formData.get('phone'),
        tour_id: tourId,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setSuccess(true); // सबमिट होते ही सफलता मैसेज दिखाएं
      e.target.reset();
    }
    setLoading(false);
  };

  // अगर फॉर्म सबमिट हो गया है, तो सिर्फ यह मैसेज दिखाएं
  if (success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg text-center">
        <h4 className="font-bold text-lg">धन्यवाद!</h4>
        <p>हमें आपकी पूछताछ मिल गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।</p>
        <button 
          onClick={() => setSuccess(false)} 
          className="mt-4 text-sm underline text-green-800"
        >
          एक और पूछताछ करें
        </button>
      </div>
    );
  }

  // सामान्य फॉर्म रेंडर करें
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="full_name" type="text" placeholder="आपका नाम" className="p-3 rounded-lg border" required />
      <input name="phone" type="tel" placeholder="आपका फोन नंबर" className="p-3 rounded-lg border" required />
      <button type="submit" disabled={loading} className="md:col-span-2 bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
        {loading ? "सबमिट हो रहा है..." : "सबमिट करें"}
      </button>
    </form>
  );
}