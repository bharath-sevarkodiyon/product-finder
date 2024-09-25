import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductCategory = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default focus on "All"

  useEffect(() => {
    // Fetch product categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/productCategory");
        setCategories(response.data); // Assuming response.data contains the category array
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection and update selectedCategory state
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    onCategorySelect(categoryName); // Notify parent component of the selected category
  };

  return (
    <div className="category-list flex space-x-14 overflow-auto p-4 justify-center">
      <button
        className={`category-item py-2 px-4 rounded-lg font-bold transition cursor-pointer ${
          selectedCategory === "All" ? "bg-[#2C2C2C] text-white" : "bg-transparent text-[#2C2C2C]"
        }`}
        onClick={() => handleCategorySelect("All")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          className={`category-item py-2 px-4 rounded-lg font-bold transition cursor-pointer ${
            selectedCategory === category.categoryName
              ? "bg-[#2C2C2C] text-white"  // Highlight the selected category
              : "bg-transparent text-[#2C2C2C]"  // Default styling
          }`}
          onClick={() => handleCategorySelect(category.categoryName)}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default ProductCategory;
