"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Product = {
  id: string;
  title: string;
  price: number;
  sku: string;
  images: string[];
  sizes: string[];
  category: string;
  description: string;
  in_stock: boolean;
};

const PHONE = "923151640537";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setProduct(data);
        if (data?.sizes?.length) setSelectedSize(data.sizes[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-2 text-gray-400 text-sm">
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Loading...
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Product not found.</p>
      <button onClick={() => router.back()} className="text-sm underline text-gray-700">Go back</button>
    </div>
  );

  const images = product.images?.length ? product.images : ['/images/image1.jpeg'];
  const advance = Math.ceil(product.price * quantity * 0.5);
  const total = product.price * quantity;

  const handleBuy = () => {
    const msg = `Salam SWOC! I want to buy:\n\n*Product:* ${product.title}\n*SKU:* ${product.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Total:* Rs.${total.toLocaleString()}\n*50% Advance:* Rs.${advance.toLocaleString()}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <button onClick={() => router.push('/')} className="hover:text-gray-700 transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => router.push(`/category/${product.category}`)} className="hover:text-gray-700 transition-colors capitalize">{product.category.replace(/-/g, ' ')}</button>
        <span>/</span>
        <span className="text-gray-700">{product.title}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">

        {/* LEFT: Images */}
        <div className="flex flex-col gap-3">
          {/* Main Image */}
          <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden rounded-xl">
            <Image
              src={images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover transition-opacity duration-300"
              unoptimized
              priority
            />
            {!product.in_stock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-widest uppercase">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <Image src={img} alt={`thumb-${i}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col gap-5">

          {/* Title & SKU */}
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">{product.title}</h1>
            <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-wider">SKU: {product.sku}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">Rs.{product.price.toLocaleString()}</span>
          </div>

          {/* 50% Advance Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Payment Info</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">50% Advance (required):</span>
              <span className="font-bold text-amber-700">Rs.{Math.ceil(product.price * 0.5).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining on delivery:</span>
              <span className="font-bold text-gray-700">Rs.{Math.floor(product.price * 0.5).toLocaleString()}</span>
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Size: <span className="font-bold text-gray-900">{selectedSize}</span></p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all
                      ${selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 text-gray-700 hover:border-gray-800 bg-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Quantity:</p>
            <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(p => Math.max(1, p - 1))} className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 text-lg font-medium transition-colors">&minus;</button>
              <span className="w-12 text-center text-sm font-bold text-gray-900">{quantity}</span>
              <button onClick={() => setQuantity(p => p + 1)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 text-lg font-medium transition-colors">&#43;</button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
            <span className="text-lg font-bold text-gray-900">Rs.{total.toLocaleString()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleBuy}
              disabled={!product.in_stock}
              className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M5.077 0C2.273 0 0 2.273 0 5.077v13.846C0 21.727 2.273 24 5.077 24h13.846C21.727 24 24 21.727 24 18.923V5.077C24 2.273 21.727 0 18.923 0H5.077zm8.956 17.067c-.975-.398-1.927-.906-2.79-1.517l-.197.197c-.892.892-2.343 1.043-3.351.338-.149-.105-.285-.224-.408-.35l-1.8-1.8c-.991-1.007-.941-2.636.107-3.585l.197-.197c-.608-.863-1.115-1.812-1.514-2.784-.421-1.02-.096-2.19.81-2.854l.885-.631c.538-.384 1.272-.3 1.712.197l2.13 2.452c.42.483.42 1.206 0 1.689l-.488.562c-.026.03-.039.068-.037.107.033.6.289 1.169.718 1.598l1.8 1.8c.429.429.998.685 1.598.718.04.002.079-.011.107-.037l.562-.488c.483-.42 1.206-.42 1.689 0l2.452 2.13c.497.44.581 1.174.197 1.712l-.631.885c-.664.906-1.834 1.231-2.854.81z"/>
              </svg>
              Order via WhatsApp
            </button>
            <button className="w-full bg-white text-gray-900 border border-gray-900 py-4 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-gray-900 hover:text-white transition-colors">
              Add to Cart
            </button>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-gray-100 pt-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}