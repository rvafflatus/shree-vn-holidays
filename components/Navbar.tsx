'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Tours', href: '/tours' },
  { name: 'Events', href: '/events' },
  { name: 'Admin', href: '/admin' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Desitrails Text Logo (मोबाइल और लैपटॉप दोनों पर बड़ा और साफ़) */}
        <Link href="/" className="flex items-center gap-0.5 group">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-blue-950">
            desi
          </span>
          <span className="text-2xl md:text-3xl font-black tracking-tight text-orange-600">
            trails
          </span>
          <span className="text-xs md:text-sm font-bold text-gray-400 self-end mb-1 ml-0.5">
            .in
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-blue-950 font-semibold text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-orange-600 font-bold'
                    : 'hover:text-orange-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded-md text-blue-950 hover:bg-gray-100 focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu (यहाँ फॉन्ट साइज़ को बड़ा और पढ़ने में आसान किया गया है) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 pt-3 pb-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-blue-950 font-semibold text-base">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 font-bold'
                      : 'hover:bg-gray-50 hover:text-orange-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;