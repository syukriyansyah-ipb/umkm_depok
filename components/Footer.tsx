export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; 2025 My E-Commerce Store. All Rights Reserved.</p>
        <div className="mt-4">
          <h4 className="font-semibold">Informasi Pembuat</h4>
          <p>Versi: 1.0.0</p>
          <p>Kontak: <a href="mailto:syukrieyansyah@gmail.com" className="text-blue-400 hover:underline">contact@yourdomain.com</a></p>
          <p>Aturan Penggunaan: Silakan baca <a href="/terms" className="text-blue-400 hover:underline">syarat dan ketentuan</a> kami sebelum menggunakan layanan ini.</p>
        </div>
      </div>
    </footer>
  );
}
  
  