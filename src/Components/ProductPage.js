import React, { useState, useEffect } from "react";
import ProductCategory from "./ProductCategory";
import ProductDisplay from "./ProductDisplay";
import { data } from "./data";
const ProductPage = ({ searchedProducts }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Local JSON data for product categories
  const categoryData = [
    { _id: "1", categoryName: "Cameras" },
    { _id: "2", categoryName: "Laptops" },
    { _id: "3", categoryName: "Appliances" },
    { _id: "4", categoryName: "Electronics" },
    { _id: "5", categoryName: "Fashion" }
  ];

  // Local JSON data for products
  const productData = data;

  useEffect(() => {
    // Create a map of category IDs to category names
    const categoryMap = {};
    categoryData.forEach((category) => {
      categoryMap[category._id] = category.categoryName;
    });

    // Map each product's `product_category` to its category name
    const mappedProducts = productData.map((product) => ({
      ...product,
      categoryName: categoryMap[product.product_category] || "Unknown Category",
    }));

    setProducts(mappedProducts);
    setFilteredProducts(mappedProducts);
  }, []);

  useEffect(() => {
    let tempProducts = products;

    if (searchedProducts) {
      tempProducts = searchedProducts;
    }

    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(
            (product) => categoryData.find(cat => cat._id === product.product_category)?.categoryName === selectedCategory
          );
    }

    setFilteredProducts(tempProducts);
  }, [searchedProducts, selectedCategory, products]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <ProductCategory onCategorySelect={handleCategorySelect} />
      {filteredProducts.length > 0 ? (
        <ProductDisplay products={filteredProducts} />
      ) : (
        <p className="text-center text-xl font-bold text-gray-700 mt-8">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductPage;