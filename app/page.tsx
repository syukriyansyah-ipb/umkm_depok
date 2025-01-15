// /app/page.tsx
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList';
import Promo from '@/components/Promo';
import Location from '@/components/Location'


export default function HomePage ()  {
  return (
    <div>
      <Hero />
      <Promo />
      <ProductList />
      <Location />
    </div>
  );
};

