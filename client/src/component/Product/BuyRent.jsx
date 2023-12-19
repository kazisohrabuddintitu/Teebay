import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { AuthContext } from '../../providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const BuyRent = () => {
  const { selectedProduct } = useLocation().state;
  const [fullDescription, setFullDescription] = useState(false);

  // Function to toggle description display
  const handleShowFullDescription = () => {
    setFullDescription(!fullDescription);
  };

  // Function to format date
  const formatDate = (rawDate) => {
    const date = new Date(parseInt(rawDate, 10));
    date.setDate(date.getDate() - 1);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  if (!selectedProduct) {
    // If there's no selected product, show a message or navigate back to the home page
    return (
      <div>
        <p>No product selected.</p>
        <Link to="/home">Go back to Home</Link>
      </div>
    );
  }

  const { title, category, purchasePrice, rentPrice, rentDurationType, description, created_at } = selectedProduct;

  return (
    <div className="mx-auto w-4/5 justify-between items-center">
      <div className="p-4 my-4">
        <div className="border border-gray-300 rounded p-4 my-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">{title}</h2>
          </div>
          <p className="text-xs">Categories: {category.join(', ')}</p>
          <p className="text-xs pb-1">
            Price: ${purchasePrice} | Rent: ${rentPrice} {rentDurationType}
          </p>
          <p className="text-xs pb-1">
            Description: {fullDescription || description.length <= 100 ? (
              description
            ) : (
              <>
                {description}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleShowFullDescription}
                >
                  Less Details
                </span>
              </>
            )}
          </p>
          <p className="text-xs">Date posted: {formatDate(created_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyRent;
