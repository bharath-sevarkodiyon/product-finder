import React, { useState } from "react";

const ProductCategory = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Local JSON data for categories
  const categoryData = [
    { _id: "1", categoryName: "Cameras" },
    { _id: "2", categoryName: "Laptops" },
    { _id: "3", categoryName: "Appliances" },
    { _id: "4", categoryName: "Electronics" },
    { _id: "5", categoryName: "Fashion" },
  ];

  // Handle category selection and update selectedCategory state
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName); // Set selectedCategory to the category ID
    onCategorySelect(categoryName);    // Pass the category ID to the parent component
  };

  return (
    <div className="category-list flex space-x-14 overflow-auto p-4 justify-center">
      <button
        className={`category-item py-2 px-4 rounded-lg font-bold transition cursor-pointer ${
          selectedCategory === "All" ? "bg-[#2C2C2C] text-white" : "bg-transparent text-[#2C2C2C]"
        }`}
        onClick={() => handleCategorySelect("All")} // Select "All" (for no filtering)
      >
        All
      </button>
      {categoryData.map((category) => (
        <button
          key={category._id}
          className={`category-item py-2 px-4 rounded-lg font-bold transition cursor-pointer ${
            selectedCategory === category.categoryName
              ? "bg-[#2C2C2C] text-white"  // Highlight the selected category
              : "bg-transparent text-[#2C2C2C]"  // Default styling
          }`}
          onClick={() => handleCategorySelect(category.categoryName)}  // Pass the category ID instead of name
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default ProductCategory;
