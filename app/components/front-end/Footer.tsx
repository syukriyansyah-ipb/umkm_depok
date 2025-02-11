'use client'
import Link from 'next/link';
import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaStore } from 'react-icons/fa'
import { SiShopee } from "react-icons/si"

interface AboutData {
  name: string;
  address: string;
  mapUrl: string;
  description: string;
  phoneNumber: string;
  email: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    tokopedia?: string;
    tiktok?: string;
    shopee?: string;
  };
}


const Footer = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching UMKM data:", err));
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center">
              <h1 className="text-lg font-semibold">{aboutData?.name || "Loading..."}</h1>
            </Link>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {aboutData?.name || "Company"}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/promo" className="text-gray-400 hover:text-white">Promo</Link></li>
              <li><Link href="/produk" className="text-gray-400 hover:text-white">Produk</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: {aboutData?.email || "-"}</li>
              <li>Phone: {aboutData?.phoneNumber || "-"}</li>
              <li>Alamat: {aboutData?.address || "-"}</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
                {aboutData?.socialMedia?.facebook && (
                  <a href={aboutData.socialMedia.facebook || "#"} className="text-blue-600 hover:text-blue-800">
                    <FaFacebook size={24} />
                  </a>
                )}
                {aboutData?.socialMedia?.tiktok && (
                  <a href={aboutData.socialMedia.tiktok || "#"} className="text-zinc-700 hover:text-black">
                    <FaTiktok size={24} />
                  </a>
                )}
                {aboutData?.socialMedia?.instagram && (
                  <a href={aboutData.socialMedia.instagram || "#"} className="text-pink-600 hover:text-pink-800">
                    <FaInstagram size={24} />
                  </a>
                )}
                {aboutData?.socialMedia?.shopee && (
                  <a href={aboutData.socialMedia.shopee || "#"} className="text-orange-700 hover:text-orange-900">
                    <SiShopee size={24} />
                  </a>
                )}
                {aboutData?.socialMedia?.tokopedia && (
                  <a href={aboutData.socialMedia.tokopedia || "#"} className="text-green-700 hover:text-green-900">
                    <FaStore size={24} />
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
