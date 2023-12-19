import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { AuthContext } from '../../providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


//Type of rent duration
const RentDurationType = {
  PER_DAY: 'PER_DAY',
  PER_WEEK: 'PER_WEEK',
  PER_MONTH: 'PER_MONTH',
};

// Defining the mutation for editing a product
const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $title: String
    $category: [String]
    $description: String
    $purchasePrice: Float
    $rentPrice: Float
    $rentDurationType: RentDurationType
    $userId: Int
  ) {
    editProduct(
      id: $id
      title: $title
      category: $category
      description: $description
      purchasePrice: $purchasePrice
      rentPrice: $rentPrice
      rentDurationType: $rentDurationType
      userId: $userId
    ) {
      id
      title
      category
      description
      purchasePrice
      rentPrice
      rentDurationType
      userId
    }
  }
`;

//Implementation of EditProduct Fuction
const EditProduct = () => {
    const {id} = useParams();
    const { userId } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedProduct } = location.state;
    const [editedProduct, setEditedProduct] = useState(selectedProduct || {
      title: '',
      category: [],
      description: '',
      purchasePrice: 0,
      rentPrice: 0,
      rentDurationType: '',
      userId: userId,
    });
    
    const [editProduct] = useMutation(UPDATE_PRODUCT);
    
    useEffect(() => {
      if (selectedProduct) {
        setEditedProduct(selectedProduct);
      }
    }, [selectedProduct]);
    
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    };
  
    //handling the form value change
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedProduct = { ...selectedProduct, ...editedProduct };
        const { data } = await editProduct({
          variables: updatedProduct,
        });
        console.log('Updated product:', data.editProduct);
        navigate('/myproducts');
      } catch (error) {
        console.error('Error updating product:', error.message);
      }
    };
      
    return (
        <div className="mx-auto md:w-2/5 w-2/3 justify-between items-center pt-10">
          {editedProduct && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
              <div className="flex flex-col">
                <label className="mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editedProduct.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={editedProduct.category ? editedProduct.category.join(', ') : ''}
                  onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value.split(', ') })}
                  className="border border-gray-300 p-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Description:</label>
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-1"
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col flex-1 md:mr-4">
                  <label className="mb-1">Purchase Price:</label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={editedProduct.purchasePrice}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-1"
                  />
                </div>
                <div className="flex flex-col flex-1 md:mr-4">
                  <label className="mb-1">Rent Price:</label>
                  <input
                    type="number"
                    name="rentPrice"
                    value={editedProduct.rentPrice}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-1"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="mb-1">Rent Duration Type:</label>
                  <select
                    name="rentDurationType"
                    value={editedProduct.rentDurationType}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-1"
                  >
                    <option value="PER_DAY">Per Day</option>
                    <option value="PER_WEEK">Per Week</option>
                    <option value="PER_MONTH">Per Month</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded md:w-2/6 w-3/5 mt-4 md:mt-0"
                >
                  Edit Product
                </button>
              </div>
            </form>
          )}
        </div>
    );
};
    
export default EditProduct;