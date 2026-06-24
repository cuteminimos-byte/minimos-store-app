import type { Metadata } from 'next';
import './globals.css';
import AnnouncementBar from '@/src/components/AnnouncementBar';
import TopHeader from '@/src/components/TopHeader';
import MainNav from '@/src/components/MainNav';
import Footer from '@/src/components/footer';  

export const metadata: Metadata = {
  title: "Cute Minimo's",
  description: "Premium knitted clothing for Boys, Girls & Men",
  icons: {
    icon: "/images/logo1.jpg",
  },
};

export default function RootLayout({
  children,
  modals, // 1. Naya slot catch kiya
}: {
  children: React.ReactNode;
  modals: React.ReactNode; // 2. Iska type bataya
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        
        {/* HEADER BLOCK */}
        <header className="flex flex-col w-full shrink-0">
          <AnnouncementBar />
          <TopHeader />
          <MainNav />
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex-1">
          <main className="py-6">
            {children}
          </main>
        </div>

        {/* FOOTER BLOCK */}
        <footer className="w-full shrink-0">
          <Footer />
        </footer>

        {/* 3. Modals ko body ke end mein render kiya taake ye baqi sab ke UPAR overlay ban sake */}
        {modals}

      </body>
    </html>
  );
}