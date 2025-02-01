"use client";

import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

interface propsType {
  id: string;
  img: string;
  title: string;
  price: number;
  category: string;
}

const ProductCard = ({ id, img, category, title, price }: propsType) => {
  const dispatch = useAppDispatch();

  const formatRupiah = (angka: number) => {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const addProductToCart = () => {
    const payload = {
      id,
      img,
      title,
      price,
      quantity: 1,
    };

    dispatch(addToCart(payload));
    makeToast("Added to Cart");
  };

  return (
    <div className="border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105 rounded-lg overflow-hidden bg-white">
   
      <div className="text-center border-b border-gray-200 bg-gray-100">
        <img
          src={img}
          alt={title}
          className="inline-block w-full h-48 object-cover transition-all transform hover:scale-110"
        />
      </div>

     
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase">
            {category}
          </p>
          <h2 className="font-semibold text-lg text-gray-800 mt-1 line-clamp-1">
            {title}
          </h2>

        
          <div className="mt-2 flex text-yellow-400 items-center text-sm">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p className="text-gray-600 ml-2">(1117 Reviews)</p>
          </div>
        </div>

       
        <div className="flex justify-between items-center mt-4">
        
          <h2 className="font-bold text-accent text-xl">{formatRupiah(price)}</h2>
          <button
            onClick={addProductToCart}
            className="flex items-center gap-2 bg-gradient-to-r
            from-pink-500 to-purple-600 text-white px-4 py-2 rounded-md
            text-sm hover:scale-105 hover:opacity-90 transition-all active:scale-95"
          >
            <AiOutlineShoppingCart />
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
