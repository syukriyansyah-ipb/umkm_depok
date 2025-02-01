// /app/page.tsx
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList';
import Promo from '@/components/Promo';
import About from '@/components/About';


export default function HomePage ()  {
  return (
    <div>
      <Navbar />
      <Hero />
      <Promo />
      <ProductList />
      <About />
      <Footer />
    </div>
  );
};

