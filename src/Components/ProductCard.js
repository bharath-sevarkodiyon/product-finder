import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-lg shadow-indigo-500/40 rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      style={{ height: "350px" }}  // Ensures all cards have the same height
      onClick={()=>{navigate(`/location/${product.productName}`)}}
    >
      {/* Top Section - Image (70% of the card) */}
      <div className="w-full h-[55%]">
        <img className="object-cover w-full h-full" src={product.mainImage} alt={product.productName} />
      </div>

      {/* Bottom Section - Product Details with blur (30% of the card) */}
      {/* <div className="relative w-full h-[50%] p-3 opacity-75 bg-gradient-to-t from-[#2c2c2c] to-[#5f5f5d] backdrop-blur-md text-white flex flex-col space-y-1"> */}
      <div className="relative w-full h-[45%] p-3 opacity-95 bg-gradient-to-t from-[#2c2c2c] to-[#575757] backdrop-blur-md text-white flex flex-col space-y-1">
        <h2 className="font-semibold text-base truncate">{product.productName}</h2>
        <p className="text-sm truncate">{product.description}</p>
        <p className="text-xl font-semibold">₹ {product.sellingPrice.$numberDecimal}</p>
        <p className="text-sm truncate">Category: {product.categoryName} | Stock: {product.stockQuantity}</p>
        {/* <p className="text-sm truncate">Stock: {product.stockQuantity}</p> */}
        {/* <p className="text-sm truncate">📍{product.location}</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
