import { Suspense } from "react";
import Link from "next/link";

function NotFoundContent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link
        href="/"
        className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}