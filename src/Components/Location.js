import React, { useState, useEffect } from 'react';
import StoreLayout from './StoreLayout'; // Import the default component
import { useParams } from 'react-router-dom';

const Location = () => {
  const [userPosition, setUserPosition] = useState('entrance');
  const { productName } = useParams();
  const product = useParams()
  const targetPosition = 'right-3';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserPosition(targetPosition);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [targetPosition]);

  return (
    <div>
      <StoreLayout selectedProduct={productName} userPosition={userPosition} targetPosition={targetPosition} />
      {/* <h1 className='text-center'>Store Pathfinding: Entrance to Right 3rd Row</h1> */}
    </div>
  );
};

export default Location;