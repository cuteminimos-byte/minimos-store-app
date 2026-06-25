'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const TopHeaderContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get('query') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);

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