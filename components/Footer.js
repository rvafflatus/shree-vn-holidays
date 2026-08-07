import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative text-white py-12 overflow-hidden">
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/adventure-bg.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-blue-900/80"></div>

      {/* 3. Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo Info */}
        <div>
          <div className="mb-4 -ml-2 bg-white/10 p-2 rounded-xl backdrop-blur-sm inline-block">
            <Image 
              src="/logo.png" // यदि आपकी फाइल .jpg है तो इसे "/logo.jpg" कर दें
              alt="DesiTrails Logo"
              width={140}
              height={140}
              className="object-contain w-auto h-auto rounded-full" 
              priority
            />
          </div>
          <p className="text-sm text-gray-200">
            Explore, Experience, Embrace India.
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