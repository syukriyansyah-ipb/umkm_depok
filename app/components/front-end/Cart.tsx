import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import CartProduct from "./CartProduct";

const Cart = ({ setShowCart }: any) => {
  const products = useAppSelector((state) => state.cart);

 
  const getTotalPrice = () => {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  
  const getDiscountedPrice = (totalPrice: number) => {
    if (totalPrice >= 1000000) {
      return totalPrice * 0.6; 
    } else if (totalPrice >= 599000) {
      return totalPrice * 0.8; 
    } else {
      return totalPrice; 
    }
  };


  const getTotalQuantity = () => {
    return products.reduce((total, item) => total + item.quantity, 0);
  };

  
  const formatRupiah = (angka: number) => {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const totalPrice = getTotalPrice();
  const discountedPrice = getDiscountedPrice(totalPrice);

  return (
    <div
      className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll"
    >
      <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 transition-transform transform translate-x-0">
     
        <RxCross1
          className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer"
          onClick={() => setShowCart(false)}
        />

        
        <h3 className="pt-6 text-lg font-medium text-gray-600 uppercase">Your Cart</h3>

        
        <div className="mt-6 space-y-4">
          {products.length > 0 ? (
            products.map((item: any) => (
              <CartProduct
                key={item.id}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
              />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

     
        <div className="mt-8">
          <div className="flex justify-between items-center text-lg font-medium">
            <p>Total Items:</p>
            <p>{getTotalQuantity()}</p>
          </div>
          <div className="flex justify-between items-center text-lg font-medium mt-2">
            <p>Total Price (Before Discount):</p>
            <p>{formatRupiah(totalPrice)}</p>
          </div>
          <div className="flex justify-between items-center text-lg font-medium mt-2">
            <p>Total Price (After Discount):</p>
            <p>{formatRupiah(discountedPrice)}</p>
          </div>
        </div>

        
        <div className="mt-6 space-y-4">
          <button
            className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent transition"
          >
            View Cart
          </button>
          <button
            className="bg-accent text-white text-center w-full rounded-3xl py-2 hover:bg-opacity-90 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
