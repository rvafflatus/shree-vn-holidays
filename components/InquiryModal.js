"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const InquiryModal = ({ isOpen, onClose }) => {
  // मुख्य फॉर्म स्टेट
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    destination: '', 
    startDate: '', 
    endDate: '',
    young: 0, 
    senior: 0, 
    child: 0, 
    budget: ''
  });

  const [customDestination, setCustomDestination] = useState('');

  // टॉगल और एडवांस्ड ट्रैवल ऑप्शन स्टेट
  const [needHotel, setNeedHotel] = useState(false);
  const [accommodationType, setAccommodationType] = useState('Hotel');
  const [roomType, setRoomType] = useState('Deluxe');
  const [roomsCount, setRoomsCount] = useState(1);

  const [needMeal, setNeedMeal] = useState(false);
  const [mealType, setMealType] = useState('Breakfast Only');

  const [needTransport, setNeedTransport] = useState(false);
  const [transportMode, setTransportMode] = useState('Flight'); // Flight, Bus, Train
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan');
  const [needPickupDrop, setNeedPickupDrop] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalDestination = formData.destination === 'Other Custom Location' 
      ? customDestination 
      : formData.destination;

    // Supabase के लिए केवल बुनियादी डेटा (डेटाबेस सुरक्षित रखने के लिए)
    const payload = {
      name: formData.name,
      email: formData.email,
      destination: finalDestination,
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
      return;
    }

    // WhatsApp के लिए पूरी विस्तृत डीटेल्स
    const whatsappNumber = "919782147688";
    let whatsappMessage = `*New Tour & Booking Inquiry!* 🌟%0A%0A` +
      `👤 *Name:* ${formData.name}%0A` +
      `📧 *Email:* ${formData.email}%0A` +
      `🌍 *Destination:* ${finalDestination}%0A` +
      `📅 *Dates:* ${formData.startDate || 'N/A'} to ${formData.endDate || 'N/A'}%0A` +
      `👥 *Travelers:* Adults: ${formData.young}, Seniors: ${formData.senior}, Kids: ${formData.child}%0A` +
      `💰 *Budget Level:* ${formData.budget || 'N/A'}%0A`;

    // होटल डीटेल्स
    if (needHotel) {
      whatsappMessage += `%0A🏨 *Accommodation:* ${accommodationType} (${roomType}), Rooms: ${roomsCount}%0A`;
    }

    // मील डीटेल्स
    if (needMeal) {
      whatsappMessage += `🍽️ *Meal Plan:* ${mealType}%0A`;
    }

    // ट्रांसपोर्ट, फ्लाइट/ट्रेन/बस और पिकअप डीटेल्स
    if (needTransport) {
      whatsappMessage += `%0A✈️ *Transport & Travel:*%0A` +
        `- Mode: ${transportMode}%0A` +
        `- From: ${fromLocation || 'N/A'} ➡️ To: ${toLocation || 'N/A'}%0A` +
        `- Local Vehicle: ${vehicleType}%0A` +
        `- Pickup/Drop Service: ${needPickupDrop ? 'Yes' : 'No'}%0A`;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    alert("Inquiry Submitted Successfully & Sent to WhatsApp!");
    
    // फॉर्म रीसेट करना
    setFormData({ 
      name: '', email: '', destination: '', startDate: '', endDate: '', 
      young: 0, senior: 0, child: 0, budget: '' 
    });
    setCustomDestination('');
    setNeedHotel(false);
    setNeedMeal(false);
    setNeedTransport(false);
    setFromLocation('');
    setToLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl relative border border-blue-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-blue-950 mb-2">Plan Your Custom Journey</h2>
        <p className="text-gray-500 text-sm mb-6">Fill in basic details and toggle optional preferences as per your trip.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* बेसिक डीटेल्स */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">Full Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="p-3 border rounded-lg w-full text-black text-sm" required />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">Email Address *</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="p-3 border rounded-lg w-full text-black text-sm" required />
            </div>
          </div>

          {/* डेस्टिनेशन */}
          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">Desired Location / Package *</label>
            <select name="destination" value={formData.destination} onChange={handleChange} className="w-full p-3 border rounded-lg text-black text-sm" required>
              <option value="">Select Destination</option>
              <option value="Rajasthan Heritage Tour">Rajasthan Heritage Tour</option>
              <option value="Kerala Backwaters">Kerala Backwaters</option>
              <option value="Himalayan Adventure">Himalayan Adventure</option>
              <option value="Other Custom Location">Other Custom Location</option>
            </select>
          </div>

          {formData.destination === 'Other Custom Location' && (
            <div>
              <label className="text-xs text-orange-600 font-semibold block mb-1">Type Custom Destination</label>
              <input 
                type="text" 
                value={customDestination} 
                onChange={(e) => setCustomDestination(e.target.value)} 
                placeholder="Enter city or state name" 
                className="p-3 border-2 border-orange-400 rounded-lg w-full text-black bg-orange-50 text-sm" 
                required 
              />
            </div>
          )}
          
          {/* तारीखें */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">Start Date</label>
              <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="p-3 border rounded-lg w-full text-black text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">End Date</label>
              <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="p-3 border rounded-lg w-full text-black text-sm" />
            </div>
          </div>

          {/* यात्री संख्या और बजट */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">Adults (18+)</label>
              <input name="young" type="number" min="0" value={formData.young} onChange={handleChange} className="p-2.5 border rounded-lg w-full text-black text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">Seniors (60+)</label>
              <input name="senior" type="number" min="0" value={formData.senior} onChange={handleChange} className="p-2.5 border rounded-lg w-full text-black text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">Children</label>
              <input name="child" type="number" min="0" value={formData.child} onChange={handleChange} className="p-2.5 border rounded-lg w-full text-black text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">Select Budget Preference</label>
            <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-3 border rounded-lg text-black text-sm">
              <option value="">Select Budget</option>
              <option value="Economy">Economy</option>
              <option value="Standard">Standard</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <hr className="border-gray-200 my-2" />

          {/* --- एडवांस्ड कस्टमाइज़ेशन सेक्शंस (टॉगल ऑप्शंस) --- */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wide">Optional Add-ons (Select what you need)</h3>

            {/* 1. होटल / रिसॉर्ट टॉगल */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-800">
                <input 
                  type="checkbox" 
                  checked={needHotel} 
                  onChange={(e) => setNeedHotel(e.target.checked)} 
                  className="w-4 h-4 text-orange-600 rounded"
                />
                Need Hotel / Resort Booking?
              </label>

              {needHotel && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 pl-6">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Type</label>
                    <select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} className="w-full p-2 border rounded text-xs text-black">
                      <option value="Hotel">Hotel</option>
                      <option value="Resort">Resort</option>
                      <option value="Homestay">Homestay</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Room Type</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full p-2 border rounded text-xs text-black">
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Super Deluxe">Super Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Rooms Required</label>
                    <input type="number" min="1" value={roomsCount} onChange={(e) => setRoomsCount(e.target.value)} className="w-full p-2 border rounded text-xs text-black" />
                  </div>
                </div>
              )}
            </div>

            {/* 2. मील / खाना टॉगल */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-800">
                <input 
                  type="checkbox" 
                  checked={needMeal} 
                  onChange={(e) => setNeedMeal(e.target.checked)} 
                  className="w-4 h-4 text-orange-600 rounded"
                />
                Need Meal Plan Included?
              </label>

              {needMeal && (
                <div className="mt-2 pl-6">
                  <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="w-full p-2 border rounded text-xs text-black md:w-1/2">
                    <option value="Breakfast Only">Breakfast Only (CP)</option>
                    <option value="Breakfast & Dinner">Breakfast & Dinner (MAP)</option>
                    <option value="All Meals Included">All Meals Included (AP)</option>
                  </select>
                </div>
              )}
            </div>

            {/* 3. ट्रांसपोर्ट, फ्लाइट/बस/ट्रेन और फ्रॉम-टू टॉगल */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-800">
                <input 
                  type="checkbox" 
                  checked={needTransport} 
                  onChange={(e) => setNeedTransport(e.target.checked)} 
                  className="w-4 h-4 text-orange-600 rounded"
                />
                Need Travel (Flight / Train / Bus / Cab)?
              </label>

              {needTransport && (
                <div className="mt-3 space-y-3 pl-6">
                  {/* ट्रैवल मोड सिलेक्शन */}
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Select Mode</label>
                    <div className="flex gap-4 text-xs font-semibold text-black">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="transportMode" checked={transportMode === 'Flight'} onChange={() => setTransportMode('Flight')} /> Flight ✈️
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="transportMode" checked={transportMode === 'Train'} onChange={() => setTransportMode('Train')} /> Train 🚆
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="transportMode" checked={transportMode === 'Bus'} onChange={() => setTransportMode('Bus')} /> Bus 🚌
                      </label>
                    </div>
                  </div>

                  {/* From और To लोकेशन */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">From (Departure City/Station)</label>
                      <input type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} placeholder="e.g. Jaipur / Delhi" className="w-full p-2 border rounded text-xs text-black" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">To (Arrival City/Station)</label>
                      <input type="text" value={toLocation} onChange={(e) => setToLocation(e.target.value)} placeholder="e.g. Srinagar / Goa" className="w-full p-2 border rounded text-xs text-black" />
                    </div>
                  </div>

                  {/* लोकल व्हीकल और पिकअप-ड्रॉप */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Local Vehicle Type</label>
                      <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full p-2 border rounded text-xs text-black">
                        <option value="Sedan">Sedan (Dzire/Etios)</option>
                        <option value="SUV">SUV (Innova/Ertiga)</option>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 font-medium">
                        <input type="checkbox" checked={needPickupDrop} onChange={(e) => setNeedPickupDrop(e.target.checked)} className="w-4 h-4 text-orange-600 rounded" />
                        Include Pickup & Drop Service
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          <button type="submit" className="w-full bg-orange-600 text-white py-3.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg text-base">
            Submit Inquiry & Send to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;