"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopByCategorySection() {
  const categories = [
    {
      id: 1,
      title: "Boys",
      src: "/images/image17.png", 
      link: "/category/boys",
      isComingSoon: false
    },
    {
      id: 2,
      title: "Girls",
      src: "/images/image14.jpeg", 
      link: "/category/girls",
      isComingSoon: false
    },
    {
      id: 3,
      title: "Men",
      src: "/images/image18.png", 
      link: "/category/men",
      isComingSoon: false
    },
    {
      id: 4,
      title: "Women",
      src: "", 
      link: "#",
      isComingSoon: true
    }
  ];

  return (
    <section className="w-full max-w-3xl text-left ml-4 md:ml-16 mr-auto -mt-10 md:-mt-20 pt-4 md:pt-6 pb-16 md:pb-24 select-none">
      
      {/* Title Header */}
      <div className="mb-10 pl-1">
        <h2 className="text-xl md:text-4xl text-center ml-96 font-serif text-gray-900 tracking-wide">
          Shop By Category
        </h2>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 items-center">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4 text-center group/cat-card cursor-pointer">
            {cat.isComingSoon ? (
              /* 4th Card: "COMING SOON" Box with Smooth Zooming */
              <div className="aspect-[4/5.8] w-full bg-[#f6edeb] rounded-xl flex items-center justify-center relative overflow-hidden border border-[#eae0dc] translate-y-4 transition-transform duration-500 group-hover/cat-card:scale-103">
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1a1110_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                  <span className="font-serif text-[#7d564f] text-sm md:text-xl tracking-widest leading-relaxed block uppercase font-medium">
                    Coming<br/>Soon
                  </span>
                </div>
              </div>
            ) : (
              /* Standard Categories with Image Zoom */
              <Link href={cat.link} className="block">
                <div className="aspect-[4/5] w-full bg-[#f6f6f6] rounded-xl overflow-hidden relative border border-gray-100 shadow-xs">
                  <Image
                    src={cat.src}
                    alt={cat.title}
                    fill
                    sizes="(max-w-full) 25vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover/cat-card:scale-103"
                    unoptimized
                  />
                </div>
              </Link>
            )}

            {/* Perfect Underline Animation Text Area */}
            <div className="pt-1">
              <h3 className="text-[14px] md:text-[15px] font-bold text-gray-900 tracking-normal inline-block relative pb-0.5">
                {cat.title}
                {/* Underline Element */}
                <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover/cat-card:scale-x-100"></span>
              </h3>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}