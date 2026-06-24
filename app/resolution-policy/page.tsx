"use client";

import React, { useState } from 'react';

export default function ResolutionPolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const sections = [
    {
      title: "Production Errors & Our Commitment",
      content: (
        <div className="space-y-3">
          <p>
            At Cute minimos, every garment is uniquely crafted to your individual specifications — encompassing sizing, colour, fabric selection, structural design, and styling. While we maintain strict quality control throughout our manufacturing process, the highly bespoke nature of our work means that occasional production deviations may occur.
          </p>
          <p>
            We explicitly state that the delivery of an incorrect item, or one that deviates from the requested specifications, is strictly a <span className="font-semibold text-gray-900">systematic manufacturing discrepancy</span> and in no way constitutes a deliberate act of deception, misrepresentation, or fraud.
          </p>
          <p>
            We stand by the integrity of our craftsmanship and take full responsibility for errors that originate on our end.
          </p>
        </div>
      ),
    },
    {
      title: "Your Rights — Resolution Options",
      content: (
        <div className="space-y-4">
          <p>
            In the event that you receive an incorrect or faulty product due to a production error on our part, you are entitled to choose one of the following resolutions:
          </p>
          <div className="space-y-3">
            <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60">
              <p className="font-bold text-gray-900 mb-1">Full Refund</p>
              <p>A complete return of the original purchase amount — processed within 15 business days through your original payment method.</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60">
              <p className="font-bold text-gray-900 mb-1">Product Exchange</p>
              <p>An exchange of the incorrect or faulty item for an alternative article of your choice from our current collection.</p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60">
              <p className="font-bold text-gray-900 mb-1">Complimentary Remake</p>
              <p>A brand new, fully corrected version of your originally ordered article — manufactured and shipped to you at <span className="font-semibold text-gray-900">no additional cost.</span></p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "What Does NOT Qualify for Resolution",
      content: (
        <div className="space-y-3">
          <p>To maintain fairness and clarity, the following situations are <span className="font-semibold text-red-600">not covered</span> under our Resolution Policy:</p>
          <div className="bg-red-50 border border-red-200/70 rounded-lg p-4">
            <ul className="list-disc pl-5 space-y-2 text-red-700">
              <li>Articles that have been worn, washed, altered, or damaged by the customer after delivery.</li>
              <li>Change of mind or personal preference after the 50% advance payment has been made and the order confirmed.</li>
              <li>Colour variations caused by screen display differences — minor shade differences between the screen and the fabric are not production errors.</li>
              <li>Sale articles — no resolution claims accepted on discounted items.</li>
              <li>Custom orders where specifications were approved by the customer before production commenced.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "How to Raise a Resolution Claim",
      content: (
        <div className="space-y-3">
          <p className="font-semibold text-gray-900">Please follow these steps to raise your claim:</p>
          <div className="space-y-3">
            <p><span className="font-bold text-gray-900">Step 1:</span> Contact our Customer Service within <span className="font-semibold text-gray-900">48 hours of receiving your order.</span> Share clear photographs of the item alongside a description of the issue.</p>
            <p><span className="font-bold text-gray-900">Step 2:</span> Our team will review your claim within 24–48 hours and confirm whether it qualifies as a production error.</p>
            <p><span className="font-bold text-gray-900">Step 3:</span> If approved, we will present you with the three resolution options — Refund, Exchange, or Complimentary Remake — and proceed with your chosen resolution promptly.</p>
          </div>
          <div className="pt-2 space-y-1">
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
        Resolution Policy
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