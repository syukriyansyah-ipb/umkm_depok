import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function middleware(req: Request) {
  const cookieStore = await cookies(); // Mendapatkan cookies secara asynchronous
  const token = cookieStore.get('token');

  if (!token || typeof token !== 'string') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verifikasi token jika token adalah string
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Menambahkan informasi user ke objek request
    (req as any).user = decoded;

    // Cek apakah pengguna memiliki akses ke halaman
    if (req.url.includes('/admin') && (req as any).user.role !== 'superadmin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Tentukan path yang lebih spesifik untuk middleware
export const config = {
  matcher: ['/admin'],  // Masukkan path yang lebih eksplisit
};
