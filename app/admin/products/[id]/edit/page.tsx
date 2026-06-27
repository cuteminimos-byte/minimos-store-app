"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductForm, { ProductFormData } from '@/components/ProductForm';

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [data, setData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !product) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setData({
      id: product.id,
      title: product.title || '',
      price: product.price?.toString() || '',
      sku: product.sku || '',
      category: product.category || 'festive-classics',
      section: product.section || 'new-arrivals',
      description: product.description || '',
      in_stock: product.in_stock ?? true,
      stock_quantity: product.stock_quantity?.toString() || '',
      images: product.images || [],
      sizes: product.sizes || [],
      price_tiers: product.price_tiers || [], // ✅ yeh missing tha
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Loading product...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500">Product nahi mila.</p>
          <button
            onClick={() => router.push('/admin/products')}
            className="text-sm font-semibold text-black underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return <ProductForm mode="edit" initialData={data!} />;
}