"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

/* ============================================================
   IMAGE MAP
   — Add a real image path here when you have one for a category.
   — If a category has no image it will show a "Coming Soon" tile.
   ============================================================ */
const CATEGORY_IMAGES: Record<string, string> = {
  'summer-basics':    '/images/image1.jpeg',
  'hand-embroidered': '/images/image2.jpeg',
  'hand-painted':     '/images/image3.jpeg',
  'shadi-season':     '/images/image7.jpeg',
  'mommy-and-me':     '/images/image8.jpeg',
  'siblings-duo':     '/images/image9.jpeg',
  // 'b-boys':        '/images/your-image.png',
  // 'women-classic': '/images/your-image.png',
  // 'accessories':   '/images/your-image.png',
};

export default function ShopByCategorySection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 mt-4 md:-mt-20 pt-4 md:pt-6 pb-16 md:pb-24 select-none">

      {/* Title */}
      <div className="mb-10 text-center">
        <h2 className="text-xl md:text-4xl font-serif text-gray-900 tracking-wide">
          Shop By Category
        </h2>
      </div>

      {/* Grid — 2 cols on mobile, 3 on md, 4 on lg, 5 on xl */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {CATEGORIES.map((cat) => {
          const image = CATEGORY_IMAGES[cat.value];
          const isComingSoon = !image;

          return (
            <div key={cat.value} className="group/cat-card cursor-pointer space-y-3 text-center">

              {isComingSoon ? (
                /* Coming Soon tile — shown until a real image is added */
                <div className="aspect-[4/5] w-full bg-[#f6edeb] rounded-xl overflow-hidden relative border border-[#eae0dc] transition-transform duration-300 group-hover/cat-card:scale-[1.02]">
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1a1110_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-[#7d564f] text-sm md:text-base tracking-widest leading-relaxed uppercase font-medium text-center">
                      Coming<br />Soon
                    </span>
                  </div>
                </div>
              ) : (
                /* Real image tile */
                <Link href={`/category/${cat.value}`} className="block">
                  <div className="aspect-[4/5] w-full bg-[#f6f6f6] rounded-xl overflow-hidden relative border border-gray-100 shadow-xs">
                    <Image
                      src={image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover object-center transition-transform duration-500 group-hover/cat-card:scale-[1.04]"
                      unoptimized
                    />
                  </div>
                </Link>
              )}

              {/* Label with underline hover animation */}
              <div className="pt-1">
                <h3 className="text-[13px] md:text-[14px] font-bold text-gray-900 tracking-normal inline-block relative pb-0.5">
                  {cat.label}
                  <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover/cat-card:scale-x-100" />
                </h3>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}