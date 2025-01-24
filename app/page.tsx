// /app/page.tsx
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList';
import Promo from '@/components/Promo';
import About from '@/components/About';


export default function HomePage ()  {
  return (
    <div>
      <Hero />
      <Promo />
      <ProductList />
      <About />
    </div>
  );
};

