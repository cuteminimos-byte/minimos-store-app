// components/MainNav.tsx
import Link from 'next/link';

export default function MainNav() {
  return (
    // z-50 lagane se dropdowns niche chalne wale Carousel ke upar float karenge
    <nav className="bg-black text-white w-full relative z-50 border-b border-zinc-800">
      {/* Andar ka container text links ko max-w-7xl content boundary me align rakhega */}
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center h-12 text-sm font-medium">

          {/* Ready To Ship */}
          <li className="h-full group relative flex items-center justify-center">
            <Link
              href="/readyToShip"
              className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
            >
              Ready To Ship
              {/* White Underline Element */}
              <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          </li>

          {/* What's New */}
          <li className="h-full group relative flex items-center justify-center">
            <Link
              href="/whats-new"
              className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
            >
              What's New
              {/* White Underline Element */}
              <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>

            {/* Dropdown - Added z-50 */}
            <div className="absolute hidden group-hover:block pt-0 z-50 top-12 left-0">
              <div className="bg-white shadow-xl rounded-b-md py-2 w-56 text-sm border border-gray-100">
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="/monochrome-edit"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Monochrome Edit
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="/summer-basics"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Summer Basics
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="/festive-classics"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Festive Classics
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="/princess-diaries"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Princess Diaries
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="/crochet-knit-drop"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Crochet & Knit Drop.
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="/accessories"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Accessories
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Boys */}
          <li className="h-full group relative flex items-center justify-center">
            <Link
              href="/boys"
              className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
            >
              Boys
              {/* White Underline Element */}
              <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            {/* Dropdown - Added z-50 */}
            <div className="absolute hidden group-hover:block pt-0 z-50 top-12 left-0">
              <div className="bg-white shadow-xl rounded-b-md py-2 w-56 text-sm border border-gray-100">
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Sarbaala
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Garden Gang (Boys)
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Shukrana (Twinning)
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Gota Classics
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Golden Hour (Twinning)
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      The Drape Series
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Velvet Classics
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Monochrome Boys
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Bulbul
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Girls */}
          <li className="h-full group relative flex items-center justify-center">
            <Link
              href="/girls"
              className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
            >
              Girls
              {/* White Underline Element */}
              <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            {/* Dropdown - Added z-50 */}
            <div className="absolute hidden group-hover:block pt-0 z-50 top-12 left-0">
              <div className="bg-white shadow-xl rounded-b-md py-2 w-56 text-sm border border-gray-100">
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Surkhi Powder
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Princess Diaries
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Doria Series
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Velvet Classics
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Shukrana (Twinning)
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Golden Hour (Twinning)
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Garden Gang (Girls)
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Gota Classics
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Cape Couture
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      The Drape Series
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Jhumar
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Monochrome Girls
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Summer Playdates
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Bulbul
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Men */}
          <li className="h-full group relative flex items-center justify-center">
            <Link
              href="/men"
              className="px-6 flex items-center font-bold h-full text-white transition-all duration-200 relative pb-0.5"
            >
              Men
              {/* White Underline Element */}
              <span className="absolute left-6 right-6 bottom-3 h-[1.5px] bg-white scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            {/* Dropdown - Added z-50 */}
            <div className="absolute hidden group-hover:block pt-0 z-50 top-12 left-0">
              <div className="bg-white shadow-xl rounded-b-md py-2 w-56 text-sm border border-gray-100">
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Monochrome Men
                    </a>
                  </li>
                  <li className="border-t border-gray-100"></li>
                  <li>
                    <a
                      href="#"
                      className="px-6 py-3 hover:bg-gray-50 block text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Summer Essentials
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}