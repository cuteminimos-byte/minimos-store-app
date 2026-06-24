import React from 'react';
import Image from 'next/image';

export default function MonochromeEditPage() {
  // Aapke provide kiye huay real images ke absolute Shopify CDN links
  const categories = [
    {
      id: 1,
      title: 'Monochrome Boys',
      image: 'https://swocclothing.com/cdn/shop/files/5_6a64eb63-b8a5-4549-9ce0-896a60c5e81e_940x.jpg?v=1779362313', 
    },
    {
      id: 2,
      title: 'Monochrome Girls',
      image: 'https://swocclothing.com/cdn/shop/files/6_f4a7eb55-97b6-4e4f-b6fa-945136c0d43a_940x.jpg?v=1779362284',
    },
    {
      id: 3,
      title: 'Monochrome Men',
      image: 'https://swocclothing.com/cdn/shop/files/53_e514011a-280b-46a4-bfbc-fc91593e13aa_940x.jpg?v=1780634599',
    },
    {
      id: 4,
      title: 'Monochrome Women',
      image: 'https://swocclothing.com/cdn/shop/files/7_1118c4b4-89d2-46d2-b8ec-2f23d704c898_940x.jpg?v=1779362411',
    },
  ];

  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8 max-w-[1300px] mx-auto">
      
      {/* Page Title Centered */}
      <div className="flex justify-center mb-12">
        <h1 className="text-2xl md:text-4xl font-serif text-[#1a1a1a] tracking-wide">
          Monochrome Edit
        </h1>
      </div>

      {/* Smaller Grid Container aligned to the Left with clean layout */}
      <div className="max-w-[550px] mr-auto">
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer bg-white"
            >
              {/* Next.js Optimized Image pulling from swocclothing.com */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                priority={category.id <= 2}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark gradient overlay for modern clean aesthetic & readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

              {/* Category Title Overlay */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
                <h2 className="text-white font-serif font-bold text-base sm:text-xl md:text-2xl tracking-wide drop-shadow-sm">
                  {category.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}