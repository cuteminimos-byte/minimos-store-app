"use client";

import React, { useState } from 'react';

export default function ReturnAndExchangePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const sections = [
    {
      title: "1. Colour Selection Policy",
      content: (
        <div className="space-y-3">
          <p>
            At Cute minimos, we believe every customer deserves a garment that truly reflects their personal style. That is why we offer <span className="font-semibold text-gray-900">full colour customisation</span> — you may select the colour of your dress according to your own preference at the time of placing your order.
          </p>
          <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60 space-y-2">
            <p className="font-semibold text-gray-900">Please note:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Colour selection must be communicated clearly at the time of order placement.</li>
              <li>Since each article is crafted specifically to your chosen colour, <span className="font-semibold text-gray-900">no return or exchange will be accepted on the basis of colour preference after the order has been confirmed.</span></li>
              <li>Minor variations in shade may occur due to screen display differences and fabric dyeing — these do not qualify as production errors.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "2. Return Policy — 50% Advance Orders",
      content: (
        <div className="space-y-3">
          <p>
            Once an order has been <span className="font-semibold text-gray-900">confirmed and the 50% advance payment has been made</span>, the order enters production immediately. As a result:
          </p>
          <div className="bg-red-50 border border-red-200/70 rounded-lg p-4">
            <p className="font-bold text-red-700 text-[14px] md:text-[15px]">No returns will be accepted once the 50% advance has been paid and the order has been submitted.</p>
          </div>
          <p>
            This policy exists because all articles are made to order — your advance payment confirms production and allocates materials exclusively for your garment.
          </p>
          <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60 space-y-1.5">
            <p className="font-semibold text-gray-900">Exceptions — the following situations are still eligible for resolution:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You received an item that is significantly different from what was ordered (production error on our end).</li>
              <li>The article arrived in a damaged condition caused during manufacturing or shipping.</li>
              <li>Size issue — subject to the Exchange Policy below.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "3. Exchange Policy",
      content: (
        <div className="space-y-4">
          <p>
            We understand that sizing can sometimes be tricky. If you did not receive your required article or there is a <span className="font-semibold text-gray-900">size issue</span>, you may request an exchange under the following conditions:
          </p>
          <div className="space-y-3">
            <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60">
              <p className="font-semibold text-gray-900 mb-1.5">✓ Exchange is allowed when:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>The required article was not available and a substitute was sent — you may exchange it for the correct one.</li>
                <li>There is a genuine size issue — the item must be unworn, unwashed, and in its original condition with all labels attached.</li>
                <li>A production error occurred on our end resulting in incorrect specifications.</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200/70 rounded-lg p-4">
              <p className="font-semibold text-red-700 mb-1.5">✗ Exchange will NOT be accepted when:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-red-700">
                <li>The article has been worn, washed, damaged, or altered by the customer.</li>
                <li>The item is being returned due to a change of mind or personal preference after advance payment.</li>
                <li>Sale articles — no return or exchange on sale items under any circumstances.</li>
              </ul>
            </div>
          </div>
          <p className="text-[13px] text-gray-500 italic">
            Exchange requests must be raised within 10 days of receiving the order. Contact our Customer Service via WhatsApp to initiate the process.
          </p>
        </div>
      ),
    },
    {
      title: "4. Stitching / Alteration Service",
      content: (
        <div className="space-y-3">
          <p>
            If you wish to have your article <span className="font-semibold text-gray-900">stitched or altered</span>, we offer that service as well. Simply let us know at the time of ordering or when raising a request:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Stitching can be requested for any unstitched article from our collection.</li>
            <li>Alteration requests (e.g. adjusting fit or length) can be discussed with our Customer Service team.</li>
            <li>Additional charges may apply depending on the complexity of the work required.</li>
            <li>Turnaround time for stitching/alterations will be communicated at the time of request.</li>
          </ul>
          <p className="font-semibold text-gray-900">
            To request stitching or alteration, contact us on WhatsApp: <span className="text-black">+92 315-1640537</span>
          </p>
        </div>
      ),
    },
    {
      title: "5. Damaged Article Policy",
      content: (
        <div className="space-y-3">
          <p>
            We take quality very seriously. However, please note the following regarding damaged articles:
          </p>
          <div className="bg-white/70 rounded-lg p-4 border border-gray-200/60 space-y-2">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold text-gray-900">Damage caused by the customer</span> — articles that have been torn, stained, or damaged after delivery are <span className="font-semibold text-red-600">not eligible for return or exchange.</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Damage caused during manufacturing or shipping</span> — if you receive a damaged article due to a fault on our end, you are entitled to a Full Refund, Exchange, or Complimentary Remake at no extra cost.
              </li>
            </ul>
          </div>
          <p className="text-[13px] text-gray-500 italic">
            Please photograph any damage immediately upon receiving your order and share it with our Customer Service team within 48 hours of delivery.
          </p>
        </div>
      ),
    },
    {
      title: "6. How to Initiate an Exchange Request",
      content: (
        <div className="space-y-3">
          <div className="space-y-3">
            <p>
              <span className="font-bold text-gray-900">Step 1:</span> Contact our Customer Service on WhatsApp within 10 days of receiving your order. Provide your order details, photos of the item, and a clear description of the issue.
            </p>
            <p>
              <span className="font-bold text-gray-900">Step 2:</span> Our team will review your request within 24–48 hours and provide a Return Authorisation Number (RAN) if your request is approved.
            </p>
            <p>
              <span className="font-bold text-gray-900">Step 3:</span> Pack the item carefully in its original condition with all labels attached. Ship it back to our address (provided in the RAN email) and share the tracking number with us.
            </p>
            <p>
              <span className="font-bold text-gray-900">Step 4:</span> Once we receive and verify the returned item, your exchange or resolution will be processed within 3 business days.
            </p>
          </div>
          <p className="font-semibold text-gray-900 pt-1">
            WhatsApp Support: <span className="text-black">+92 315-1640537</span>
          </p>
          <p className="font-semibold text-gray-900">
            Email: <a href="mailto:cuteminimos@gmail.com" className="text-blue-600 hover:underline font-normal">cuteminimos@gmail.com</a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        Return & Exchange
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