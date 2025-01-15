"use client"
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="flex justify-between items-center p-4 bg-blue-500">
        <div>
          <Link href="/" className="text-white text-lg font-bold">
            <img src="/logo.png" alt="Logo" className="w-12" />
          </Link>
        </div>
        <div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden">
            Menu
          </button>
          <ul className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <li><Link href="/" className="text-white p-2">Home</Link></li>
            <li><Link href="/admin" className="text-white p-2">Admin</Link></li>
            <li><Link href="/login" className="text-white p-2">Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
