"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/categories';
import { SIZES } from '@/lib/sizes';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/* ============================================================
   TYPES
   ============================================================ */
type PriceTier = {
  id: string;
  label: string;
  sizes: string[];
  price: string;
};

type Product = {
  id: string;
  title: string;
  price: number;
  sku: string;
  images: string[];
  sizes: string[];
  category: string;
  in_stock: boolean;
  section?: string;
  price_tiers?: PriceTier[];
};

type CartItem = {
  cartId: string;
  productId: string;
  title: string;
  sku: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

const PHONE = "923151640537";
const CART_STORAGE_KEY = "cute_minimos_cart";

/* ============================================================
   PRICE HELPER
   ============================================================ */
function getPriceForSize(
  selectedSize: string | null,
  priceTiers: PriceTier[] | undefined,
  basePrice: number
): number {
  if (!selectedSize || !priceTiers?.length) return basePrice;
  const tier = priceTiers.find(t => t.sizes.includes(selectedSize));
  return tier?.price ? parseFloat(tier.price) : basePrice;
}

/* ============================================================
   CART HELPERS
   ============================================================ */
function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cute-minimos-updated'));
}

/* ============================================================
   1. HERO CAROUSEL
   ============================================================ */
function HomeCarousel() {
  const slides = [
    { id: 1, src: "/images/image6.png", alt: "Cute minimos" },
    { id: 2, src: "/images/image4.png", alt: "Cute minimos" },
    { id: 3, src: "/images/image5.png", alt: "Cute minimos" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto h-[60vh] md:h-[85vh] bg-black relative z-10 select-none -mt-12 md:-mt-24">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full main-hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slide.id === 1}
              sizes="100vw"
              className="object-cover object-center"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .main-hero-swiper .swiper-pagination-bullet {
          background: transparent !important;
          border: 2px solid #fff !important;
          opacity: 0.7; width: 10px; height: 10px;
          transition: all 0.3s ease;
        }
        .main-hero-swiper .swiper-pagination-bullet-active {
          background: #fff !important;
          border-color: #fff !important;
          opacity: 1;
        }
        .main-hero-swiper.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
          margin: 0 6px !important;
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   2. CART BAR + CART DRAWER + FLOATING ICON
   ============================================================ */
function CartBar() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setCart(readCart());
    const handler = () => setCart(readCart());
    window.addEventListener('cute-minimos-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('cute-minimos-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAdvance = Math.ceil(totalPrice * 0.5);

  const updateQuantity = (cartId: string, delta: number) => {
    const updated = cart.map(item =>
      item.cartId === cartId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updated);
    writeCart(updated);
  };

  const removeItem = (cartId: string) => {
    const updated = cart.filter(item => item.cartId !== cartId);
    setCart(updated);
    writeCart(updated);
  };

  const clearCart = () => { setCart([]); writeCart([]); };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    let msg = `Salam Cute minimos! I want to order the following items:\n\n`;
    cart.forEach((item, i) => {
      const lineTotal = item.price * item.quantity;
      msg += `*${i + 1}. ${item.title}*\n`;
      msg += `SKU: ${item.sku || 'N/A'}\n`;
      msg += `Size: ${item.size}\n`;
      msg += `Qty: ${item.quantity}\n`;
      msg += `Price: Rs.${lineTotal.toLocaleString()}\n\n`;
    });
    msg += `------------------------\n`;
    msg += `*Grand Total:* Rs.${totalPrice.toLocaleString()}\n`;
    msg += `*50% Advance Required:* Rs.${totalAdvance.toLocaleString()}\n`;
    msg += `*Remaining on Delivery:* Rs.${(totalPrice - totalAdvance).toLocaleString()}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="font-serif font-bold text-lg text-gray-900 tracking-wide">
          Cute <span className="text-gray-400 font-normal">minimos</span>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="relative flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {totalItems > 0 && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-serif font-bold text-gray-900">Your Cart ({totalItems})</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-400 text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-3 border-b border-gray-50 pb-4">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
                      <p className="text-xs text-gray-400">SKU: {item.sku || 'N/A'}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">Rs.{item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-gray-300 rounded-lg">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 text-sm">&minus;</button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 text-sm">&#43;</button>
                        </div>
                        <button onClick={() => removeItem(item.cartId)} className="text-red-400 hover:text-red-600 text-xs font-medium">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">Rs.{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <span className="text-amber-700 font-medium">50% Advance Required</span>
                  <span className="font-bold text-amber-700">Rs.{totalAdvance.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M5.077 0C2.273 0 0 2.273 0 5.077v13.846C0 21.727 2.273 24 5.077 24h13.846C21.727 24 24 21.727 24 18.923V5.077C24 2.273 21.727 0 18.923 0H5.077zm8.956 17.067c-.975-.398-1.927-.906-2.79-1.517l-.197.197c-.892.892-2.343 1.043-3.351.338-.149-.105-.285-.224-.408-.35l-1.8-1.8c-.991-1.007-.941-2.636.107-3.585l.197-.197c-.608-.863-1.115-1.812-1.514-2.784-.421-1.02-.096-2.19.81-2.854l.885-.631c.538-.384 1.272-.3 1.712.197l2.13 2.452c.42.483.42 1.206 0 1.689l-.488.562c-.026.03-.039.068-.037.107.033.6.289 1.169.718 1.598l1.8 1.8c.429.429.998.685 1.598.718.04.002.079-.011.107-.037l.562-.488c.483-.42 1.206-.42 1.689 0l2.452 2.13c.497.44.581 1.174.197 1.712l-.631.885c-.664.906-1.834 1.231-2.854.81z"/>
                  </svg>
                  Checkout via WhatsApp
                </button>
                <button onClick={clearCart} className="w-full text-gray-400 hover:text-red-500 text-xs font-medium py-1 transition-colors">
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   3. WHAT'S NEW SECTION
   — Fixed: all items now have unique IDs (no more duplicate key=6)
   — Images mapped per category value
   ============================================================ */

// Image map — category value → image path
const WHATS_NEW_IMAGES: Record<string, string> = {
  'summer-basics':    '/images/image1.jpeg',
  'hand-embroidered': '/images/image2.jpeg',
  'hand-painted':     '/images/image3.jpeg',
  'shadi-season':     '/images/image7.jpeg',
  'mommy-and-me':     '/images/image8.jpeg',
  'siblings-duo':     '/images/image7 (3).jpeg',
  'b-boys':           '/images/image17.png', // replace when you have a dedicated image
  'women-classic':    '/images/image9.jpeg', // replace when you have a dedicated image
  'accessories':      '/images/image1z.jpeg', // replace when you have a dedicated image
};

function WhatsNewSectionInner() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  // Build products from shared CATEGORIES — always in sync, no duplicate IDs
  const products = CATEGORIES.map((cat) => ({
    id: cat.value,           // unique slug — no more id:6 collision
    title: cat.label,
    src: WHATS_NEW_IMAGES[cat.value] || '/images/image1.jpeg',
    link: `/category/${cat.value}`,
  }));

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery)
  );

  if (filtered.length === 0) return (
    <section className="w-full text-center py-12 text-gray-500">
      <p>No products found matching your search.</p>
    </section>
  );

  return (
    <section className="w-full bg-transparent -mt-6 md:-mt-10 md:py-24 select-none relative">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-4xl font-serif text-gray-900 tracking-wide">What's New</h2>
      </div>
      <div className="w-full relative px-0 mx-0 overflow-hidden">
        <Swiper
          key={filtered.length}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.2}
          loop={filtered.length > 1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation={{ prevEl: '.whatsnew-prev-btn', nextEl: '.whatsnew-next-btn' }}
          breakpoints={{
            480:  { slidesPerView: Math.min(filtered.length, 2.2), spaceBetween: 12 },
            768:  { slidesPerView: Math.min(filtered.length, 3.2), spaceBetween: 16 },
            1024: { slidesPerView: Math.min(filtered.length, 4.2), spaceBetween: 16 },
            1280: { slidesPerView: Math.min(filtered.length, 5.2), spaceBetween: 16 },
          }}
          className="w-full pb-6"
        >
          {filtered.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={product.link} className="block group/card space-y-4 text-center cursor-pointer">
                <div className="aspect-[3/4] w-full bg-[#f6f6f6] rounded-xl overflow-hidden relative border border-gray-100/60 shadow-xs">
                  <Image
                    src={product.src}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1280px) 20vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover/card:scale-103"
                    unoptimized
                  />
                </div>
                <div className="pt-1 px-2">
                  <h3 className="text-[14px] md:text-[15px] font-bold text-gray-900 tracking-normal inline-block relative pb-0.5">
                    {product.title}
                    <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover/card:scale-x-100" />
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {filtered.length > 1 && (
          <>
            <button className="whatsnew-prev-btn absolute left-4 md:left-0.5 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-12 h-9 md:w-16 md:h-11 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-900 shadow-md">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M2 12L8 6M2 12L8 18"/></svg>
            </button>
            <button className="whatsnew-next-btn absolute right-4 md:right-0.5 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-12 h-9 md:w-16 md:h-11 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-900 shadow-md">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22M22 12L16 6M22 12L16 18"/></svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function WhatsNewSection() {
  return (
    <Suspense fallback={<section className="w-full py-16 text-center text-gray-400 text-sm">Loading...</section>}>
      <WhatsNewSectionInner />
    </Suspense>
  );
}

/* ============================================================
   4. SHOP BY CATEGORY SECTION
   — Swiper replaced with a clean 3-card grid
   — Uses real images: image7, image8, image3
   — Only 3 highlighted categories shown
   ============================================================ */
function ShopByCategorySection() {
  const featured = [
    { id: 'shadi-season', title: 'Shadi Season', src: '/images/image7.jpeg', link: '/category/shadi-season'   },
    { id: 'mommy-and-me', title: 'Mommy And Me', src: '/images/image8.jpeg', link: '/category/mommy-and-me'   },
    { id: 'hand-painted', title: 'Hand Painted',  src: '/images/image3.jpeg', link: '/category/hand-painted'   },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 -mt-10 md:-mt-20 pt-4 md:pt-6 pb-16 md:pb-24 select-none">
      <div className="mb-10 text-center">
        <h2 className="text-xl md:text-4xl font-serif text-gray-900 tracking-wide">Shop By Category</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {featured.map((cat) => (
          <Link key={cat.id} href={cat.link} className="block group/cat-card cursor-pointer space-y-3 text-center">
            <div className="aspect-[3/4] w-full bg-[#f6f6f6] rounded-xl overflow-hidden relative border border-gray-100 shadow-xs">
              <Image
                src={cat.src}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 33vw, 20vw"
                className="object-cover object-center transition-transform duration-500 group-hover/cat-card:scale-105"
                unoptimized
              />
            </div>
            <h3 className="text-[13px] md:text-[15px] font-bold text-gray-900 tracking-normal inline-block relative pb-0.5">
              {cat.title}
              <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover/cat-card:scale-x-100" />
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5. QUICK VIEW MODAL
   ============================================================ */
function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'New Born');
  const [added, setAdded] = useState(false);

  const sizes = product.sizes?.length ? product.sizes : SIZES;
  const image = product.images?.[0] || '/images/image1.jpeg';

  const currentPrice = getPriceForSize(selectedSize, product.price_tiers, product.price);
  const hasTiers = !!(product.price_tiers?.length);
  const advance = Math.ceil(currentPrice * quantity * 0.5);
  const total = currentPrice * quantity;

  const handleBuy = () => {
    const msg = `Salam Cute minimos! I want to buy:\n\n*Product:* ${product.title}\n*SKU:* ${product.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Total:* Rs.${total.toLocaleString()}\n*50% Advance:* Rs.${advance.toLocaleString()}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleAddToCart = () => {
    const cart = readCart();
    const cartId = `${product.id}-${selectedSize}`;
    const existing = cart.find(item => item.cartId === cartId);
    let updated: CartItem[];
    if (existing) {
      updated = cart.map(item =>
        item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updated = [
        ...cart,
        {
          cartId,
          productId: product.id,
          title: product.title,
          sku: product.sku || '',
          price: currentPrice,
          image,
          size: selectedSize,
          quantity,
        },
      ];
    }
    writeCart(updated);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="bg-white rounded-xs overflow-hidden max-w-[760px] w-full relative shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 z-10">
        <button onClick={onClose} className="absolute top-0 right-0 z-50 bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-800 cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div
          className="w-full md:w-1/2 p-5 flex flex-col justify-between bg-white border-r border-gray-100 cursor-pointer"
          onClick={() => { onClose(); router.push(`/products/${product.id}`); }}
        >
          <div className="relative aspect-square w-full rounded-xs overflow-hidden group/img">
            <Image src={image} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover/img:scale-105" unoptimized />
            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover/img:opacity-100 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full transition-opacity duration-300">View Detail →</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="w-14 h-16 relative border-2 border-neutral-900 rounded-xs overflow-hidden">
              <Image src={image} alt="thumb" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto max-h-[80vh] md:max-h-none">
          <button onClick={() => { onClose(); router.push(`/products/${product.id}`); }} className="text-left">
            <h2 className="text-xl font-serif font-bold text-gray-900 hover:underline">{product.title}</h2>
          </button>
          <p className="text-[11px] text-gray-400 mt-1 uppercase">SKU: {product.sku}</p>

          <div className="mt-3">
            <p className="text-lg font-bold text-gray-900">Rs.{currentPrice.toLocaleString()}</p>
            {hasTiers && (
              <p className="text-[10px] text-blue-500 font-medium mt-0.5">↕ Size badalne pe price change hogi</p>
            )}
          </div>

          <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            50% Advance: Rs.{advance.toLocaleString()}
          </div>

          <div className="mt-4">
            <span className="text-xs font-medium text-gray-500">Size: </span>
            <span className="text-xs font-bold text-gray-900">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2 max-w-[340px]">
            {sizes.map((size) => {
              const sizePrice = hasTiers ? getPriceForSize(size, product.price_tiers, product.price) : null;
              return (
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
                  {hasTiers && sizePrice && sizePrice !== product.price && (
                    <span className="block text-[9px] text-gray-400 leading-tight">{sizePrice.toLocaleString()}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-gray-500 block mb-1">Quantity:</label>
            <div className="inline-flex items-center border border-gray-400 rounded-xs bg-white">
              <button onClick={() => setQuantity(p => Math.max(1, p - 1))} className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-base">&minus;</button>
              <span className="w-10 text-center text-xs font-bold text-gray-900">{quantity}</span>
              <button onClick={() => setQuantity(p => p + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-base">&#43;</button>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-700 flex gap-1">
            <span>Subtotal:</span>
            <span className="font-bold text-gray-900">Rs.{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              onClick={() => { onClose(); router.push(`/products/${product.id}`); }}
              className="w-full bg-gray-100 text-gray-800 border border-gray-200 text-xs font-bold uppercase tracking-wider py-3 rounded-xs hover:bg-gray-200 transition-colors duration-200"
            >
              View Full Details
            </button>
            <button
              onClick={handleAddToCart}
              className={`w-full text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs transition-colors duration-300 border
                ${added
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-[#1c1c1c] text-white border-[#1c1c1c] hover:bg-white hover:text-black'
                }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuy}
              className="w-full bg-white text-gray-900 border border-gray-900 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xs hover:bg-black hover:text-white transition-colors duration-300"
            >
              Buy It Now (WhatsApp)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   6. FESTIVAL PICKS SECTION
   ============================================================ */
function FestivalSection() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('id,title,price,sku,images,sizes,category,in_stock,section,price_tiers')
      .eq('in_stock', true)
      .eq('section', 'festival')
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="w-full select-none relative max-w-[1400px] mx-auto px-4 md:px-8 py-14 md:py-20">
      <div className="text-center mb-10 relative">
        <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold mb-2">🎉 Special Collection</p>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 tracking-wide">Festival Picks</h2>
        <div className="mt-3 mx-auto w-16 h-[2px] bg-amber-400 rounded-full" />
      </div>

      <div className="w-full relative">
        <div className="w-full overflow-hidden px-1">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.1}
            loop={products.length > 3}
            autoplay={{ delay: 4800, disableOnInteraction: false }}
            navigation={{ prevEl: '.festival-prev-btn', nextEl: '.festival-next-btn' }}
            breakpoints={{
              500:  { slidesPerView: 1.8, spaceBetween: 16 },
              768:  { slidesPerView: 2.3, spaceBetween: 20 },
              1024: { slidesPerView: 3,   spaceBetween: 24 },
            }}
            className="w-full pb-4"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group/card text-left relative">
                  <div
                    className="aspect-[1/1.15] w-full bg-[#fdf6ee] overflow-hidden relative shadow-xs rounded-xs cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <Image
                      src={product.images?.[0] || '/images/image1.jpeg'}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover/card:scale-102"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 z-10 bg-amber-400 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                      Festival
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                    className="absolute top-4 right-4 z-20 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-gray-100 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/card:translate-y-0 cursor-pointer"
                  >
                    <span>Quick view</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>

                  <div
                    className="mt-4 space-y-1 px-1 cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 tracking-tight hover:underline">{product.title}</h3>
                    <div className="text-[14px] md:text-[15px] flex items-center gap-1.5">
                      <span className="text-gray-400 font-normal">from</span>
                      <span className="text-gray-900 font-bold">
                        Rs.{(product.price_tiers?.length
                          ? Math.min(...product.price_tiers.filter(t => t.price).map(t => parseFloat(t.price)))
                          : product.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button className="festival-prev-btn absolute -left-4 md:-left-8 top-[40%] -translate-y-1/2 z-30 bg-amber-400 text-white w-16 h-10 md:w-20 md:h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-amber-500 shadow-lg">
          <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M2 12L8 6M2 12L8 18"/></svg>
        </button>
        <button className="festival-next-btn absolute -right-4 md:-right-8 top-[40%] -translate-y-1/2 z-30 bg-amber-400 text-white w-16 h-10 md:w-20 md:h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-amber-500 shadow-lg">
          <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22M22 12L16 6M22 12L16 18"/></svg>
        </button>
      </div>

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

/* ============================================================
   7. TRENDING SECTION
   ============================================================ */
function TrendingSection() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('id,title,price,sku,images,sizes,category,in_stock,section,price_tiers')
      .eq('in_stock', true)
      .neq('section', 'festival')
      .order('created_at', { ascending: false })
      .limit(8)
      .then(({ data }) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <section className="w-full py-20 text-center">
      <div className="inline-flex gap-2 text-gray-400 text-sm items-center">
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Loading products...
      </div>
    </section>
  );

  if (products.length === 0) return (
    <section className="w-full py-16 text-center">
      <h2 className="text-3xl font-serif text-gray-900 mb-3">Trending</h2>
      <p className="text-gray-400 text-sm">No products yet. Add from admin panel.</p>
    </section>
  );

  return (
    <section className="w-full bg-transparent -mt-8 md:-mt-12 py-16 md:py-20 select-none relative max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold font-serif text-gray-900 tracking-wide">Trending</h2>
      </div>

      <div className="w-full relative">
        <div className="w-full overflow-hidden px-1">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.1}
            loop={products.length > 3}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.trending-prev-btn', nextEl: '.trending-next-btn' }}
            breakpoints={{
              500:  { slidesPerView: 1.8, spaceBetween: 16 },
              768:  { slidesPerView: 2.3, spaceBetween: 20 },
              1024: { slidesPerView: 3,   spaceBetween: 24 },
            }}
            className="w-full pb-4"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group/card text-left relative">
                  <div
                    className="aspect-[1/1.15] w-full bg-[#f6f6f6] overflow-hidden relative shadow-xs rounded-xs cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <Image
                      src={product.images?.[0] || '/images/image1.jpeg'}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover/card:scale-102"
                      unoptimized
                    />
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                    className="absolute top-4 right-4 z-20 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-gray-100 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/card:translate-y-0 cursor-pointer"
                  >
                    <span>Quick view</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>

                  <div
                    className="mt-4 space-y-1 px-1 cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 tracking-tight hover:underline">{product.title}</h3>
                    <div className="text-[14px] md:text-[15px] flex items-center gap-1.5">
                      <span className="text-gray-400 font-normal">from</span>
                      <span className="text-gray-900 font-bold">
                        Rs.{(product.price_tiers?.length
                          ? Math.min(...product.price_tiers.filter(t => t.price).map(t => parseFloat(t.price)))
                          : product.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button className="trending-prev-btn absolute -left-4 md:-left-8 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-16 h-10 md:w-20 md:h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-900 shadow-lg">
          <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M2 12L8 6M2 12L8 18"/></svg>
        </button>
        <button className="trending-next-btn absolute -right-4 md:-right-8 top-[40%] -translate-y-1/2 z-30 bg-black text-white w-16 h-10 md:w-20 md:h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-900 shadow-lg">
          <svg className="w-9 h-9 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22M22 12L16 6M22 12L16 18"/></svg>
        </button>
      </div>

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <style jsx global>{`
        .swiper-button-disabled { opacity: 0.15 !important; pointer-events: none !important; }
      `}</style>
    </section>
  );
}

/* ============================================================
   8. MAIN PAGE EXPORT
   ============================================================ */
export default function HomePage() {
  return (
    <main className="w-full bg-transparent pb-12">
      <CartBar />
      <HomeCarousel />
      <WhatsNewSection />
      <ShopByCategorySection />
      <FestivalSection />
      <TrendingSection />
    </main>
  );
}