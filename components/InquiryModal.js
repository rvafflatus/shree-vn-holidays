"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const InquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', startDate: '', endDate: '',
    young: 0, senior: 0, child: 0, budget: ''
  });

  if (!isOpen) return null; // अगर modal बंद है तो कुछ न दिखाएं

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      start_date: formData.startDate || null,
      end_date: formData.endDate || null,
      young: parseInt(formData.young) || 0,
      senior: parseInt(formData.senior) || 0,
      child: parseInt(formData.child) || 0,
      budget: formData.budget
    };

    const { error } = await supabase
      .from('inquiries')
      .insert([payload]);

    if (error) {
      console.error("Error saving data:", error);
      alert("Error: " + error.message);
    } else {
      alert("Inquiry Sent Successfully!");
      setFormData({ name: '', email: '', startDate: '', endDate: '', young: 0, senior: 0, child: 0, budget: '' });
      onClose(); // सबमिट होने के बाद पॉप-अप बंद कर दें
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-2xl relative border border-blue-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">Plan Your Adventure</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-3 border rounded-lg w-full text-black" required />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-3 border rounded-lg w-full text-black" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Start Date</label>
              <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="p-3 border rounded-lg w-full text-black" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">End Date</label>
              <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="p-3 border rounded-lg w-full text-black" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Young (18+)</label>
              <input name="young" type="number" value={formData.young} onChange={handleChange} className="p-2 border rounded-lg w-full text-black" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Above 60</label>
              <input name="senior" type="number" value={formData.senior} onChange={handleChange} className="p-2 border rounded-lg w-full text-black" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Child</label>
              <input name="child" type="number" value={formData.child} onChange={handleChange} className="p-2 border rounded-lg w-full text-black" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Select Budget</label>
            <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-3 border rounded-lg text-black">
              <option value="">Select Budget</option>
              <option value="economy">Economy</option>
              <option value="standard">Standard</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;