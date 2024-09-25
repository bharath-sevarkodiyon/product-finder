import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProductDisplay from './ProductDisplay';

const productsData = [
  { name: "Running Shoes", description: "Lightweight running shoes for all terrains.", price: "$89", location: "Sports Section - Aisle 3" },
  { name: "Yoga Mat", description: "Comfortable and eco-friendly yoga mat.", price: "$25", location: "Fitness Equipment - Aisle 5" },
  { name: "Tennis Racket", description: "Professional tennis racket for all players.", price: "$120", location: "Sports Section - Aisle 2" },
  { name: "Protein Powder", description: "High-quality whey protein powder.", price: "$45", location: "Nutrition Section - Aisle 8" },
  { name: "Dumbbells", description: "Set of adjustable dumbbells.", price: "$50", location: "Fitness Equipment - Aisle 4" },
  { name: "Basketball", description: "Official size basketball for indoor/outdoor use.", price: "$30", location: "Sports Section - Aisle 1" },
];

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = (searchTerm) => {
    const searchResults = productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  return (
    <div className="">
      <div className="z-10">
        <SearchBar onSearch={handleSearch} />
        <ProductDisplay products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;
