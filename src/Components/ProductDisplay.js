import React from "react";
import ProductCard from "./ProductCard";

const ProductDisplay = ({ products }) => {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-l from-[#da22ff] to-[#9733ee]">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-teal-50">
      {products.length === 0 ? (
        <div className="col-span-full text-center text-xl text-white">
          No products are available.
        </div>
      ) : (
        products.map((product, index) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};
export default ProductDisplay;
