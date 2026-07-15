'use client';
import React from 'react';
import Link from 'next/link';

interface TourCardProps {
  tour: {
    id: string;
    title: string;
    image_url: string;
    duration: string;
    category: string;
    price: number;
  };
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    // लिंक को '/tour/' पर सेट किया गया है ताकि यह आपके फोल्डर से मैच करे
    <Link href={`/tours/${tour.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-gray-100">
        <img src={tour.image_url} alt={tour.title} className="w-full h-48 object-cover" />
        <div className="p-5">
          <h3 className="text-xl font-bold text-blue-950 mb-1">{tour.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{tour.duration} | {tour.category}</p>
          <p className="text-xl font-bold text-blue-900">₹{tour.price}</p>
          <div className="w-full mt-4 bg-blue-900 text-white py-2 rounded-lg text-center hover:bg-blue-800 transition">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;