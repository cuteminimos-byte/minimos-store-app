"use client";

import React from 'react';

export default function AboutPage() {
  return (
    // Main container carousel ke width aur style se match karta hua
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">
      
      {/* Main Page Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-8 md:mb-10">
        About Us
      </h1>

      {/* Premium Content Card Layout */}
      <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl p-6 md:p-12 shadow-sm space-y-6 text-gray-800 leading-relaxed text-[15px] md:text-[16px]">
        
        {/* Paragraph 1 */}
        <p>
          <span className="font-bold">Cute minimos</span> was founded in <span className="font-bold">2018</span> by <span className="font-bold">Sadaf Naeem (CEO)</span> during her Business Management degree.
        </p>

        {/* Paragraph 2 */}
        <p>
          She already had a business mindset due to her strong family business background. While pursuing her degree, Sadaf discovered that the <span className="font-bold">handmade clothing industry</span> was vanishing due to a lack of platforms. Together with her family, she created a <span className="font-bold">shopping platform</span> for handmade clothing enthusiasts — a place where they could discover the creative, handmade heritage of their ancestors with a modern, fashionable touch at the tap of a button.
        </p>

        {/* Brand Promise Section */}
        <div className="pt-2 space-y-4">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
            Brand Promise
          </h2>
          
          <p>
            <span className="font-bold">Cute minimos</span> – <span className="italic font-medium text-gray-600">Originality and Creativity at Great Prices.</span>
          </p>
          
          <p>
            <span className="font-bold">Cute minimos</span> makes handmade clothing creative and fashionable! Our formula is simple:
          </p>
          
          <p className="text-base md:text-lg font-bold text-gray-900">
            Heritage + Art + Creativity = Cute minimos
          </p>
        </div>

        {/* Paragraph 3 */}
        <p className="pt-2">
          Whether it’s a <span className="font-bold">newborn baby</span>, a <span className="font-bold">special event</span>, a <span className="font-bold">cozy day at home</span>, or a <span className="font-bold">family reunion</span>, Cute minimos will keep you and your loved ones smiling. We offer a large assortment of creative, quality clothes at great prices so families around the world can enjoy more <span className="font-bold">joyful moments.</span>
        </p>

      </div>
    </div>
  );
}