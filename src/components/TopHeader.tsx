'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { CATEGORIES } from '@/lib/categories'; // ✅ shared categories — same list used on home page

const TopHeaderContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get('query') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

    useEffect(() => {
        setSearchQuery(searchParams.get('query') || '');
    }, [searchParams]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set('query', value);
        } else {
            params.delete('query');
        }

        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="bg-white px-4 py-1 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                <div className="flex items-center gap-4">
                    <Link href="/HomeCarousel" className="cursor-pointer block transition-opacity hover:opacity-90">
                        <img
                            src="/images/logo1.jpg"
                            alt="Logo"
                            style={{ width: '100px', height: '100px' }}
                            className="object-contain"
                        />
                    </Link>
                    <span className="hidden md:block font-serif font-bold text-lg text-gray-900 tracking-wide">
                        Cute <span className="text-gray-400 font-normal">minimos</span>
                    </span>
                </div>

                <div className="flex flex-col gap-2 items-end">
                    <div className="relative w-full max-w-[160px]">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full bg-gray-100 focus:border-gray-400 focus:outline-none py-1 pl-2 pr-9 text-gray-700 placeholder-gray-700 text-base"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <i className="bi bi-search flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </i>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <svg
                                viewBox="0 0 30 30"
                                className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors group-hover:animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20,6V5c0-2.761-2.239-5-5-5s-5,2.239-5,5v1H4v24h22V6H20z M12,5c0-1.657,1.343-3,3-3s3,1.343,3,3v1h-6V5z M24,28H6V8h4v3 h2V8h6v3h2V8h4V28z" fill="currentColor" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                                Shopping cart
                            </span>
                            <span className="bg-[#f8e8e8] text-black text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                0
                            </span>
                        </div>

                        <button
                            onClick={() => router.push('/signin')}
                            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors pl-4 py-2 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

            </div>

            {/* ── CATEGORY NAVIGATION ──────────────────────────────────
                Same CATEGORIES list jo home page (Shop By Category) aur
                admin panel mein use hoti hai — isliye yahan se click karne
                par kabhi 404 nahi aayega.
            ──────────────────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto border-t border-gray-100 mt-1">
                {/* Desktop: full row of category links */}
                <nav className="hidden md:flex items-center gap-5 py-2.5 overflow-x-auto">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.value}
                            href={`/category/${cat.value}`}
                            className="text-xs font-semibold text-gray-600 hover:text-black whitespace-nowrap transition-colors"
                        >
                            {cat.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile: dropdown menu to save space */}
                <div className="md:hidden py-2">
                    <button
                        onClick={() => setCategoryMenuOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-700"
                    >
                        Categories
                        <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryMenuOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    {categoryMenuOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2 pb-2">
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.value}
                                    href={`/category/${cat.value}`}
                                    onClick={() => setCategoryMenuOpen(false)}
                                    className="text-xs font-medium text-gray-600 hover:text-black bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TopHeader = () => {
    return (
        <Suspense fallback={
            <div className="bg-white px-4 py-1 h-[108px] w-full" />
        }>
            <TopHeaderContent />
        </Suspense>
    );
};

export default TopHeader;