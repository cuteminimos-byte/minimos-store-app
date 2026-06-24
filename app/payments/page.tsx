"use client";

import React, { useState } from 'react';

export default function PaymentsPage() {
  // Accordion ko open/close karne ki state
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Main Container (Baqi saare pages ki width aur alignment se bilkul match karta hua)
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">
      
      {/* Main Page Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        Payments
      </h1>

      {/* Accordion Wrapper Card */}
      <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Clickable Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 md:p-8 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
        >
          <span className="text-[15px] md:text-[16px] font-semibold text-gray-900">Payments</span>
          
          {/* Plus / Minus Icon */}
          <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
            {isOpen ? '−' : '+'}
          </span>
        </button>

        {/* Collapsible Content Area */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[1500px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {/* Content Space with Image Data */}
          <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px]">
            
            {/* Question 1 */}
            <div className="space-y-3">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                1. Which Payment Method Does Cute minimos Support?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  You can purchase on our website using a Cash on Delivery (COD) method (available nationwide).
                </li>
                <li>
                  For advance payment, please contact us using the website's LIVE CHAT option or WhatsApp us on <span className="font-semibold text-gray-900">+92 300 100 3187</span>.
                </li>
                <li>
                  Online Payments – Debit Card / Credit Card (Local & International Orders)
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                2. Is Cash on Delivery (COD) available internationally?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  Unfortunately, COD is only available in Pakistan. For International orders, we require advance payment.
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}