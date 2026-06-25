"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
  sku: string;
  image: string;
}

export default function CrochetKnitDropPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('New Born');

  const products: Product[] = [
    { id: 1, title: 'Knitwear Classic 1', price: "Rs.4,500.00", numericPrice: 4500, sku: "CKD-01", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 2, title: 'Knitwear Classic 2', price: "Rs.5,200.00", numericPrice: 5200, sku: "CKD-02", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 3, title: 'Knitwear Classic 3', price: "Rs.3,800.00", numericPrice: 3800, sku: "CKD-03", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 4, title: 'Knitwear Classic 4', price: "Rs.6,100.00", numericPrice: 6100, sku: "CKD-04", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 5, title: 'Knitwear Classic 5', price: "Rs.4,900.00", numericPrice: 4900, sku: "CKD-05", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 6, title: 'Knitwear Classic 6', price: "Rs.5,700.00", numericPrice: 5700, sku: "CKD-06", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 7, title: 'Knitwear Classic 7', price: "Rs.4,200.00", numericPrice: 4200, sku: "CKD-07", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 8, title: 'Knitwear Classic 8', price: "Rs.6,500.00", numericPrice: 6500, sku: "CKD-08", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
  ];

  const sizesList = [
    "New Born", "0-3 M", "3-6 M", "6-9 M", "9-12 M",
    "12-18 M", "18-24 M", "2-3 Y", "3-4 Y", "4-5 Y",
    "5-6 Y", "6-7 Y", "7-8 Y", "8-9 Y", "9-10 Y", "10-11 Y",
    "11-12 Y", "12-13 Y", "13-14 Y", "14-15 Y"
  ];

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize('New Born');
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  const handleBuyItNow = () => {
    if (!selectedProduct) return;
    const phoneNumber = "923151640537";
    const message = `Salam SWOC! I want to buy this product:\n\n*Product:* ${selectedProduct.title}\n*SKU:* ${selectedProduct.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Total Price:* Rs.${(selectedProduct.numericPrice * quantity).toLocaleString()}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      
      <div className="flex justify-center mb-12">
        <h1 className="text-2xl md:text-4xl font-serif text-[#1a1a1a] tracking-wide">
          Crochet & Knit Drop.
        </h1>
      </div>

      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer bg-transparent"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                priority={product.id <= 4}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              
              <button 
                onClick={() => openQuickView(product)}
                className="absolute top-3 right-3 z-30 bg-white text-gray-900 font-sans text-[11px] font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 cursor-pointer border-0"
              >
                <span>Quick view</span>
                <svg className="w-3.5 h-3.5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 z-20 pr-3 pointer-events-none">
                <h2 className="text-white font-serif font-bold text-sm sm:text-base md:text-lg tracking-wide drop-shadow-sm leading-tight">
                  {product.title}
                </h2>
                <p className="text-gray-200 text-xs mt-1 font-sans">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xs overflow-hidden max-w-[760px] w-full relative shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={closeQuickView}
              className="absolute top-0 right-0 z-50 bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-1/2 p-5 flex flex-col justify-between bg-white border-r border-gray-100">
              <div className="relative aspect-square w-full rounded-xs overflow-hidden group/modalimg cursor-pointer">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover/modalimg:scale-106"
                  unoptimized
                />
              </div>
              <div className="flex gap-2 mt-3">
                <div className="w-14 h-16 relative border-2 border-neutral-900 rounded-xs overflow-hidden cursor-pointer">
                  <Image src={selectedProduct.image} alt="thumb" fill className="object-cover" unoptimized />
                </div>
              </div>
            </div>

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

              <div className="mt-5 space-y-2.5">
                <button className="w-full bg-[#1c1c1c] text-white border border-[#1c1c1c] font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                  Add to Cart
                </button>
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
    </div>
  );
}