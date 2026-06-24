"use client";

import React, { useState } from 'react';

export default function TermsOfServicePage() {
  // Accordion ko open/close karne ki state
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Main Container (Aligments ko same rakhne ke liye)
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">
      
      {/* Main Page Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        Terms of service
      </h1>

      {/* Accordion Wrapper Card */}
      <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Clickable Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 md:p-8 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
        >
          <span className="text-[15px] md:text-[16px] font-semibold text-gray-900">Terms of service</span>
          
          {/* Plus / Minus Icon */}
          <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
            {isOpen ? '−' : '+'}
          </span>
        </button>

        {/* Collapsible Content Area */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[2000px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {/* Content Space with Image Data */}
          <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-5 text-[14px] md:text-[15px] text-justify">
            
            <p>
              <span className="font-bold">cute minimos</span> cannot guarantee availability of product.
            </p>

            <p>
              The content of the website is intended solely for your Personal use.
            </p>

            <p>
              Your personal information is confidential. We do not trade any email addresses.
            </p>

            <p>
              If a product is listed with incorrect information or at an incorrect price, we shall have the right to cancel the order.
            </p>

            <p>
              Photographs, artworks, products, deigns, logos, graphics and buttons are owned by <span className="font-bold">cute minimos</span> and are protected by copyright laws.
            </p>

            <p>
              Any returns for a product due to customer dissatisfaction with a finish (that is not a fault) will need to comply with the <span className="font-bold">cute minimos</span> Change of Mind Returns Policy.
            </p>

            <p>
              Despite every effort to provide accurate images of each product's color and design, actual colors and design may vary slightly, due to different device screen settings, the lighting in the installation location, slight differences in product finishes over time and other factors.
            </p>

            <p>
              In addition, please be aware that colors and textured finishes often vary between Brands; for example slightly different shades of 'White', different degrees of shininess, and different looks and feel for 'Handmade' material.
            </p>

            <p>
              <span className="font-bold">cute minimos</span> will not accept responsibility for any color or design differences that are not Handmade faults. In purchasing from <span className="font-bold">cute minimos</span>, you agree to accept the small risk that there will be a slight variation between the actual color and design, and the representation on our website due to the Handmade, semi-handmade and machine made articles.
            </p>

            <p>
              Custom orders are non refundable/exchangeable.
            </p>

            <p className="pt-2">
              By using this website or placing an order through our customer service team on social media, you acknowledge and agree to our Terms of Service. These terms apply to all interactions and transactions across all our official platforms.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}