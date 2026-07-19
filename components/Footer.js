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

      {/* 2. Dark Overlay (ये आपके टेक्स्ट को क्लियर दिखाएगा) */}
      <div className="absolute inset-0 z-0 bg-blue-900/80"></div>

      {/* 3. Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-400">Shree VN Holidays</h3>
          <p className="text-sm text-gray-200">
            Explore, Dream, Discover with us. Your trusted partner for travel and events.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-orange-500"><FaFacebook size={24} /></a>
            <a href="https://wa.me/919782147688" target="_blank" className="hover:text-orange-500"><FaWhatsapp size={24} /></a>
            <a href="https://maps.google.com" target="_blank" className="hover:text-orange-500"><FaMapMarkerAlt size={24} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 text-orange-400">Company</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/about" className="hover:text-orange-500">About Us</Link></li>
            <li><Link href="/career" className="hover:text-orange-500">Career</Link></li>
            <li><Link href="/freelancing" className="hover:text-orange-500">Freelancing</Link></li>
            <li><Link href="/affiliate" className="hover:text-orange-500">Affiliate Program</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4 text-orange-400">Support</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/inquiry" className="hover:text-orange-500">Inquiry</Link></li>
            <li><a href="tel:+919782147688" className="hover:text-orange-500">+91 9782147688</a></li>
            <li><a href="mailto:rv.afflatus@gmail.com" className="hover:text-orange-500">rv.afflatus@gmail.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="relative z-10 text-center mt-12 text-xs text-gray-400 border-t border-blue-700 pt-6">
        © 2026 Afflatus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;