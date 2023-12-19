import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from "react";

//Type of rent duration
const RentDurationType = {
  PER_DAY: 'PER_DAY',
  PER_WEEK: 'PER_WEEK',
  PER_MONTH: 'PER_MONTH',
};

//Defining the mutation for Adding product to database
const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $category: [String!]!
    $description: String!
    $purchasePrice: Float!
    $rentPrice: Float!
    $rentDurationType: RentDurationType!
    $userId: Int!
  ) {
    addProduct(
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
      created_at
      userId
    }
  }
`;

const AddProduct = () => {
  const { userId } = useContext(AuthContext);
  const { register, handleSubmit, getValues } = useForm();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [formData, setFormData] = useState(null);

  
  const onSubmit = () => {
    setFormData(getValues()); // Storing form data when 'Add Product' is clicked
    setShowConfirmation(true);
  };

  //taking confirmation before submitting
  const confirmAndSubmit = async () => {
    const formValues = formData || getValues(); // Use stored data or current form data

    try {
      await addProduct({
        variables: {
          ...formValues,
          purchasePrice: parseFloat(formValues.purchasePrice), // Converting to numeric value
          rentPrice: parseFloat(formValues.rentPrice),
          userId: parseInt(userId),
        },
      });

      setShowConfirmation(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-2/3 md:w-full">
      <h2 className='font-bold text-center text-2xl'>Product Details</h2>
        <input
          type="text"
          {...register('title')}
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="text"
          {...register('category')}
          placeholder="Category"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <textarea
          {...register('description')}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        ></textarea>
        <input
          type="number"
          {...register('purchasePrice')}
          placeholder="Purchase Price"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="number"
          {...register('rentPrice')}
          placeholder="Rent Price"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <select
          {...register('rentDurationType')}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="PER_DAY">Per Day</option>
          <option value="PER_WEEK">Per Week</option>
          <option value="PER_MONTH">Per Month</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 block mx-auto w-full sm:w-auto"
        >
          Add Product
        </button>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <p>Title: {formData.title}</p>
            <p>Category: {formData.category}</p>
            <p>Description: {formData.description}</p>
            <p>Purchase Price: {formData.purchasePrice}</p>
            <p>Rent Price: {formData.rentPrice}</p>
            <p>Rent Duration Type: {formData.rentDurationType}</p>
            <button
              onClick={confirmAndSubmit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
