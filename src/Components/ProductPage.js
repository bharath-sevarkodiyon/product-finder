import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCategory from "./ProductCategory"; // Component for displaying categories
import ProductDisplay from "./ProductDisplay";   // Component for displaying filtered products

const ProductPage = ({ searchedProducts }) => {
  const [products, setProducts] = useState([]);          // All products
  const [filteredProducts, setFilteredProducts] = useState([]);  // Products filtered by category or search
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track the selected category

  useEffect(() => {
    // Fetch both products and categories data when the component mounts
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch product categories
        const categoryResponse = await axios.get("http://localhost:5000/api/productCategory");
        const categoriesData = categoryResponse.data;

        // Create a map of category IDs to category names
        const categoryMap = {};
        categoriesData.forEach((category) => {
          categoryMap[category._id] = category.categoryName;
        });

        // Fetch product data
        const productResponse = await axios.get("http://localhost:5000/api/product");
        const productsData = productResponse.data;

        // Map each product's `product_category` ObjectId to its category name
        const mappedProducts = productsData.map((product) => {
          return {
            ...product,
            categoryName: categoryMap[product.product_category] || "Unknown Category",
          };
        });

        // Set products and filteredProducts to show all products by default
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts); // Set all products initially to be displayed
      } catch (error) {
        console.error("Error fetching products and categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    // Combine search and category filtering logic

    let tempProducts = [...products];

    // First apply search filter if searchedProducts exists
    if (searchedProducts) {
      tempProducts = searchedProducts;
    }

    // Then apply category filter, unless "All" is selected
    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(
        (product) => product.categoryName === selectedCategory
      );
    }

    setFilteredProducts(tempProducts);
  }, [searchedProducts, selectedCategory, products]);

  // Handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      {/* ProductCategory component allows category selection */}
      <ProductCategory onCategorySelect={handleCategorySelect} />

      {/* Conditionally display either the products or a 'no products found' message */}
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
