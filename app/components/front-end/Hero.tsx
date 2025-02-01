"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    title: "Define Your Style with Our Limited Edition Masterpiece",
    price: "Rp. 299.000",
    discount: "20%",
    image: "/products/baju.png",
  },
  {
    title: "More Savings, More Smiles – Grab Your Cashback Now!",
    price: "Rp. 399.000 Cashback s/d Rp. 99.000",
    discount: "40%",
    image: "/products/atztww.png",
  },
  {
    title: "Buy 1 Get 1 Free – Only for Selected Products!",
    price: "Starts from Rp. 199.000",
    discount: "Exclusive Offer",
    image: "/products/bag.png",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 mt-30 relative">
   
      <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-200 opacity-30 rounded-full"></div>

      <div className="container grid md:grid-cols-2 gap-8 items-center py-12 px-6 relative">
       
        <div className="max-w-[450px] space-y-6 text-center md:text-left animate-fadeIn mt-20">
          <h1 className="font-bold text-3xl md:text-5xl text-gray-800 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-gray-600">
            Start from {" "}
            <span className="text-red-500 font-semibold">
              {slides[currentSlide].price}
            </span>
          </p>
          <h3 className="text-xl text-gray-700">
            Special Discount {" "}
            <span className="text-red-600 font-bold">
              {slides[currentSlide].discount}
            </span>{" "}
            Only This Week
          </h3>
          <a
            href="#"
            className="inline-block bg-customPink text-white rounded-md px-8 py-3
            shadow-lg hover:bg-pink-500 transition duration-300"
          >
            Shop Now
          </a>
        </div>

    
        <div className="flex justify-center mt-20">
          <Image
            src={slides[currentSlide].image}
            alt="hero"
            width={450}
            height={450}
            className="rounded-lg shadow-2xl transition-transform duration-500 hover:scale-110"
          />
        </div>

   
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white
          p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          &#10095;
        </button>
      </div>

   
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              currentSlide === index ? "bg-red-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
