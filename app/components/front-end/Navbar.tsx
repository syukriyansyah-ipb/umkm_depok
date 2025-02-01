"use client";

import { useAppSelector } from "@/redux/hooks";
import { useSession, signOut, signIn } from "next-auth/react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Navbar = ({
  setShowCart,
  onSearch,
}: {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (query: string) => void;
}) => {
  const { data: session } = useSession();
  const cartCount = useAppSelector((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
    if (query.trim() !== "") {
      const trendingSection = document.getElementById("trending-products");
      if (trendingSection) {
        trendingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="pt-4 py-5 bg-white top-0 fixed z-20 shadow-md w-full">
        <div className="flex flex-wrap justify-between items-center px-4 md:px-8 lg:px-16 gap-4">
        
          <div className="flex-shrink-0">
            <Image src="/products/logoo.png" alt="Logo" width={125} height={100} priority />
          </div>

        
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              className="border-2 border-accent px-4 py-2 w-full lg:w-full rounded-md focus:outline-none text-sm"
              placeholder="Search for products..."
              onChange={handleSearch}
            />
            <button className="bg-accent text-white p-2 rounded-md hover:bg-accent-dark transition-all">
              <BsSearch />
            </button>
          </div>

        
          <div className="flex gap-4 items-center">
            {session ? (
              <div className="relative">
                <div
                  className="rounded-full border-2 border-gray-500 text-gray-500 text-[32px]
                  w-[35px] h-[35px] grid place-items-center hover:border-accent transition-all cursor-pointer"
                  onClick={toggleDropdown} 
                >
                  <AiOutlineUser size={30}/>
                </div>

              
                {dropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-[200px] z-10"
                  >
                    <p className="text-gray-500 text-sm">{session.user?.name}</p>
                    <button
                      onClick={() => signOut()}
                      className="text-red-500 text-sm font-medium w-full mt-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-accent text-white px-4 py-2 rounded-lg text-sm"
              >
                Sign In
              </button>
            )}

            <div
              className="text-gray-500 text-[32px] relative cursor-pointer hover:text-accent transition-all"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShoppingCart />
              {cartCount > 0 && (
                <div
                  className="absolute top-[-10px] right-[-10px] bg-red-600 w-[20px] h-[20px]
                  rounded-full text-white text-[12px] grid place-items-center font-medium"
                >
                  {cartCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
