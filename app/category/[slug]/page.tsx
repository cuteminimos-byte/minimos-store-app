"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/categories'; // ✅ shared categories — admin & header sync

type Product = {
  id: string;
  title: string;
  price: number;
  sku: string;
  images: string[];
  sizes: string[];
  category: string;
  in_stock: boolean;
};

// ── Category slug → display label + Supabase category filter ──
// ✅ Auto-generated from the SAME shared list used by the admin
// panel (ProductForm) and the header. Har category ka apna slug
// hi uska db filter hai — isliye koi mismatch ya 404 nahi aayega.
//
// "readyToShip" ek extra entry hai jo CATEGORIES list mein nahi
// hai (woh "What's New" carousel se aata hai) — usay yahan
// manually rakha gaya hai taake woh link bhi kaam kare.
const CATEGORY_MAP: Record<string, { label: string; dbCategories: string[] }> = {
  ...Object.fromEntries(
    CATEGORIES.map((cat) => [
      cat.value,
      { label: cat.label, dbCategories: [cat.value] },
    ])
  ),
  'readyToShip': { label: 'Ready To Ship', dbCategories: ['readyToShip'] },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = CATEGORY_MAP[slug as string];

  useEffect(() => {
    if (!categoryInfo) { setLoading(false); return; }

    supabase
      .from('products')
      .select('*')
      .in('category', categoryInfo.dbCategories)
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    </div>
  );

  if (!categoryInfo) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Category not found.</p>
      <button onClick={() => router.push('/')} className="text-sm underline">Go Home</button>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">

      {/* Header */}
      <div className="mb-10 border-b border-gray-100 pb-6 flex items-center justify-between">
        <div>
          <button onClick={() => router.push('/')} className="text-xs text-gray-400 hover:text-gray-700 mb-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Home
          </button>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-wide">
            {categoryInfo.label}
          </h1>
          <p className="text-sm text-gray-400 mt-1">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-2xl gap-3">
          <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
          </svg>
          <p className="text-gray-400 text-sm">No products in this category yet.</p>
          <p className="text-gray-300 text-xs">Add products from the admin panel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer bg-gray-50"
            >
              <Image
                src={product.images?.[0] || '/images/image1.jpeg'}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* Quick view button */}
              <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <span className="bg-white text-gray-900 text-[10px] md:text-[11px] font-semibold px-2.5 py-1.5 rounded-full shadow-md">
                  Quick view
                </span>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Info */}
              <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 z-20 pr-3 pointer-events-none">
                <h2 className="text-white font-serif font-bold text-sm sm:text-base md:text-lg tracking-wide drop-shadow-sm leading-tight">
                  {product.title}
                </h2>
                <p className="text-gray-200 text-xs mt-1">Rs.{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}