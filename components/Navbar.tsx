'use client';
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/20 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* लोगो का हिस्सा */}
        <Link href="/" className="text-2xl font-bold text-blue-900">
          Shree VN
        </Link>

        {/* नेविगेशन लिंक्स */}
        <div className="flex gap-6 text-blue-900 font-medium">
          <Link href="/" className="hover:text-orange-600 transition">Home</Link>
          <Link href="/tours" className="hover:text-orange-600 transition">Tours</Link>
          <Link href="/events" className="hover:text-orange-600 transition">Events</Link>
          <Link href="/admin" className="hover:text-orange-600 transition">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;