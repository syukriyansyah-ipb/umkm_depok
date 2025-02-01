'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { IoLogoGoogle } from 'react-icons/io5';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center 
    items-center bg-[url(/products/bg.png)] bg-cover bg-center">
     
      <div className="mb-6">
        <Image src="/products/logoo.png" alt="Logo" width={200} height={200} priority />
      </div>

     
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Welcome to the store!</h1>
        <p className="text-gray-500 mb-6">Please sign in to continue</p>

        
        <button
          onClick={() => signIn('google')}
          className="w-full py-3 bg-customPink text-white rounded-lg 
          font-medium hover:bg-pink-500 transition-all flex items-center justify-center gap-2"
        >
          <IoLogoGoogle size={30}/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;