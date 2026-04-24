import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Categorie.css";

const CategoriesSlider = () => {
  const CLOTHING_TYPES = {
    Tops: ["T-Shirt", "Shirt", "Polo Shirt", "Hoodie"],
    Bottoms: ["Jeans", "Trousers", "Shorts"],
    Dresses: ["Mini Dress", "Maxi Dress"],
    Outerwear: ["Jacket", "Coat", "Blazer"],
    Ethnic: ["Saree", "Kurta", "Lehenga"],
  };

  const CATEGORIES = Object.keys(CLOTHING_TYPES);

  return (
    <div className="w-full relative py-10 overflow-hidden flex flex-col items-center justify-center ">
      <h1 className="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl playfair text-bg-main mb-8">
        Browse By Categories
      </h1>
      <div class="scroll-container">
        <div class="scroll-content">
          {/* <!-- Group 1 --> */}
          {CATEGORIES.map((category, index) => (
            <div class="item lg:text-4xl xl:text-5xl md:text-3xl sm:text-2xl text-xl">
              {category}
            </div>
          ))}
          {CATEGORIES.map((category, index) => (
            <div class="item lg:text-4xl xl:text-5xl md:text-3xl sm:text-2xl text-xl">
              {category}
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default CategoriesSlider;
