'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { CATEGORIES } from '@/lib/categories';

const TopHeaderContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

    // Sync input if URL query changes externally
    useEffect(() => {
        setSearchQuery(searchParams.get('query') || '');
    }, [searchParams]);

    // Only navigate on form submit (Enter key or button click)
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.set('query', searchQuery.trim());
        }
        router.push(`/?${params.toString()}`);
    };

    const handleClear = () => {
        setSearchQuery('');
        router.push('/');
    };

    return (
        <div className="bg-white px-4 py-1 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="cursor-pointer block transition-opacity hover:opacity-90">
                        <img
                            src="/images/Logo1.jpg"
                            alt="Cute Minimos Logo"
                            style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '50%' }}
                        />
                    </Link>
                    <span className="hidden md:block font-serif font-bold text-lg text-gray-900 tracking-wide">
                        Cute <span className="text-gray-400 font-normal">minimos</span>
                    </span>
                </div>

                {/* SEARCH + CART + SIGN IN */}
                <div className="flex flex-col gap-2 items-end">

                    {/* Search — router.push ONLY on submit, not on every keystroke */}
                    <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-100 border border-transparent focus:border-gray-400 focus:outline-none py-1.5 pl-3 pr-8 text-gray-700 placeholder-gray-400 text-sm rounded-md transition-colors"
                        />
                        {searchQuery ? (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                aria-label="Clear"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                                aria-label="Search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
                        )}
                    </form>

                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                            <svg viewBox="0 0 30 30" className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20,6V5c0-2.761-2.239-5-5-5s-5,2.239-5,5v1H4v24h22V6H20z M12,5c0-1.657,1.343-3,3-3s3,1.343,3,3v1h-6V5z M24,28H6V8h4v3h2V8h6v3h2V8h4V28z" fill="currentColor" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors"></span>
                            <span className="bg-[#f8e8e8] text-black text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">0</span>
                        </Link>
                        <button onClick={() => router.push('/signin')} className="text-sm font-semibold text-gray-700 hover:text-black transition-colors pl-4 py-2 cursor-pointer">
                            
                        </button>
                    </div>
                </div>

            </div>

            {/* CATEGORY NAV */}
            <div className="max-w-6xl mx-auto border-t border-gray-100 mt-1">
                <nav className="hidden md:flex items-center gap-5 py-2.5 overflow-x-auto scrollbar-none">
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.value} href={`/category/${cat.value}`} className="text-xs font-semibold text-gray-600 hover:text-black whitespace-nowrap transition-colors">
                            {cat.label}
                        </Link>
                    ))}
                </nav>
                <div className="md:hidden py-2">
                    <button onClick={() => setCategoryMenuOpen((prev) => !prev)} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                        Categories
                        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    {categoryMenuOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2 pb-2">
                            {CATEGORIES.map((cat) => (
                                <Link key={cat.value} href={`/category/${cat.value}`} onClick={() => setCategoryMenuOpen(false)} className="text-xs font-medium text-gray-600 hover:text-black bg-gray-50 rounded-lg px-3 py-2 transition-colors">
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

const TopHeader = () => (
    <Suspense fallback={<div className="bg-white px-4 py-1 h-[108px] w-full" />}>
        <TopHeaderContent />
    </Suspense>
);

export default TopHeader;