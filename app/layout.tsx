import "./globals.css";


import AuthProvider from "@/app/components/admin-panel/AuthProvider";
import App from "@/app/App";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "UMKM Hub",
  description: "Discover world's best your showcase products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <AuthProvider> 
            <App>{children}</App>
          </AuthProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
