import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-blue-900 text-white py-12 overflow-hidden">
      {/* Background Image with Fade/Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20" // Adjust opacity (0-100) to change fade intensity
        style={{
          backgroundImage: "url('/path-to-your-image.jpg')", // Replace with your image path in the public folder
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Content Container (z-10 ensures it sits above the image) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Shree VN Holidays</h3>
          <p className="text-sm text-gray-300">
            Explore, Dream, Discover with us. Your trusted partner for travel and events.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-orange-500"><FaFacebook size={24} /></a>
            <a href="https://wa.me/919782147688" target="_blank" className="hover:text-orange-500"><FaWhatsapp size={24} /></a>
            <a href="https://maps.google.com" target="_blank" className="hover:text-orange-500"><FaMapMarkerAlt size={24} /></a>
          </div>
        </div>

        {/* Links... */}
        {/* (Keep your existing links code here) */}
      </div>
      
      <div className="relative z-10 text-center mt-12 text-xs text-gray-500 border-t border-blue-800 pt-6">
        © 2026 Afflatus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;