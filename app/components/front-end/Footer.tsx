'use client'
import Link from 'next/link';
import { useState, useEffect } from "react";

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
                <a href={aboutData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
              )}
              {aboutData?.socialMedia?.instagram && (
                <a href={aboutData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              )}
              {aboutData?.socialMedia?.tiktok && (
                <a href={aboutData.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  TikTok
                </a>
              )}
              {aboutData?.socialMedia?.shopee && (
                <a href={aboutData.socialMedia.shopee} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Shopee
                </a>
              )}
              {aboutData?.socialMedia?.tokopedia && (
                <a href={aboutData.socialMedia.tokopedia} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Tokopedia
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
