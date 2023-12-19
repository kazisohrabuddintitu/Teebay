import React, { useContext, useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import {AuthContext} from '../../providers/AuthContext'
import { Link, useParams } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const GET_ALL_PRODUCTS = gql`
  query {
    allproducts {
      id
      title
      category
      description
      purchasePrice
      rentPrice
      rentDurationType
      userId
      created_at
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [fullDescriptions, setFullDescriptions] = useState({});
  
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleProductClick = (productId) => {
    const selectedProduct = data.allproducts.find(product => product.id === productId);
    navigate('/buyrent', { state: { selectedProduct } });
  };

  //Description showing handle
  const handleShowFullDescription = (productId, description) => {
    const updatedDescriptions = { ...fullDescriptions };
    updatedDescriptions[productId] = !updatedDescriptions[productId];
    setFullDescriptions(updatedDescriptions);
  };

  //converting String type to DateTime
  const formatDate = (rawDate) => {
    const date = new Date(parseInt(rawDate, 10));
    date.setDate(date.getDate() - 1);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  return (
      <div className="mx-auto w-3/5 justify-between items-center">
        <h2 className="text-center text-3xl font-bold mt-8">All PRODUCTS</h2>
        {data.allproducts.map((product) => (
          <div
          key={product.id}
          className="border border-gray-300 rounded p-4 my-4"
          onClick={() => handleProductClick(product.id)}// Clicking on the box triggers navigation
          >
          <div className="border border-gray-300 rounded p-4 my-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">{product.title}</h2>
            </div>
            <p className="text-xs">
              Categories: {product.category.join(', ')}
            </p>
            <p className="text-xs pb-1">
              Price: ${product.purchasePrice} | Rent: ${product.rentPrice} {product.rentDurationType}
            </p>
            <p className="text-xs pb-1">
              Description: {fullDescriptions[product.id] || product.description.length <= 100 ? (
                product.description
              ) : (
                <>
                  {product.description}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleShowFullDescription(product.id, product.description)}
                  >
                    Less Details
                  </span>
                </>
              )}
            </p>
            <p className="text-xs">Date posted: {formatDate(product.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Home;
