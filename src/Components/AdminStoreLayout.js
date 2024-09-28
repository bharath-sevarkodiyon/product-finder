import React, { useState, useEffect } from "react";
import { data } from "./data"; // Assuming 'data' contains the available products.

const getCellName = (colIndex, rowIndex) => {
  const columnName = String.fromCharCode(65 + colIndex);
  return `${columnName}${rowIndex + 1}`;
};

const AdminStoreLayout = () => {
  const initialStoreLayout = {
    products: [...data, { productName: "You are here" }], // Added "You are here" to the products list
    cellMappings: {},
  };

  const [storeLayout, setStoreLayout] = useState(initialStoreLayout);
  const [showModal, setShowModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");

  const rows = 11;
  const columns = 11;

  useEffect(() => {
    const savedLayout = localStorage.getItem("storeLayout");
    if (savedLayout) {
      setStoreLayout(JSON.parse(savedLayout));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storeLayout", JSON.stringify(storeLayout));
  }, [storeLayout]);

  const handleCellClick = (cellName) => {
    setSelectedCell(cellName);
    setSelectedProducts(storeLayout.cellMappings[cellName] || []);
    setShowModal(true);
  };

  const handleAddProduct = () => {
    if (!newProductName.trim()) {
      alert("Please select a valid product.");
      return;
    }

    // Check if the product is already mapped
    const isProductMapped = Object.values(storeLayout.cellMappings).some(
      (products) => products.includes(newProductName)
    );

    if (isProductMapped) {
      alert(`Product "${newProductName}" is already assigned to a cell.`);
      return;
    }

    const updatedProducts = [...selectedProducts, newProductName];

    setStoreLayout((prevLayout) => ({
      ...prevLayout,
      cellMappings: {
        ...prevLayout.cellMappings,
        [selectedCell]: updatedProducts,
      },
    }));

    setSelectedProducts(updatedProducts);
    setNewProductName("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducts([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold p-4">Admin Store Layout</h1>
      <div className="grid grid-cols-11 gap-2 p-3 bg-gray-100">
        {Array.from({ length: rows * columns }).map((_, index) => {
          const rowIndex = Math.floor(index / columns);
          const colIndex = index % columns;
          const cellName = getCellName(colIndex, rowIndex);
          return (
            <div
              key={cellName}
              className={`border border-gray-400 p-2 flex justify-center items-center 
                ${
                  storeLayout.cellMappings[cellName]
                    ? "bg-green-300"
                    : "bg-lime-300"
                }
                hover:bg-blue-400 cursor-pointer`}
              onClick={() => handleCellClick(cellName)}
            >
              {cellName}
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Edit Cell: {selectedCell}
              </h2>
              <div>
                <h3 className="font-semibold">Products in this cell:</h3>
                {selectedProducts.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {selectedProducts.map((product, i) => (
                      <li key={i} className="text-lg">
                        {product}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No products added yet.</p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="productSelect"
                  className="block font-semibold mb-2"
                >
                  Available Products:
                </label>
                <select
                  id="productSelect"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select a product</option>
                  {storeLayout.products.map((product) => (
                    <option
                      key={product.productName}
                      value={product.productName}
                    >
                      {product.productName}
                    </option>
                  ))}
                </select>
                <div className="flex justify-around mt-3">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoreLayout;
