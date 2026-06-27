"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  title: string;
  price: number;
  sku: string;
  image: string;
  category: string;
  in_stock: boolean;
}

export default function FestiveClassicsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('category', 'festive-classics')
      .eq('in_stock', true)
      .then(({ data }) => setProducts((data as Product[]) || []));
  }, []);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize('');
  };

  const closeQuickView = () => setSelectedProduct(null);

  const handleBuyItNow = () => {
    if (!selectedProduct) return;
    const advance = Math.ceil(selectedProduct.price * quantity * 0.5);
    const total = selectedProduct.price * quantity;
    const phone = "923151640537";
    const msg = `Salam cute minimos! I want to buy:\n\n*Product:* ${selectedProduct.title}\n*SKU:* ${selectedProduct.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Total:* Rs.${total.toLocaleString()}\n*50% Advance:* Rs.${advance.toLocaleString()}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const sizesList = [
    "New Born", "0-3 M", "3-6 M", "6-9 M", "9-12 M",
    "12-18 M", "18-24 M", "2-3 Y", "3-4 Y", "4-5 Y",
    "5-6 Y", "6-7 Y", "7-8 Y", "8-9 Y", "9-10 Y", "10-11 Y",
    "11-12 Y", "12-13 Y", "13-14 Y", "14-15 Y"
  ];

  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8 max-w-[1400px] mx-auto">

      <div className="flex justify-center mb-12">
        <h1 className="text-2xl md:text-4xl font-serif text-[#1a1a1a] tracking-wide">
          Festive Classics
        </h1>
      </div>

      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer bg-neutral-100"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              <button
                onClick={() => openQuickView(product)}
                className="absolute top-3 right-3 z-30 bg-white text-gray-900 font-sans text-[11px] font-semibold px-2.5 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                Quick view
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 z-20 pr-3 pointer-events-none">
                <h2 className="text-white font-serif font-bold text-sm sm:text-base md:text-lg tracking-wide drop-shadow-sm leading-tight">
                  {product.title}
                </h2>
                <p className="text-gray-200 text-xs mt-1 font-sans">Rs.{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xs overflow-hidden max-w-[760px] w-full relative shadow-2xl flex flex-col md:flex-row">

            <button
              onClick={closeQuickView}
              className="absolute top-0 right-0 z-50 bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              ✕
            </button>

            <div className="w-full md:w-1/2 p-5 bg-white border-r border-gray-100 flex items-center justify-center">
              <div className="relative aspect-square w-full rounded-xs overflow-hidden">
                <Image src={selectedProduct.image} alt={selectedProduct.title} fill className="object-cover" unoptimized />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[80vh] md:max-h-none">
              <h2 className="text-xl font-serif font-bold text-gray-900">{selectedProduct.title}</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase">SKU: {selectedProduct.sku}</p>
              <p className="text-lg font-bold text-gray-900 mt-3">Rs.{selectedProduct.price.toLocaleString()}</p>

              <div className="mt-4">
                <span className="text-xs font-medium text-gray-500">Size: </span>
                <span className="text-xs font-bold text-gray-900">{selectedSize}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[340px]">
                {sizesList.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2.5 py-1.5 text-[11px] font-medium rounded-full border transition-all min-w-[52px] text-center
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
                  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-base font-medium">&minus;</button>
                  <span className="w-10 text-center font-sans text-xs font-bold text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(prev => prev + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-base font-medium">&#43;</button>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <div className="text-xs text-gray-700 flex gap-1">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">
                    Rs.{(selectedProduct.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                <button className="w-full bg-[#1c1c1c] text-white border border-[#1c1c1c] font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-white hover:text-black transition-colors duration-300">
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyItNow}
                  className="w-full bg-white text-gray-900 border border-gray-900 font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-black hover:text-white transition-colors duration-300"
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