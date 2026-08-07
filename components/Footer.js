import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative text-white py-12 overflow-hidden">
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/adventure-bg.jpg')", // अपनी इमेज का नाम यहाँ सही रखें
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-blue-900/80"></div>

      {/* 3. Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-0.5 mb-4">
            <span className="text-2xl font-black tracking-tight text-white">desi</span>
            <span className="text-2xl font-black tracking-tight text-orange-400">trails</span>
            <span className="text-xs font-bold text-gray-300 self-end mb-1 ml-0.5">.in</span>
          </div>
          <p className="text-sm text-gray-200">
            Explore the beauty, heritage, and incredible culture of India with us. Your trusted partner for travel and events.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition"><FaFacebook size={24} /></a>
            <a href="https://wa.me/919782147688" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition"><FaWhatsapp size={24} /></a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition"><FaMapMarkerAlt size={24} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 text-orange-400">Company</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/about" className="hover:text-orange-400 transition">About Us</Link></li>
            <li><Link href="/career" className="hover:text-orange-400 transition">Career</Link></li>
            <li><Link href="/freelancing" className="hover:text-orange-400 transition">Freelancing</Link></li>
            <li><Link href="/affiliate" className="hover:text-orange-400 transition">Affiliate Program</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4 text-orange-400">Support</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/tours" className="hover:text-orange-400 transition">Tour Packages</Link></li>
            <li><Link href="/events" className="hover:text-orange-400 transition">Events</Link></li>
            <li><a href="tel:+919782147688" className="hover:text-orange-400 transition">+91 9782147688</a></li>
            <li><a href="mailto:rv.afflatus@gmail.com" className="hover:text-orange-400 transition">rv.afflatus@gmail.com</a></li>
          </ul>
        </div>

      </div>
      
      <div className="relative z-10 text-center mt-12 text-xs text-gray-300 border-t border-blue-700 pt-6">
        © {new Date().getFullYear()} DesiTrails. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;