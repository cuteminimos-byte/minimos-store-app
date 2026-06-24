'use client';

import { useState } from 'react';

export default function AnnouncementBar() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="sticky top-0 z-50  bg-[#f8e8e8] text-[#b05d5d] text-[13px] font-medium tracking-[.20em] border-b border-[#e8d5d5] leading-[3] overflow-hidden cursor-pointer select-none w-full"
      onClick={() => setIsPaused(!isPaused)}
      title="Click to pause / resume"
    >
      {/* ⚠️ Max-width wrapper yahan se hta diya taaki marquee seamlessly move kare */}
      <div className="w-full whitespace-nowrap">
        <div 
          className="inline-flex items-center gap-12 animate-marquee"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* Loop Item 1 */}
          <span className="shrink-0">
            Standard delivery time: 4-6 weeks | For custom queries/orders, please WhatsApp us at{' '}
            <span className="font-bold text-black font-sans tracking-normal">
              +92 315-1640537 / +92 315-1640537
            </span>
          </span>

          {/* Loop Item 2 */}
          <span className="shrink-0">
            Standard delivery time: 4-6 weeks | For custom queries/orders, please WhatsApp us at{' '}
            <span className="font-bold text-black font-sans tracking-normal">
              +92 315-1640537 / +92 315-1640537
            </span>
          </span>

          {/* Loop Item 3 */}
          <span className="shrink-0">
            Standard delivery time: 4-6 weeks | For custom queries/orders, please WhatsApp us at{' '}
            <span className="font-bold text-black font-sans tracking-normal">
              +92 315-1640537 / +92 315-1640537
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}