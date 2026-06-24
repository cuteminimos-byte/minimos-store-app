import React from 'react';
import Image from 'next/image';

export default function SummerBasicsPage() {
  // Aapke live CDN links jo 100% load honge aur show honge
  const categories = [
    {
      id: 1,
      title: 'Golden Hour (Twinning)',
      image: 'https://swocclothing.com/cdn/shop/files/9_c2c4fa51-5dd3-407b-8a22-b698ae733132_940x.jpg?v=1766644074', 
    },
    {
      id: 2,
      title: 'Summer Playdates',
      image: 'https://swocclothing.com/cdn/shop/files/1_89fe9d93-76a3-4c98-ada5-ad3d2abefa7d_940x.jpg?v=1780891728',
    },
    {
      id: 3,
      title: 'Summer Shorts',
      image: 'https://swocclothing.com/cdn/shop/files/5_a9139b6f-300f-4828-833c-f415267bf11e_940x.jpg?v=1766647221',
    },
    {
      id: 4,
      title: 'Garden Gang (Girls)',
      image: 'https://swocclothing.com/cdn/shop/files/9_c2c4fa51-5dd3-407b-8a22-b698ae733132_940x.jpg?v=1766644074', // Link milne par isko update karlein
    },
    {
      id: 5,
      title: 'Garden Gang (Boys)',
      image: 'https://swocclothing.com/cdn/shop/files/1_89fe9d93-76a3-4c98-ada5-ad3d2abefa7d_940x.jpg?v=1780891728', // Link milne par isko update karlein
    },
  ];

  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8 max-w-[1200px] mx-auto ">
      
      {/* Page Title Centered */}
      <div className="flex justify-center mb-12">
        <h1 className="text-2xl md:text-4xl font-serif text-[#1a1a1a] tracking-wide ">
          Summer Basics
        </h1>
      </div>

      {/* Smaller Grid Container aligned to the Left */}
      <div className="max-w-[850px] mr-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer bg-white"
            >
              {/* Next.js Optimized Image */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={category.id <= 3}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

              {/* Category Title Overlay */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 pr-4">
                <h2 className="text-white font-serif font-bold text-base sm:text-xl md:text-2xl tracking-wide drop-shadow-sm leading-tight">
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