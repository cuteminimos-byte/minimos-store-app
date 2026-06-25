'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function WhatsNewSection() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query')?.toLowerCase() || '';

    const products = [
        { id: 1, title: "Crochet & Knit Drop.", src: "/images/image1.jpeg", link: "/whats-new/crochet-knit" },
        { id: 2, title: "Velvet Classics", src: "/images/image2.jpeg", link: "/whats-new/velvet-classics" },
        { id: 3, title: "Ready To Ship", src: "/images/image3.jpeg", link: "/whats-new/ready-to-ship" },
        { id: 4, title: "B.Pair Clearance", src: "/images/image7.jpeg", link: "/whats-new/clearance" },
        { id: 5, title: "14 August", src: "/images/image8.jpeg", link: "/whats-new/august-collection" },
        { id: 6, title: "Winter Specials", src: "/images/image9.jpeg", link: "/whats-new/winter-specials" }
    ];

    // Search query ke mutabik products filter ho rahe hain
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
    );

    // Agar search result khali ho to section hide ya text show kar sakte hain
    if (filteredProducts.length === 0) {
        return (
            <section className="w-full text-center py-12 text-gray-500">
                <p>No products found in "What's New" matching your search.</p>
            </section>
        );
    }

    return (
        <section className="w-full bg-transparent -mt-6 md:-mt-10 md:py-24 select-none relative group/section">
            <div className="text-center mb-10">
                <h2 className="text-xl md:text-4xl font-serif text-gray-900 tracking-wide">
                    What's New
                </h2>
            </div>

            <div className="w-full relative px-0 mx-0 overflow-hidden">
                {/* key={filteredProducts.length} lagane se Swiper search ke sath reset ho kar sahi loops banayega */}
                <Swiper
                    key={filteredProducts.length}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={12}
                    slidesPerView={1.2}
                    loop={filteredProducts.length > 1}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: '.whatsnew-prev-btn',
                        nextEl: '.whatsnew-next-btn',
                    }}
                    breakpoints={{
                        480: { slidesPerView: Math.min(filteredProducts.length, 2.2), spaceBetween: 12 },
                        768: { slidesPerView: Math.min(filteredProducts.length, 3.2), spaceBetween: 16 },
                        1024: { slidesPerView: Math.min(filteredProducts.length, 4.2), spaceBetween: 16 },
                        1280: { slidesPerView: Math.min(filteredProducts.length, 5.2), spaceBetween: 16 },
                        1600: { slidesPerView: Math.min(filteredProducts.length, 5.2), spaceBetween: 20 }
                    }}
                    className="w-full pb-6 px-0 mx-0"
                >
                    {filteredProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Link href={product.link} className="block group/card space-y-4 text-center cursor-pointer">
                                <div className="aspect-[3/4] w-full bg-[#f6f6f6] rounded-xl overflow-hidden relative border border-gray-100/60 shadow-xs">
                                    <Image
                                        src={product.src}
                                        alt={product.title}
                                        fill
                                        sizes="(max-w-full) 20vw, 50vw"
                                        className="object-cover object-center transition-transform duration-500 group-hover/card:scale-103"
                                        unoptimized
                                        />
                                </div>
                                <div className="pt-1 px-2">
                                    <h3 className="text-[14px] md:text-[15px] font-bold text-gray-900 tracking-normal transition-colors group-hover/card:text-neutral-600 inline-block relative pb-0.5">
                                        {product.title}
                                        <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover/card:scale-x-100"></span>
                                    </h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {filteredProducts.length > 1 && (
                    <>
                        <button className="whatsnew-prev-btn absolute left-4 md:left-0.5 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-12 h-9 md:w-16 md:h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 hover:bg-neutral-900 shadow-md border-0">
                            <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M2 12L8 6M2 12L8 18" />
                            </svg>
                        </button>
                        <button className="whatsnew-next-btn absolute right-4 md:right-0.5 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-12 h-9 md:w-16 md:h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 hover:bg-neutral-900 shadow-md border-0">
                            <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22M22 12L16 6M22 12L16 18" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            <style jsx global>{`
                .swiper-button-disabled {
                    opacity: 0.2 !important;
                    pointer-events: none !important;
                }
            `}</style>
        </section>
    );
}