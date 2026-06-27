"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/categories'; // ✅ shared categories — admin & header sync
import { SIZES } from '@/lib/sizes'; // ✅ shared sizes — admin & home/product pages sync

const SECTIONS = [
  { value: 'new-arrivals', label: '🆕 New Arrivals (Trending section)' },
  { value: 'festival',     label: '🎉 Festival Picks (Festival section)' },
];

// ── Price Tier Groups ──────────────────────────────────────────
// Har group ka naam, sizes, aur ek price hogi
export type PriceTier = {
  id: string;       // unique identifier e.g. "tier_0"
  label: string;    // display name e.g. "Infant (0–18M)"
  sizes: string[];  // which sizes belong to this tier
  price: string;    // price in Rs.
};

// Default suggested groups — admin chahe to edit kar sakta hai
const DEFAULT_TIER_GROUPS: Omit<PriceTier, 'id' | 'price'>[] = [
  {
    label: 'Infant (New Born – 18M)',
    sizes: ['New Born','0-3 M','3-6 M','6-9 M','9-12 M','12-18 M'],
  },
  {
    label: 'Toddler (18M – 4Y)',
    sizes: ['18-24 M','2-3 Y','3-4 Y'],
  },
  {
    label: 'Kids (4Y – 8Y)',
    sizes: ['4-5 Y','5-6 Y','6-7 Y','7-8 Y'],
  },
  {
    label: 'Older Kids (8Y – 15Y)',
    sizes: ['8-9 Y','9-10 Y','10-11 Y','11-12 Y','12-13 Y','13-14 Y','14-15 Y'],
  },
  {
    label: 'Adult / Unstitched',
    sizes: ['Small','Medium','Large','XL','XXL','Unstitched'],
  },
];

// ── Types ──────────────────────────────────────────────────────
export type ProductFormData = {
  id?: string;
  title: string;
  price: string;           // base / fallback price
  sku: string;
  category: string;
  section: string;
  description: string;
  in_stock: boolean;
  stock_quantity: string;
  images: string[];
  sizes: string[];
  price_tiers: PriceTier[]; // NEW
};

const EMPTY_FORM: ProductFormData = {
  title: '',
  price: '',
  sku: '',
  category: CATEGORIES[0].value, // ✅ default = first category in shared list
  section: 'new-arrivals',
  description: '',
  in_stock: true,
  stock_quantity: '',
  images: [],
  sizes: [],
  price_tiers: [],
};

// ── Helper: build initial tiers from DEFAULT_TIER_GROUPS ──────
function buildDefaultTiers(): PriceTier[] {
  return DEFAULT_TIER_GROUPS.map((g, i) => ({
    id: `tier_${i}`,
    label: g.label,
    sizes: g.sizes,
    price: '',
  }));
}

export default function ProductForm({
  mode,
  initialData,
}: {
  mode: 'add' | 'edit';
  initialData?: ProductFormData;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(initialData?.images || []);
  const [previewImages, setPreviewImages] = useState<string[]>(initialData?.images || []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialData?.sizes || []);
  const [error, setError] = useState('');

  // Price tiers state
  const [useTieredPricing, setUseTieredPricing] = useState<boolean>(
    !!(initialData?.price_tiers && initialData.price_tiers.length > 0)
  );
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>(
    initialData?.price_tiers?.length
      ? initialData.price_tiers
      : buildDefaultTiers()
  );

  const [form, setForm] = useState<ProductFormData>(initialData || EMPTY_FORM);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setUploadedImages(initialData.images || []);
      setPreviewImages(initialData.images || []);
      setSelectedSizes(initialData.sizes || []);
      if (initialData.price_tiers?.length) {
        setUseTieredPricing(true);
        setPriceTiers(initialData.price_tiers);
      }
    }
  }, [initialData]);

  /* ── Image Upload Handler ── */
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (uploadedImages.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }
    setUploadingImages(true);
    setError('');
    const previews = files.map(f => URL.createObjectURL(f));
    setPreviewImages(prev => [...prev, ...previews]);
    const newUrls: string[] = [];
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
        setUploadingImages(false);
        return;
      }
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      newUrls.push(urlData.publicUrl);
    }
    setUploadedImages(prev => [...prev, ...newUrls]);
    setUploadingImages(false);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  /* ── Price Tier Helpers ── */
  const updateTierPrice = (tierId: string, price: string) => {
    setPriceTiers(prev =>
      prev.map(t => t.id === tierId ? { ...t, price } : t)
    );
  };

  const updateTierLabel = (tierId: string, label: string) => {
    setPriceTiers(prev =>
      prev.map(t => t.id === tierId ? { ...t, label } : t)
    );
  };

  const toggleSizeInTier = (tierId: string, size: string) => {
    setPriceTiers(prev =>
      prev.map(t => {
        if (t.id !== tierId) return t;
        const has = t.sizes.includes(size);
        return { ...t, sizes: has ? t.sizes.filter(s => s !== size) : [...t.sizes, size] };
      })
    );
  };

  const addCustomTier = () => {
    const newTier: PriceTier = {
      id: `tier_custom_${Date.now()}`,
      label: 'New Group',
      sizes: [],
      price: '',
    };
    setPriceTiers(prev => [...prev, newTier]);
  };

  const removeTier = (tierId: string) => {
    setPriceTiers(prev => prev.filter(t => t.id !== tierId));
  };

  // Which sizes are already assigned to some tier (to highlight duplicates)
  const assignedSizes = new Set(priceTiers.flatMap(t => t.sizes));

  /* ── Save Product ── */
  const handleSubmit = async () => {
    setError('');
    if (!form.title.trim()) { setError('Title zaroori hai'); return; }
    if (!useTieredPricing && !form.price) { setError('Price zaroori hai'); return; }
    if (useTieredPricing) {
      const hasEmpty = priceTiers.some(t => t.sizes.length > 0 && !t.price);
      if (hasEmpty) { setError('Har active tier ka price fill karo'); return; }
    }
    if (uploadedImages.length === 0) { setError('Kam az kam 1 image upload karo'); return; }

    setSaving(true);

    // Compute base price: lowest tier price or manual price
    let basePrice = parseFloat(form.price) || 0;
    if (useTieredPricing) {
      const tierPrices = priceTiers
        .filter(t => t.price)
        .map(t => parseFloat(t.price));
      if (tierPrices.length) basePrice = Math.min(...tierPrices);
    }

    // Collect all sizes from tiers if tiered pricing is on
    const allTierSizes = useTieredPricing
      ? [...new Set(priceTiers.flatMap(t => t.sizes))]
      : selectedSizes;

    const payload = {
      title:          form.title.trim(),
      price:          basePrice,
      sku:            form.sku.trim(),
      category:       form.category,
      section:        form.section,
      description:    form.description.trim(),
      images:         uploadedImages,
      sizes:          allTierSizes,
      in_stock:       form.in_stock,
      stock_quantity: form.stock_quantity === '' ? 0 : parseInt(form.stock_quantity, 10),
      // Store full tier info as JSON — make sure your Supabase column is jsonb type
      price_tiers:    useTieredPricing ? priceTiers : [],
    };

    const { error: dbError } = mode === 'edit' && form.id
      ? await supabase.from('products').update(payload).eq('id', form.id)
      : await supabase.from('products').insert(payload);

    setSaving(false);
    if (dbError) { setError(`Save failed: ${dbError.message}`); return; }
    router.push('/admin/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-black text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Product' : 'Add Product'}
          </h1>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">

          {/* ── IMAGE UPLOAD ── */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">
              Product Images <span className="text-red-500">*</span>
              <span className="text-gray-400 font-normal ml-1">(max 5)</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${uploadingImages
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                }`}
            >
              {uploadingImages ? (
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-6 h-6 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <p className="text-sm text-blue-600 font-medium">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                  </svg>
                  <p className="text-sm font-semibold text-gray-700">Click to upload images</p>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP — max 5MB each</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect}/>
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previewImages.map((src, i) => (
                  <div key={i} className="relative group w-20 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <Image src={src} alt={`preview-${i}`} fill className="object-cover" unoptimized />
                    {i >= uploadedImages.length && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                      </div>
                    )}
                    {i < uploadedImages.length && (
                      <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    )}
                    {i === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] text-center py-0.5 font-bold">MAIN</div>
                    )}
                  </div>
                ))}
                {previewImages.length < 5 && (
                  <button onClick={() => fileInputRef.current?.click()} className="w-20 h-24 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── TITLE ── */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Festive Classic Set"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
            />
          </div>

          {/* ══════════════════════════════════════════════════
               PRICING SECTION — Single or Tiered
          ══════════════════════════════════════════════════ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                Pricing <span className="text-red-500">*</span>
              </label>
              {/* Toggle: Single price vs Tiered */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setUseTieredPricing(false)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    !useTieredPricing ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Single Price
                </button>
                <button
                  type="button"
                  onClick={() => setUseTieredPricing(true)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    useTieredPricing ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Size-wise Price
                </button>
              </div>
            </div>

            {/* ── SINGLE PRICE MODE ── */}
            {!useTieredPricing && (
              <div className="space-y-1.5">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">Rs.</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="4500"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
                {form.price && (
                  <p className="text-xs text-amber-600 font-medium">
                    50% Advance = Rs.{Math.ceil(parseFloat(form.price) * 0.5).toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {/* ── TIERED PRICE MODE ── */}
            {useTieredPricing && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  💡 Har group ke liye price set karo. Customer jab size select karega, automatically woh group ka price show hoga.
                </p>

                {priceTiers.map((tier, idx) => (
                  <div key={tier.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Tier Header */}
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 border-b border-gray-100">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Group {idx + 1}</span>
                      <input
                        value={tier.label}
                        onChange={e => updateTierLabel(tier.id, e.target.value)}
                        className="flex-1 text-sm font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-white focus:border focus:border-gray-200 focus:rounded px-1 py-0.5"
                        placeholder="Group name e.g. Infant"
                      />
                      {priceTiers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTier(tier.id)}
                          className="text-red-400 hover:text-red-600 transition-colors ml-auto"
                          title="Remove this group"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Size pills for this tier */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium">Sizes (click to toggle):</p>
                        <div className="flex flex-wrap gap-1.5">
                          {SIZES.map(size => {
                            const inThisTier = tier.sizes.includes(size);
                            const inOtherTier = !inThisTier && assignedSizes.has(size);
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => toggleSizeInTier(tier.id, size)}
                                disabled={inOtherTier}
                                title={inOtherTier ? 'Yeh size kisi aur group mein hai' : ''}
                                className={`px-2.5 py-1 text-xs rounded-full border font-medium transition-all
                                  ${inThisTier
                                    ? 'bg-black text-white border-black'
                                    : inOtherTier
                                      ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed'
                                      : 'border-gray-200 text-gray-600 hover:border-gray-800 bg-white'
                                  }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                        {tier.sizes.length === 0 && (
                          <p className="text-xs text-amber-500 mt-1.5">⚠️ Koi size select nahi — yeh group save nahi hoga</p>
                        )}
                      </div>

                      {/* Price for this tier */}
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rs.</span>
                          <input
                            type="number"
                            value={tier.price}
                            onChange={e => updateTierPrice(tier.id, e.target.value)}
                            placeholder="e.g. 2000"
                            className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
                          />
                        </div>
                        {tier.price && (
                          <p className="text-xs text-amber-600 font-medium whitespace-nowrap">
                            50% = Rs.{Math.ceil(parseFloat(tier.price) * 0.5).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Custom Tier Button */}
                <button
                  type="button"
                  onClick={addCustomTier}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-xl py-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  Naya Price Group Add Karo
                </button>

                {/* Summary preview */}
                {priceTiers.some(t => t.price && t.sizes.length > 0) && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 space-y-1.5">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Price Summary</p>
                    {priceTiers
                      .filter(t => t.price && t.sizes.length > 0)
                      .map(t => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">
                            {t.label} <span className="text-gray-400">({t.sizes.length} sizes)</span>
                          </span>
                          <span className="font-bold text-gray-900">Rs. {parseFloat(t.price).toLocaleString()}</span>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            )}
          </div>
          {/* ══ END PRICING SECTION ══ */}

          {/* ── SKU ── */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">SKU</label>
            <input
              value={form.sku}
              onChange={e => setForm({ ...form, sku: e.target.value })}
              placeholder="e.g. FC-01"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
            />
          </div>

          {/* ── CATEGORY ── */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── SECTION ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              Homepage Section
              <span className="text-gray-400 font-normal ml-1 text-xs">(kahan dikhana hai?)</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SECTIONS.map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setForm({ ...form, section: s.value })}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all
                    ${form.section === s.value
                      ? s.value === 'festival'
                        ? 'bg-amber-50 border-amber-400 text-amber-800 ring-1 ring-amber-400'
                        : 'bg-black text-white border-black'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                >
                  <span className="text-lg">{s.value === 'festival' ? '🎉' : '🆕'}</span>
                  <div>
                    <p className="font-semibold">
                      {s.value === 'festival' ? 'Festival Picks' : 'New Arrivals'}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${form.section === s.value && s.value !== 'festival' ? 'text-gray-300' : 'text-gray-400'}`}>
                      {s.value === 'festival'
                        ? 'Homepage pe "Festival Picks" section mein dikhega'
                        : 'Homepage pe "Trending" section mein dikhega'
                      }
                    </p>
                  </div>
                  {form.section === s.value && (
                    <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── DESCRIPTION ── */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Product ke baare mein likhein..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white resize-none"
            />
          </div>

          {/* ── SIZES (only shown in Single Price mode) ── */}
          {!useTieredPricing && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Available Sizes
                <span className="text-gray-400 font-normal ml-1">({selectedSizes.length} selected)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium
                      ${selectedSizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 text-gray-600 hover:border-gray-800 bg-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STOCK QUANTITY ── */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-800">
              Stock Quantity
              <span className="text-gray-400 font-normal ml-1 text-xs">(total pieces available)</span>
            </label>
            <input
              type="number"
              min="0"
              value={form.stock_quantity}
              onChange={e => setForm({ ...form, stock_quantity: e.target.value })}
              placeholder="e.g. 25"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
            />
          </div>

          {/* ── IN STOCK ── */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-800">In Stock</p>
              <p className="text-xs text-gray-400">Product available for purchase</p>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, in_stock: !form.in_stock })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none
                ${form.in_stock ? 'bg-black' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
                ${form.in_stock ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* ── SUBMIT ── */}
          <button
            onClick={handleSubmit}
            disabled={saving || uploadingImages}
            className="w-full bg-black text-white py-4 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Saving...
              </>
            ) : (
              mode === 'edit' ? 'Update Product' : 'Save Product'
            )}
          </button>

        </div>
      </div>
    </div>
  );
}