import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import { MapPinIcon } from "@heroicons/react/solid"; // Import Heroicons' map pin icon

const StoreLayout = ({ selectedProduct }) => {
  const [products, setProducts] = useState([]);
  const aisles = Array.from({ length: 55 }, (_, i) => i + 1); // Aisles 1 to 56

  useEffect(() => {
    // Fetch products data from the API
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/api/product"
        );
        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold p-4">Avengers Store - Aisles</h1>
      <div className="grid grid-cols-11 gap-y-5 gap-x-8 p-3 bg-gray-100">
        {aisles.map((aisle) => {
          const product = products[aisle - 1]; // Get the product for the current aisle
          const isSelected = product && product.productName === selectedProduct; // Check if this product is the selected one

          return (
            <div
              key={`aisle-${aisle}`}
              className={`p-5 border border-black flex justify-center items-center transition ${
                isSelected ? "blinking-effect" : "bg-lime-300"
              } opacity-50 hover:opacity-100 cursor-pointer`}
            >
              <span>Aisle {aisle}</span>
            </div>
          );
        })}
      </div>
      {/* "You are Here" Icon Section */}
      <div className="flex flex-col justify-center items-center mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <p className="font-bold text-lg mt-2">You are Here</p>
      </div>
    </div>
  );
};

export default StoreLayout;
