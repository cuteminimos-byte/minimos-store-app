import React from 'react';

export default function PrincessDiariesPage() {
  return (
    <div className="w-full min-h-screen bg-white py-16 px-4 md:px-8 max-w-[1400px] mx-auto mt-16 md:mt-24">
      {/* Page Title */}
      <div className="border-b border-gray-100 pb-5 mb-10">
        <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide uppercase">
          Princess Diaries
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Elegant, dreamy, and beautifully crafted ensembles.
        </p>
      </div>

      {/* Products Grid Area */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="text-center text-gray-400 py-20 border border-dashed border-gray-200 rounded-xl col-span-full">
          Products Details Coming Soon...
        </div>
      </div>
    </div>
  );
}