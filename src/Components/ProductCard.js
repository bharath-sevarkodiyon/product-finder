import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isOutOfStock = product.stockQuantity === 0;
  console.log(product);
  
  return (
    <div
      className={`relative shadow-lg rounded-md overflow-hidden transform transition-transform duration-300 ease-in-out cursor-pointer ${
        isOutOfStock
          ? "bg-gray-400 text-gray-500 pointer-events-none" // Grey out if out of stock and disable click
          : "hover:scale-105"
      }`}
      style={{ height: "350px" }}
      onClick={() => {
        if (!isOutOfStock) {
          // console.log(product.productName);
          navigate(`/location/${product.productName}`);
        }
      }}
    >
      {/* Top Section - Image (70% of the card) */}
      <div className="w-full h-[63%]">
        <img
          className="object-cover w-full h-full"
          src={product.mainImage}
          alt={product.productName}
        />
      </div>

      {/* Bottom Section - Product Details with blur (30% of the card) */}
      <div className="relative rounded-b-md w-full h-[37%] p-3 opacity-95 bg-gradient-to-t from-[#2c2c2c] to-[#575757] backdrop-blur-md text-white flex flex-col space-y-1">
        <h2 className="font-semibold text-base truncate">
          {product.productName}
        </h2>
        <p className="text-sm truncate">{product.description}</p>
        <p className="text-xl font-semibold">
          ₹ {product.sellingPrice.$numberDecimal}
        </p>
        <p className="text-sm truncate">
          Category: {product.categoryName} | Stock: {product.stockQuantity}
        </p>

        {/* Tap to locate product (conditionally shown on hover) */}
        {/* <p className="text-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
          Tap to locate product
        </p> */}
      </div>

      {/* Sold Out overlay if out of stock */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <p className="text-xl font-bold text-white">Sold Out</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
