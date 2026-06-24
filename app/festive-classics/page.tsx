"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function FestiveClassicsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('category', 'festive-classics')
      .eq('in_stock', true)
      .then(({ data }) => setProducts(data || []));
  }, []);

  const handleBuyItNow = () => {
    if (!selectedProduct) return;
    const p = selectedProduct as any;
    const advance = Math.ceil(p.price * quantity * 0.5);
    const total = p.price * quantity;
    const phone = "923151640537";
    const msg = `Salam SWOC! I want to buy:\n\n*Product:* ${p.title}\n*SKU:* ${p.sku}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n*Total:* Rs.${total.toLocaleString()}\n*50% Advance:* Rs.${advance.toLocaleString()}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ... baqi modal aur grid code same as CrochetKnitDrop page
}