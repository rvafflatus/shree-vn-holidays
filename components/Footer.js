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
      <div className="absolute inset-0 z-0 bg-blue-950/85"></div>

      {/* 3. Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Gentle Logo & Tagline */}
        <div className="md:col-span-1 flex flex-col items-start">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm mb-3">
            <Image 
              src="/logo.png" // यदि आपकी फाइल .jpg है तो इसे "/logo.jpg" कर दें
              alt="DesiTrails Logo"
              width={90}
              height={90}
              className="object-contain w-auto h-auto rounded-full" 
              priority
            />
          </div>
          <h3 className="text-lg font-bold tracking-wide text-white mb-1">DesiTrails</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Explore. Experience. Embrace India.
          </p>
        </div>

        {/* Right Side Columns */}
        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-orange-400 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-orange-400 transition">About Us</Link></li>
            <li><Link href="/career" className="hover:text-orange-400 transition">Career</Link></li>
            <li><Link href="/freelancing" className="hover:text-orange-400 transition">Freelancing</Link></li>
            <li><Link href="/affiliate" className="hover:text-orange-400 transition">Affiliate Program</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-orange-400 uppercase tracking-wider">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/tours" className="hover:text-orange-400 transition">Tour Packages</Link></li>
            <li><Link href="/events" className="hover:text-orange-400 transition">Events</Link></li>
            <li><a href="tel:+919782147688" className="hover:text-orange-400 transition">+91 9782147688</a></li>
            <li><a href="mailto:rv.afflatus@gmail.com" className="hover:text-orange-400 transition">rv.afflatus@gmail.com</a></li>
          </ul>
        </div>

        {/* Connect / Social Icons */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-orange-400 uppercase tracking-wider">Connect With Us</h4>
          <p className="text-xs text-gray-300 mb-4">
            Follow our trails and stay connected for exciting updates.
          </p>
          <div className="flex gap-3">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a 
              href="https://wa.me/919782147688" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition"
              aria-label="Location Map"
            >
              <FaMapMarkerAlt size={18} />
            </a>
          </div>
        </div>

      </div>
      
      {/* Copyright Bar */}
      <div className="relative z-10 text-center mt-10 text-xs text-gray-400 border-t border-blue-900 pt-6">
        © {new Date().getFullYear()} DesiTrails. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;