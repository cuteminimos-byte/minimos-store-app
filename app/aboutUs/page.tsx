"use client";

import React from 'react';

export default function AboutPage() {
  return (
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">

      {/* Main Page Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-8 md:mb-10">
        About Us
      </h1>

      {/* Premium Content Card Layout */}
      <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl p-6 md:p-12 shadow-sm space-y-6 text-gray-800 leading-relaxed text-[15px] md:text-[16px]">

        {/* Founder & Vision */}
        <p>
          <span className="font-bold">Cute Minimo'S</span> was founded by{' '}
          <span className="font-bold">Nida Fahad Kiyani (Owner & Founder)</span> with a vision to{' '}
          <span className="font-bold">preserve and promote the beauty of handcrafted Pakistani clothing</span>{' '}
          while creating meaningful opportunities for skilled women in rural communities.
        </p>

        {/* Story */}
        <p>
          Recognizing the incredible talent of village women in{' '}
          <span className="font-bold">embroidery, stitching, and handcrafting</span>, Nida established{' '}
          <span className="font-bold">Cute Minimo'S</span> as a platform where{' '}
          <span className="font-bold">traditional craftsmanship meets modern fashion</span>.
        </p>

        {/* Craftsmanship */}
        <p>
          Every dress at <span className="font-bold">Cute Minimo'S</span> is carefully{' '}
          <span className="font-bold">handcrafted by skilled women from villages across Pakistan</span>.
          Each piece reflects dedication, artistry, and cultural heritage passed down through generations.
        </p>

        {/* Empowerment */}
        <p>
          More than just a clothing brand, <span className="font-bold">Cute Minimo'S</span> is committed
          to supporting rural women and their families.{' '}
          <span className="font-bold">50% of the profit</span> from every dress goes directly to the women
          who create these handcrafted pieces, helping them achieve{' '}
          <span className="font-bold">financial independence</span> and a better quality of life.
        </p>

        {/* Customer Impact */}
        <p>
          By choosing <span className="font-bold">Cute Minimo'S</span>, customers are not only purchasing
          a unique handmade outfit but also{' '}
          <span className="font-bold">supporting traditional craftsmanship and empowering talented women artisans</span>.
        </p>

        {/* Brand Promise Section */}
        <div className="pt-2 space-y-4">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
            Brand Promise
          </h2>

          <p>
            <span className="font-bold">Cute Minimo'S</span> –{' '}
            <span className="italic font-medium text-gray-600">Handmade with Purpose, Crafted with Love.</span>
          </p>

          <p>
            We believe true fashion is created by{' '}
            <span className="font-bold">skilled hands</span>, inspired by{' '}
            <span className="font-bold">culture</span>, and made with{' '}
            <span className="font-bold">passion</span>.
          </p>

          <p className="text-base md:text-lg font-bold text-gray-900">
            Heritage + Art + Empowerment = Cute Minimo'S
          </p>
        </div>

        {/* Closing tagline */}
        <div className="pt-2 border-t border-gray-200 space-y-1 text-gray-600 italic text-sm md:text-base">
          <p>Every stitch tells a story.</p>
          <p>Every dress supports a dream.</p>
          <p>Every purchase makes a difference.</p>
        </div>

      </div>
    </div>
  );
}