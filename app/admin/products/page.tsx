"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('admin_auth') !== 'true') {
      router.push('/admin');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete karna chahte ho?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const filteredProducts = products.filter((p: any) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  const totalStock = products.reduce((sum: number, p: any) => sum + (p.stock_quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Products</h1>
          <Link href="/admin/products/add" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800">
            + Add Product
          </Link>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 font-medium">Total Stock</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalStock}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 font-medium">Out of Stock</p>
            <p className="text-2xl font-bold text-red-500 mt-1">
              {products.filter((p: any) => !p.in_stock || p.stock_quantity === 0).length}
            </p>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-5">
          <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, SKU, or category..."
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white"
          />
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-16 text-center text-gray-400">
            {search ? 'Koi product match nahi hua.' : 'Koi product nahi hai. Pehla product add karo!'}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Product</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">SKU</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Price</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Category</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Stock</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p: any) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium">{p.title}</td>
                    <td className="px-5 py-4 text-gray-500">{p.sku}</td>
                    <td className="px-5 py-4">Rs.{p.price?.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-500">{p.category}</td>
                    <td className="px-5 py-4">
                      <span className={`font-semibold ${(p.stock_quantity ?? 0) === 0 ? 'text-red-500' : 'text-gray-700'}`}>
                        {p.stock_quantity ?? 0}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.in_stock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                      }`}>
                        {p.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}