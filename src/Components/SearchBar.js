import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className='flex items-center justify-center pt-7'>
      <div className="rounded-lg p-8 ml-6 mr-6 w-full mb-8 bg-[#424242] shadow-lg shadow-indigo-500/40">
        {/* <h1 className="text-2xl font-bold mb-6 text-white">Find Your Product</h1> */}
        <div className="relative">
          <input
            type="text"
            id="productInput"
            className="block w-full px-12 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#AE43FF] text-lg text-[#2C2C2C] bg-gray-100"
            placeholder="Enter product name..."
            onInput={(e) => onSearch(e.target.value)}
          />
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#AE43FF]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
