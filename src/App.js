import React, { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import ProductPage from "./Components/ProductPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Location from "./Components/Location";
import AdminStoreLayout from "./Components/AdminStoreLayout";
import { data } from "./Components/data";

const AppContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  
  const productData = data;
  
  useEffect(() => {
    setProducts(productData);
    setFilteredProducts(productData);
  }, []);

  useEffect(() => {
    // Reset filteredProducts to show all products when on the home page
    if (location.pathname === '/') {
      setFilteredProducts(products);
    }
  }, [location, products]);

  // Function to handle product search
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const searchResults = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(searchResults);
    }
  };

  return (
    <>
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
        <Route path="/location/:productName" element={<Location />} />
        <Route path="/admin" element={<AdminStoreLayout />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <div className="bg-teal-100 min-h-screen">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
};

export default App;