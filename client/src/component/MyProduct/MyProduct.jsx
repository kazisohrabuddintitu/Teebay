import React, { useContext, useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import {AuthContext} from '../../providers/AuthContext'
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

//Defining the mutation to delete product
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

//Defining the mutation for getting all products of specific user
const GET_USER_PRODUCTS = gql`
  query GetUserProducts($userId: Int!) {
    products(userId: $userId) {
      id
      title
      category
      description
      purchasePrice
      rentPrice
      rentDurationType
      created_at
    }
  }
`;

//MyProduct function
const MyProduct = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [fullDescriptions, setFullDescriptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  // Fetching user's products using the GET_USER_PRODUCTS query
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS, {
    variables: { userId: parseInt(userId) },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const products = data.products;

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
  
  //Redirect to Edit Product page with product 
  const handleProductClick = (productId) => {
    const selectedProduct = data.products.find((product) => product.id === productId);
    navigate('/editproduct', { state: { selectedProduct } });
  };
  
  //Handle the delete event
  const handleDeleteClick = (productId, event) => {
    // Prevent propagation to the parent element
    event.stopPropagation();
    setProductIdToDelete(productId);
    setShowDeleteConfirmation(true);
  };

  //Delete confirmation execute
  const handleConfirmDelete = async () => {
    try {
      const { data } = await deleteProduct({
        variables: { id: parseInt(productIdToDelete) },
      });
      navigate('/myproducts');
      if (data && data.deleteProduct && data.deleteProduct.id) {
        console.log('Product deletion status:', data.deleteProduct.id);
        // Do something with the deleted product ID if needed
      } else {
        console.log('No response data received for deleteProduct');
      }
      
      setShowDeleteConfirmation(false);
      window.location.reload();
      setProductIdToDelete(null);
      
    } catch (error) {
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Product Deleted Successfully',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });      
    }
  };

  //handle the cancle method if don't want to do delete
  const handleCancelDelete = () => {
    // Hide the confirmation dialog without performing deletion
    setShowDeleteConfirmation(false);
    setProductIdToDelete(null);
  };

  return (
    <div className="mx-auto w-4/5 justify-between items-center">
      <h2 className="text-center text-3xl font-bold mt-8">MY PRODUCTS</h2>
        {products.map((product) => (
          <div
          key={product.id}
          className="border border-gray-300 rounded p-4 my-4"
          onClick={() => handleProductClick(product.id)} // Clicking on the box triggers navigation
          >
            <div className="border border-gray-300 rounded p-4 my-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{product.title}</h2>
                <div onClick={(e) => handleDeleteClick(product.id, e)}>
                  <FaTrash className="text-black cursor-pointer" />
                </div>
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
      {/* Add confirmation dialog */}
      {showDeleteConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md text-center">
              <p>Are you sure you want to delete this product?</p>
              <div>
                <button onClick={handleConfirmDelete} className="bg-red-500 text-white px-4 py-2 mx-2 rounded">
                  Confirm
                </button>
                <button onClick={handleCancelDelete} className="bg-gray-300 px-4 py-2 mx-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
      )}
      <button className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">
        <Link to="/addproduct">Add Product</Link>
      </button>
    </div>
  );
  
};


export default MyProduct;