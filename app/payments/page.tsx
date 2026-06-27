"use client";

import React, { useState } from 'react';

export default function PaymentsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">

      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        Payments
      </h1>

      <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 md:p-8 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
        >
          <span className="text-[15px] md:text-[16px] font-semibold text-gray-900">Payment Policy</span>
          <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
            {isOpen ? '−' : '+'}
          </span>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[2000px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px]">

            {/* Q1 */}
            <div className="space-y-3">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                1. Which Payment Methods Does Cute Minimos Support?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  <span className="font-semibold">50% Advance Payment</span> — All orders require 50% advance at the time of placing the order. The remaining 50% is paid on delivery.
                </li>
                <li>
                  <span className="font-semibold">Bank Transfer / EasyPaisa / JazzCash</span> — Send the advance payment via bank transfer or mobile wallet, then share your payment screenshot on WhatsApp: <span className="font-semibold text-gray-900">+92 315 164 0537</span>.
                </li>
                <li>
                  <span className="font-semibold">Cash on Delivery (COD)</span> — Available nationwide in Pakistan for the remaining 50% balance on delivery.
                </li>
                <li>
                  <span className="font-semibold">Online Payments</span> — Debit Card / Credit Card (Local &amp; International orders). Contact us via WhatsApp to arrange.
                </li>
              </ul>
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                2. Why Is 50% Advance Required?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  All Cute Minimos products are handcrafted and made-to-order. The advance payment helps us reserve your order, source materials, and begin production specifically for you.
                </li>
                <li>
                  Orders are only confirmed and dispatched once the advance payment is received and verified.
                </li>
              </ul>
            </div>

            {/* Q3 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                3. How Do I Pay the Advance?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  Place your order via WhatsApp on <span className="font-semibold text-gray-900">+92 315 164 0537</span>.
                </li>
                <li>
                  We will share our bank / EasyPaisa / JazzCash account details with you.
                </li>
                <li>
                  Transfer 50% of the total order amount and send us the payment screenshot to confirm your order.
                </li>
              </ul>
            </div>

            {/* Q4 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                4. Is Cash on Delivery Available Internationally?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  COD is only available within Pakistan. For international orders, full payment in advance is required before dispatch.
                </li>
                <li>
                  International customers can pay via bank transfer or card. Contact us on WhatsApp to arrange international payment.
                </li>
              </ul>
            </div>

            {/* Q5 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                5. What If I Want to Cancel My Order?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  Cancellations must be requested within 24 hours of placing the order.
                </li>
                <li>
                  If production has already started, the advance payment may not be refundable as materials and labour costs are already incurred.
                </li>
                <li>
                  For any concerns, please contact us immediately on WhatsApp: <span className="font-semibold text-gray-900">+92 315 164 0537</span>.
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}