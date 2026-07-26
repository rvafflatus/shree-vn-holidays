'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2.5">
        
        {/* छोटा और परफेक्ट लोगो */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Shree VN Holidays Logo" 
            width={110} 
            height={40}
            className="object-contain h-9 w-auto"
            priority
          />
        </Link>

        {/* नेविगेशन लिंक्स */}
        <nav className="flex items-center gap-6 text-blue-950 font-semibold text-sm">
          <Link href="/" className="hover:text-orange-600 transition">Home</Link>
          <Link href="/tours" className="hover:text-orange-600 transition">Tours</Link>
          <Link href="/events" className="hover:text-orange-600 transition">Events</Link>
          <Link href="/admin" className="hover:text-orange-600 transition text-orange-600">Admin</Link>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;