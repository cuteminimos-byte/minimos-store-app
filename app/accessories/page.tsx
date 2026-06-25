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

export default function AccessoriesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('New Born');

  const products: Product[] = [
    { id: 1, title: 'Dopattay', price: "Rs.2,500.00", numericPrice: 2500, sku: "ACC-DP", image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Potli/Bags', price: "Rs.3,200.00", numericPrice: 3200, sku: "ACC-PT", image: 'https://swocclothing.com/cdn/shop/files/5_822c1a24-622d-4b5f-9f9d-967200d18155_870x.jpg?v=1761278487' },
    { id: 3, title: 'Footwear', price: "Rs.1,800.00", numericPrice: 1800, sku: "ACC-FW", image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'Head-Pieces', price: "Rs.1,200.00", numericPrice: 1200, sku: "ACC-HP", image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop' },
  ];

  const sizesList = ["New Born", "0-3 M", "3-6 M", "6-9 M", "9-12 M", "12-18 M", "18-24 M"];

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize('New Born');
  };

  const closeQuickView = () => setSelectedProduct(null);

  const handleBuyItNow = () => {
    if (!selectedProduct) return;
    const phoneNumber = "923151640537";
    const message = `Salam SWOC! I want to buy from this category:\n\n*Category:* ${selectedProduct.title}\n*SKU:* ${selectedProduct.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Estimated Price:* ${selectedProduct.price}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen py-16 px-4 md:px-8 max-w-[1200px] mx-auto">
      
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl md:text-4xl text-center font-serif font-bold text-gray-900 tracking-wide">
          Accessories
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-[700px] mr-auto">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative overflow-hidden aspect-[1/1.4] cursor-pointer bg-neutral-100 rounded-xs"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              unoptimized
            />
            
            <button 
              onClick={() => openQuickView(product)}
              className="absolute top-3 right-3 z-30 bg-white text-gray-900 font-sans text-[10px] md:text-[11px] font-semibold px-2.5 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              Quick view
            </button>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 pointer-events-none">
              <h2 className="text-white font-serif font-bold text-base sm:text-xl md:text-2xl tracking-wide drop-shadow-xs">
                {product.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xs overflow-hidden max-w-[760px] w-full relative shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
            <button onClick={closeQuickView} className="absolute top-0 right-0 z-50 bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-800 transition-colors">✕</button>

            <div className="w-full md:w-1/2 p-5 bg-white border-r border-gray-100 flex items-center justify-center">
              <div className="relative aspect-square w-full rounded-xs overflow-hidden">
                <Image src={selectedProduct.image} alt={selectedProduct.title} fill className="object-cover" unoptimized />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 overflow-y-auto">
              <h2 className="text-xl font-serif font-bold text-gray-900">{selectedProduct.title}</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase">SKU: {selectedProduct.sku}</p>
              <p className="text-lg font-bold text-gray-900 mt-3">{selectedProduct.price}</p>
              
              <div className="mt-4">
                 <label className="text-xs font-medium text-gray-500">Size:</label>
                 <div className="flex flex-wrap gap-1.5 mt-2">
                    {sizesList.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-2.5 py-1 text-xs border rounded-full transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-900'}`}>
                        {size}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button className="w-full bg-[#1c1c1c] text-white py-3.5 text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-white hover:text-black border border-black transition-colors duration-300">Add to Cart</button>
                <button onClick={handleBuyItNow} className="w-full bg-white text-black border border-black py-3.5 text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black hover:text-white transition-colors duration-300">Buy It Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}