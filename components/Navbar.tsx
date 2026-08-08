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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Brand Logo */}
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
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-orange-600 font-bold'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
          className="md:hidden p-2.5 rounded-xl text-blue-950 bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors shadow-sm"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu with Larger Font Sizes */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-3 text-blue-950 font-bold text-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-3.5 px-5 rounded-xl transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 shadow-sm border border-orange-100'
                      : 'text-gray-800 hover:bg-gray-50 hover:text-orange-600'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>}
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