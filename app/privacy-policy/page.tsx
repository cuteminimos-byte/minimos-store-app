"use client";

import React, { useState } from 'react';

export default function PrivacyPolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const sections = [
    {
      title: "Information We Collect",
      content: (
        <div className="space-y-3">
          <p>
            <span className="font-bold text-gray-900">cute minimos</span> takes the online privacy of its customers very seriously and will take all necessary measures to protect your personal information.
          </p>
          <p>
            Whether you register with us or browse the site anonymously, the information we may collect includes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Full name and delivery address</li>
            <li>Contact number(s) and email address</li>
            <li>Payment preferences and transaction details</li>
            <li>Order history and browsing behaviour on our website</li>
          </ul>
        </div>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <div className="space-y-3">
          <p>Your information is used solely for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To process, fulfil, and ship your orders accurately</li>
            <li>To contact you regarding your order status or customer support queries</li>
            <li>To inform you of new collections, promotions, or offers (only if you have opted in)</li>
            <li>To improve your browsing and shopping experience on our website</li>
          </ul>
          <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60 mt-2">
            <p className="font-semibold text-gray-900">
              No information will be shared with, sold to, or disclosed to any third-party entity under any circumstance. Your data is exclusively used by  cute minimos.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Cookies & Browsing Data",
      content: (
        <div className="space-y-3">
          <p>
            We use cookies to enhance your experience on our website. Cookies help us keep track of:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>The frequency and nature of your visits</li>
            <li>The contents of your shopping cart between sessions</li>
            <li>Your purchase history for faster reordering</li>
            <li>Personalised content and product recommendations</li>
          </ul>
          <p>
            Most browsers accept cookies automatically. You may adjust your browser settings to decline cookies — you will still be able to access and use our website, including placing orders.
          </p>
          <p>
            Registered users with cookie-enabled browsers will be automatically signed in on return visits. After <span className="font-semibold text-gray-900">14 days</span>, the cookie expires and you will be prompted to sign in again.
          </p>
        </div>
      ),
    },
    {
      title: "Your Agreement & Policy Updates",
      content: (
        <div className="space-y-3">
          <p>
            By browsing or placing an order on our website, you agree to abide by this Privacy Policy and all related policies of  cute minimos.
          </p>
          <p>
            We reserve the right to update or amend this Privacy Policy at any time. Any changes will be reflected on this page. We encourage you to review this policy periodically to stay informed.
          </p>
          <p>
            If you have any concerns regarding your personal data or how it is being used, please reach out to us directly:
          </p>
          <div className="pt-1 space-y-1">
            <p className="font-semibold text-gray-900">WhatsApp: <span className="font-normal text-black">+92 315-1640537</span></p>
            <p className="font-semibold text-gray-900">Email: <a href="mailto:cuteminimos@gmail.com" className="text-blue-600 hover:underline font-normal">cuteminimos@gmail.com</a></p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-3">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
            >
              <span className="text-[15px] md:text-[16px] font-semibold text-gray-900 pr-4">
                {section.title}
              </span>
              <span className="text-2xl font-light text-gray-500 flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {openIndex === i ? '−' : '+'}
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === i
                  ? 'max-h-[2000px] opacity-100 border-t border-gray-200/60'
                  : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="p-5 md:p-8 text-gray-700 leading-relaxed text-[14px] md:text-[15px] text-justify">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}