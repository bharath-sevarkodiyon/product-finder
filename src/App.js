import React, { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import ProductDisplay from "./Components/ProductDisplay";
import ProductCategory from "./Components/ProductCategory";
import axios from "axios";
import ProductPage from "./Components/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Location from "./Components/Location";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Fetch both products and categories data when the component mounts
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch product categories
        const categoryResponse = await axios.get(
          "http://localhost:5000/api/productCategory"
        );
        const categoriesData = categoryResponse.data;

        // Create a map of category IDs to category names
        const categoryMap = {};
        categoriesData.forEach((category) => {
          categoryMap[category._id] = category.categoryName;
        });

        // Fetch product data
        const productResponse = await axios.get(
          "http://localhost:5000/api/product"
        );
        const productsData = productResponse.data;

        // Map each product's `product_category` ObjectId to its category name
        const mappedProducts = productsData.map((product) => {
          return {
            ...product,
            categoryName:
              categoryMap[product.product_category] || "Unknown Category",
          };
        });

        // Set the mapped products in the state
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
        setCategories(categoryMap);
      } catch (error) {
        console.error("Error fetching products and categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Function to handle product search
  const handleSearch = (searchTerm) => {
    const searchResults = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  return (
    <div className="bg-teal-50 min-h-screen">
      {/* Wrap everything inside the BrowserRouter */}
      <BrowserRouter>
        {/* You can use Routes to define paths */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <ProductPage searchedProducts={filteredProducts} />
              </>
            }
          />
          {/* Define other routes like /location */}
          <Route path="/location/:productName" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;



// App.jsx
// import React, { useState, useEffect } from 'react';
// import StoreLayout from './Components/Map/StoreLayout'; // Import the default component
// import './Components/Map/StoreLayout.css';  // Import CSS file if required

// const App = () => {
//   const [userPosition, setUserPosition] = useState('entrance');
//   const targetPosition = 'right-3';

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setUserPosition(targetPosition);
//     }, 2000);
//     return () => clearTimeout(timeout);
//   }, [targetPosition]);

//   return (
//     <div>
//       <StoreLayout userPosition={userPosition} targetPosition={targetPosition} />
//       {/* <h1 className='text-center'>Store Pathfinding: Entrance to Right 3rd Row</h1> */}
//     </div>
//   );
// };

// export default App;