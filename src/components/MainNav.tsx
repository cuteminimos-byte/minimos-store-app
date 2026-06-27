// components/MainNav.tsx
import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories'; // ✅ shared categories — admin & header sync

export default function MainNav() {
  return (
    // z-50 lagane se yeh niche chalne wale Carousel ke upar float karega
    <nav className="bg-black text-white w-full relative z-50 border-b border-zinc-800">
      {/* Andar ka container links ko max-w-7xl content boundary me align rakhega */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <ul className="flex items-center h-12 text-sm font-medium whitespace-nowrap">

          {/* Ready To Ship — apni alag category hai, 9-category list ka hissa nahi */}
          <li className="h-full group relative flex items-center justify-center">
            <Link
              href="/readyToShip"
              className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
            >
              Ready To Ship
              <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          </li>

          {/* ✅ 9 categories — shared list se, seedhe links, koi dropdown nahi */}
          {CATEGORIES.map((cat) => (
            <li key={cat.value} className="h-full group relative flex items-center justify-center">
              <Link
                href={`/category/${cat.value}`}
                className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
              >
                {cat.label}
                <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
}