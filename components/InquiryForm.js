"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Supabase client import किया गया है

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', startDate: '', endDate: '',
    young: 0, senior: 0, child: 0, budget: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // डेटा को Supabase टेबल के कॉलम के अनुसार तैयार किया गया है
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

    // Supabase में डेटा इन्सर्ट करें
    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload]);

    if (error) {
      console.error("Error saving data:", error);
      alert("Error: " + error.message);
    } else {
      alert("Inquiry Sent Successfully!");
      // फॉर्म सबमिट होने के बाद फील्ड्स को रीसेट कर दें
      setFormData({ 
        name: '', email: '', startDate: '', endDate: '', 
        young: 0, senior: 0, child: 0, budget: '' 
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Start Your Journey</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Full Name" 
            className="p-3 border rounded-lg w-full text-black" 
            required 
          />
          <input 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            className="p-3 border rounded-lg w-full text-black" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Start Date</label>
            <input 
              name="startDate" 
              type="date" 
              value={formData.startDate} 
              onChange={handleChange} 
              className="p-3 border rounded-lg w-full text-black" 
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">End Date</label>
            <input 
              name="endDate" 
              type="date" 
              value={formData.endDate} 
              onChange={handleChange} 
              className="p-3 border rounded-lg w-full text-black" 
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Young (18+)</label>
            <input 
              name="young" 
              type="number" 
              value={formData.young} 
              onChange={handleChange} 
              className="p-2 border rounded-lg w-full text-black" 
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Above 60</label>
            <input 
              name="senior" 
              type="number" 
              value={formData.senior} 
              onChange={handleChange} 
              className="p-2 border rounded-lg w-full text-black" 
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Child</label>
            <input 
              name="child" 
              type="number" 
              value={formData.child} 
              onChange={handleChange} 
              className="p-2 border rounded-lg w-full text-black" 
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Select Budget</label>
          <select 
            name="budget" 
            value={formData.budget} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg text-black"
          >
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
  );
};

export default InquiryForm;