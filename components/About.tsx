'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Award, MapPin, Phone, Mail } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Users, value: '1000+', label: 'Pelanggan Puas' },
    { icon: Briefcase, value: '50+', label: 'Proyek Selesai' },
    { icon: Award, value: '10+', label: 'Penghargaan' },
  ]

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
          <p className="text-lg text-gray-600 mb-6">
            Kami adalah perusahaan yang berdedikasi untuk menyediakan produk berkualitas tinggi dengan harga yang terjangkau. Dengan pengalaman lebih dari 10 tahun di industri ini, kami berkomitmen untuk memberikan layanan terbaik kepada pelanggan kami.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Alamat Kami</h3>
              <p className="text-lg text-gray-600 flex items-center mb-2">
                <MapPin className="mr-2" /> Jl. Contoh No. 123, Jakarta, Indonesia
              </p>
              <p className="text-lg text-gray-600 flex items-center mb-2">
                <Phone className="mr-2" /> +62 123 4567 890
              </p>
              <p className="text-lg text-gray-600 flex items-center">
                <Mail className="mr-2" /> info@perusahaan.com
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Lokasi Kami</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9200000000005!2d106.8271533153169!3d-6.1751100000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e000000000%3A0x0000000000000000!2sMonas!5e0!3m2!1sen!2sid!4v1610000000000!5m2!1sen!2sid"
                width="100%"
                height="200"
                allowFullScreen={false}
                loading="lazy"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Hubungi kami untuk informasi lebih lanjut atau kunjungi toko kami untuk melihat koleksi lengkap kami. Kami menantikan kunjungan Anda!
          </p>
        </div>
      </div>
    </section>
  )
}
