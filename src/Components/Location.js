import React from 'react';
import StoreLayout from './StoreLayout'; // Import the default component
import { useParams } from 'react-router-dom';

const Location = () => {
  const { productName } = useParams();

  return (
    <div className='bg-teal-50 h-screen'>
      <StoreLayout selectedProduct={productName}/>
    </div>
  );
};

export default Location;