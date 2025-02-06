import Navbar from '@/app/components/front-end/Navbar';
import Footer from "@/app/components/front-end/Footer";
import Hero from '@/app/components/front-end/Hero';
import ProductList from '@/app/components/front-end/ProductList';
import Promo from '@/app/components/front-end/Promo';
import About from '@/app/components/front-end/About';

export default function HomePage() {
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
}