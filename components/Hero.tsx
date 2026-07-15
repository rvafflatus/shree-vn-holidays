'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* बैकग्राउंड वीडियो/इमेज के लिए कंटेनर */}
      <div className="absolute inset-0 bg-blue-900/40 z-10" /> 
      <div className="absolute inset-0 bg-[url('/nature-bg.jpg')] bg-cover bg-center" />

      {/* मुख्य कंटेंट */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Explore, Dream, Discover
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Experience the beauty of nature with our curated holiday packages and luxury events.
        </p>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg">
          Start Your Journey
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;