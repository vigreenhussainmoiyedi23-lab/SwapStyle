//   <div className="relative w-full overflow-hidden">
//         {/* Scrolling container */}
//         <div className="flex  animate-marquee whitespace-nowrap text-5xl source-code-pro font-medium">
//           <div className=" w-1/2 h-full flex gap-12 pl-12">
//             {CATEGORIES.map((category, index) => (
//               <Link
//                 key={index}
//                 to="/listings"
//                 className="hover:text-blue-600 transition-colors duration-200 px-4"
//               >
//                 {category}
//               </Link>
//             ))}
//           </div>
//           <div className="w-1/2 h-full flex gap-12 ">
//             {/* Duplicate for seamless loop */}
//             {CATEGORIES.map((category, index) => (
//               <Link
//                 key={`dup-${index}`}
//                 to="/listings"
//                 className="hover:text-blue-600 transition-colors duration-200 px-4"
//               >
//                 {category}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
// export default CategoriesSlider;
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
      <h1 className="text-6xl playfair text-bg-main mb-8">
        Browse By Categories
      </h1>
      <div class="scroll-container">
        <div class="scroll-content">
          {/* <!-- Group 1 --> */}
          {CATEGORIES.map((category, index) => (
            <div class="item">
              {/* <Link
                key={`dup-${index}`}
                to="/listings"
                className="hover:text-blue-600 transition-colors duration-200 px-4"
              > */}
              {category}
              {/* </Link> */}
            </div>
          ))}
          {CATEGORIES.map((category, index) => (
            <div class="item">
              {/* <Link
                key={`dup-${index}`}
                to="/listings"
                className="hover:text-blue-600 transition-colors duration-200 px-4"
              > */}
              {category}
              {/* </Link> */}
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default CategoriesSlider;
