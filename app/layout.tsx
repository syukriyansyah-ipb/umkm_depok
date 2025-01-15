import "./globals.css";

import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";

export const metadata = {
  title: "UMKM Hub",
  description: "Discover world's best your showcase products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
