import Image from "next/image";

const Banner = () => {
  return (
    <div className="container mt-24">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
      
        <div className="flex justify-center items-center order-2 lg:order-1">
          <Image
            src="/products/varsity.png"
            alt="Banner"
            width={500}
            height={300}
            className="rounded-2xl object-cover shadow-2xl"
          />
        </div>

       
        <div className="flex flex-col justify-center bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8 md:p-14 rounded-2xl shadow-lg order-1 lg:order-2">
         
          <p className="text-accent text-lg font-semibold tracking-wide">
            Limited Time Offer
          </p>

          
          <h2 className="text-topHeadingPrimary font-extrabold text-3xl sm:text-5xl mt-4 leading-snug">
            Enjoy <span className="text-customPink">Free Shipping</span> <br />
            <span className="text-accent">Anywhere in the Country</span>
          </h2>

         
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-[450px]">
            Shop now and take advantage of our exclusive free shipping offer! Don’t miss this chance to save on all your favorite products.
          </p>

          
          <a
            href="#"
            className="mt-8 bg-customPink text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-pink-500 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
