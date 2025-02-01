import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";

interface PropsType {
  id: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
}

const CartProduct: React.FC<PropsType> = ({
  id,
  img,
  title,
  price,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  
  const formatRupiah = (angka: number) => {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="flex justify-between items-center border-b pb-4">
     
      <div className="flex items-center gap-4">
        <Image
          src={img}
          alt={title}
          width={500}
          height={500}
          className="h-[80px] w-[80px] rounded-lg object-cover"
        />
        <div>
          <h4 className="text-gray-800 font-medium">{title}</h4>
          <p className="text-gray-600 text-sm">{formatRupiah(price)}</p>
        </div>
      </div>

     
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(decreaseQuantity(id))}
            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => dispatch(increaseQuantity(id))}
            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
       
        <button
          onClick={() => dispatch(removeFromCart(id))}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
