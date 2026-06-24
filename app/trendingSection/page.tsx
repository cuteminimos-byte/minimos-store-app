"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export function TrendingSection() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('New Born');

    const trendingProducts = [
        {
            id: 1,
            title: "Car Shorts",
            price: "Rs.3,250.00",
            numericPrice: 3250,
            sku: "GKCS-1",
            src: "/images/image11.jpeg",
            link: "/trending/car-shorts",
            isNew: true
        },
        {
            id: 2,
            title: "Ruby Rani -4pc",
            price: "Rs.8,050.00",
            numericPrice: 8050,
            sku: "GKMR-1",
            src: "/images/image13.jpeg",
            link: "/trending/ruby-rani"
        },
        {
            id: 3,
            title: "Shehnai -4pc G",
            price: "Rs.10,550.00",
            numericPrice: 10550,
            sku: "GKSN-1",
            src: "/images/image9.jpeg",
            link: "/trending/shehnai-4pc"
        },
        {
            id: 4,
            title: "Traditional Festive Wear",
            price: "Rs.9,200.00",
            numericPrice: 9200,
            sku: "GKTF-1",
            src: "/images/image16.jpeg",
            link: "/trending/festive-wear"
        }
    ];

    const sizesList = [
        "New Born", "0-3 M", "3-6 M", "6-9 M", "9-12 M",
        "12-18 M", "18-24 M", "2-3 Y", "3-4 Y", "4-5 Y",
        "5-6 Y", "6-7 Y", "7-8 Y", "8-9 Y", "9-10 Y", "10-11 Y",
        "11-12 Y", "12-13 Y", "13-14 Y", "14-15 Y"
    ];

    const openQuickView = (e, product) => {
        e.preventDefault();
        setSelectedProduct(product);
        setQuantity(1);
        setSelectedSize('New Born');
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    // 3. Dynamic WhatsApp Redirection Handler
    const handleBuyItNow = () => {
        if (!selectedProduct) return;
        
        const phoneNumber = "923151640537"; // Aapka WhatsApp context custom API layout format
        const message = `Salam SWOC! I want to buy this product:\n\n*Product:* ${selectedProduct.title}\n*SKU:* ${selectedProduct.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Total Price:* Rs.${(selectedProduct.numericPrice * quantity).toLocaleString()}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <section className="w-full bg-transparent -mt-8 md:-mt-12 py-16 md:py-20 select-none relative group/section max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-2xl font-bold font-serif text-gray-900 tracking-wide">
                    Trending
                </h2>
            </div>

            <div className="w-full relative">
                <div className="w-full overflow-hidden px-1">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1.1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        navigation={{
                            prevEl: '.trending-prev-btn',
                            nextEl: '.trending-next-btn',
                        }}
                        breakpoints={{
                            500: { slidesPerView: 1.8, spaceBetween: 16 },
                            768: { slidesPerView: 2.3, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 }
                        }}
                        className="w-full pb-4"
                    >
                        {trendingProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="block group/card text-left relative">
                                    <Link href={product.link} className="block">
                                        <div className="aspect-[1/1.15] w-full bg-[#f6f6f6] overflow-hidden relative shadow-xs rounded-xs">
                                            {product.isNew && (
                                                <div className="absolute top-4 left-4 z-10 bg-[#1c2d5a] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xs">
                                                    New
                                                </div>
                                            )}
                                            <Image
                                                src={product.src}
                                                alt={product.title}
                                                fill
                                                sizes="(max-w-full) 33vw, 50vw"
                                                className="object-cover object-center transition-transform duration-700 group-hover/card:scale-102"
                                                unoptimized
                                            />
                                        </div>
                                    </Link>

                                    <button 
                                        onClick={(e) => openQuickView(e, product)}
                                        className="absolute top-4 right-4 z-20 bg-white text-gray-900 font-sans text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-gray-100 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/card:translate-y-0 cursor-pointer"
                                    >
                                        <span>Quick view</span>
                                        <svg className="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>

                                    <Link href={product.link} className="block mt-4 space-y-1 px-1">
                                        <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 tracking-tight">
                                            {product.title}
                                        </h3>
                                        <div className="text-[14px] md:text-[15px] flex items-center gap-1.5">
                                            <span className="text-gray-400 font-normal">from</span>
                                            <span className="text-gray-900 font-bold">{product.price}</span>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <button className="trending-prev-btn absolute -left-4 md:-left-8 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-16 h-10 md:w-20 md:h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 hover:bg-neutral-900 shadow-lg border-0">
                    <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M2 12L8 6M2 12L8 18" />
                    </svg>
                </button>

                <button className="trending-next-btn absolute -right-4 md:-right-8 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-16 h-10 md:w-20 md:h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 hover:bg-neutral-900 shadow-lg border-0">
                    <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22M22 12L16 6M22 12L16 18" />
                    </svg>
                </button>
            </div>

            {/* MODAL POPUP CONTAINER */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    
                    {/* 1. COMPACT MODAL SIZE: max-w-[950px] se chota karkay max-w-[760px] kar diya hai */}
                    <div className="bg-white rounded-xs overflow-hidden max-w-[760px] w-full relative shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
                        
                        <button 
                            onClick={closeQuickView}
                            className="absolute top-0 right-0 z-50 bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-800 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Left Side: Product Image Panel */}
                        <div className="w-full md:w-1/2 p-5 flex flex-col justify-between bg-white border-r border-gray-100">
                            {/* 2. IMAGE HOVER ZOOM EFFECT WITH CURSOR POINTER */}
                            <div className="relative aspect-square w-full rounded-xs overflow-hidden group/modalimg cursor-pointer">
                                <Image
                                    src={selectedProduct.src}
                                    alt={selectedProduct.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover/modalimg:scale-106"
                                    unoptimized
                                />
                            </div>
                            <div className="flex gap-2 mt-3">
                                <div className="w-14 h-16 relative border-2 border-neutral-900 rounded-xs overflow-hidden cursor-pointer">
                                    <Image src={selectedProduct.src} alt="thumb" fill className="object-cover" unoptimized />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Info & Interactive Action Rows */}
                        <div className="w-full md:w-1/2 p-6 flex flex-col justify-start overflow-y-auto max-h-[80vh] md:max-h-none">
                            <h2 className="text-xl font-serif font-bold text-gray-900 leading-tight">
                                {selectedProduct.title}
                            </h2>
                            <p className="text-[11px] text-gray-400 font-sans mt-1 uppercase">
                                SKU: {selectedProduct.sku}
                            </p>
                            
                            <p className="text-lg font-bold text-gray-900 font-sans mt-3">
                                {selectedProduct.price}
                            </p>

                            <div className="mt-4">
                                <span className="text-xs font-medium text-gray-500">Size: </span>
                                <span className="text-xs font-bold text-gray-900">{selectedSize}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-2 max-w-[340px]">
                                {sizesList.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-2.5 py-1.5 text-[11px] font-medium rounded-full border transition-all cursor-pointer min-w-[52px] text-center
                                            ${selectedSize === size 
                                                ? 'border-black bg-white text-gray-900 font-bold ring-1 ring-black' 
                                                : 'border-gray-300 text-gray-700 hover:border-gray-900 bg-white'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="text-xs font-medium text-gray-500 block mb-1">Quantity:</label>
                                <div className="inline-flex items-center border border-gray-400 rounded-xs bg-white">
                                    <button 
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-base font-medium cursor-pointer"
                                    >
                                        &minus;
                                    </button>
                                    <span className="w-10 text-center font-sans text-xs font-bold text-gray-900">
                                        {quantity}
                                    </span>
                                    <button 
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-base font-medium cursor-pointer"
                                    >
                                        &#43;
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 border-t border-gray-100 pt-3">
                                <div className="text-xs text-gray-700 flex gap-1">
                                    <span>Subtotal:</span>
                                    <span className="font-bold text-gray-900">
                                        Rs.{(selectedProduct.numericPrice * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            {/* BUTTONS WITH REVERSED INVERSE HOVER EFFECTS */}
                            <div className="mt-5 space-y-2.5">
                                {/* Button 1 (Black to White) */}
                                <button className="w-full bg-[#1c1c1c] text-white border border-[#1c1c1c] font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                                    Add to Cart
                                </button>
                                
                                {/* Button 2 (White to Black) + WhatsApp Redirect on Click */}
                                <button 
                                    onClick={handleBuyItNow}
                                    className="w-full bg-white text-gray-900 border border-gray-900 font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                                >
                                    Buy It Now
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .swiper-button-disabled {
                    opacity: 0.15 !important;
                    pointer-events: none !important;
                }
            `}</style>
        </section>
    );
}