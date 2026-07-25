import React from 'react';
import InquiryForm from '@/components/InquiryForm'; // अपनी फाइल पाथ चेक कर लें

export default function TourPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* पेज का मुख्य कंटेंट */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
          Plan Your Next Adventure
        </h1>
        <p className="text-lg text-gray-600">
          अपने सपनों की यात्रा के लिए नीचे दिए गए फॉर्म को भरें। हम जल्द ही आपसे संपर्क करेंगे।
        </p>
      </div>

      {/* Inquiry Form यहाँ डिस्प्ले होगा */}
      <InquiryForm />
    </div>
  );
}