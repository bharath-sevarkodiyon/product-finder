import React, { useState, useEffect } from "react";
import '../App.css'

const StoreLayout = ({ selectedProduct }) => {
  const [storeLayout, setStoreLayout] = useState(null);
  const aisles = Array.from({ length: 121 }, (_, i) => i + 1);

  useEffect(() => {
    const savedLayout = localStorage.getItem('storeLayout');
    if (savedLayout) {
      setStoreLayout(JSON.parse(savedLayout));
    }
  }, []);

  const isCellSelected = (cellName) => {
    if (!storeLayout || !storeLayout.cellMappings[cellName]) return false;
    return storeLayout.cellMappings[cellName].includes(selectedProduct);
  };

  const isYouAreHereCell = (cellName) => {
    if (!storeLayout || !storeLayout.cellMappings[cellName]) return false;
    return storeLayout.cellMappings[cellName].includes("You are here");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold p-4">Avengers Store</h1>
      <div className="grid grid-cols-11 gap-y-2 gap-x-3 p-3">
        {aisles.map((aisle) => {
          const cellName = String.fromCharCode(65 + ((aisle - 1) % 11)) + Math.ceil(aisle / 11);
          const isSelected = isCellSelected(cellName);
          const showYouAreHere = isYouAreHereCell(cellName);

          return (
            <div
              key={`aisle-${aisle}`}
              className={`p-4 flex flex-col justify-center items-center transition ${
                isSelected ? "blinking-effect" : "bg-[#d2d2d2]"
              } cursor-pointer relative w-28 h-10`}
            >
              {/* <span className="text-xs absolute top-1 left-1 text-gray-600">{cellName}</span> */}
              {showYouAreHere && (
                <span className="text-xs font-semibold">You are Here</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreLayout;