"use client";

import React, { useState } from 'react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
  };

  return (
    // Main Wrapper
    <div className="w-full max-w-7xl mx-auto px-4 py-10 md:py-16 select-none text-gray-800">
      
      {/* Top Header Labels */}
      <div className="text-center mb-12 md:mb-16 space-y-4">
        <p className="text-[12px] md:text-[13px] tracking-[0.2em] text-gray-500 uppercase">
          Contact Us
        </p>
        <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-gray-950 uppercase font-medium">
          Get In Touch
        </h1>
      </div>

      {/* Two Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Side: Contact Form (Takes 7 columns on large screens) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-[16px] md:text-[18px] font-semibold text-gray-900 mb-1">
              Send us an email
            </h2>
            <p className="text-[13px] md:text-[14px] text-gray-500">
              Ask us anything! We're here to help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[13px] md:text-[14px] text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-[14px] focus:outline-none focus:border-gray-900 bg-white transition-colors"
              />
            </div>

            {/* Phone Number Input */}
            <div className="space-y-1.5">
              <label className="text-[13px] md:text-[14px] text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-[14px] focus:outline-none focus:border-gray-900 bg-white transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[13px] md:text-[14px] text-gray-700 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-[14px] focus:outline-none focus:border-gray-900 bg-white transition-colors"
              />
            </div>

            {/* Comment TextArea */}
            <div className="space-y-1.5">
              <label className="text-[13px] md:text-[14px] text-gray-700 font-medium">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-[14px] focus:outline-none focus:border-gray-900 bg-white resize-y transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#1e2d4a]  hover:bg-white hover:text-black cursor-pointer text-white font-semibold text-[12px] md:text-[13px] tracking-wider uppercase px-8 py-3.5 transition-colors duration-200 shadow-sm focus:outline-none"
              >
                Submit Contact
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Live Help Informational Box (Takes 5 columns on large screens) */}
        <div className="lg:col-span-5 bg-[#f9f9f9] border border-gray-100 rounded-sm p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-[16px] md:text-[17px] font-bold text-gray-900 tracking-wide mb-4">
              Live Help
            </h2>
            
            <div className="space-y-4 text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
              <div>
                <p className="font-semibold text-gray-800">WhatsApp Us:</p>
                <p>We're available only on WhatsApp Live Chat.</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">Customer Complaint: (9:00am – 5:00pm)</p>
                <p className="text-gray-900 font-medium">+92923001803448</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">General Information: (9:00am – 9:00pm)</p>
                <p className="text-gray-900 font-medium">+92923001803448</p>
              </div>
            </div>
          </div>

          {/* Email Row with Icon */}
          <div className="flex items-center gap-3 text-[13px] md:text-[14px] pt-2 border-t border-gray-200/60">
            <svg
              className="w-4 h-4 text-gray-700 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a
              href="mailto:cuteminimos@gmail.com
"
              className="text-gray-600 hover:text-gray-900 hover:underline break-all"
            >
              cuteminimos@gmail.com
            </a>
          </div>

          {/* Postal Address */}
          <div className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed pt-4 border-t border-gray-200/60">
            <p>Chak no 5/11.l gakhranwala near harrappa toll plaza City Chichawatni</p>
          </div>
        </div>

      </div>
    </div>
  );
}