import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { AuthContext } from '../../providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useParams } from 'react-router-dom';


// Defining the mutation for editing a product
const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $title: String
    $category: [String]
    $description: String
    $purchasePrice: Float
    $rentPrice: Float
    $rentDurationType: String
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

const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
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

const EditProduct = () => {
    const {id} = useParams();
    const { userId } = useContext(AuthContext);
    const [editedProduct, setEditedProduct] = useState();
    
    const data = useQuery(GET_PRODUCT, {
        variables: { id: parseInt(id) },
    });
    console.log(data);
   
    const [editProduct] = useMutation(UPDATE_PRODUCT);

    useEffect(() => {
        if (data && data.product) {
            setEditedProduct(data.product);
        }
        }, [data]);
    

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await editProduct({
        variables: editedProduct,
        });
        console.log('Updated product:', data.editProduct);
    } catch (error) {
        console.error('Error updating product:', error.message);
    }
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
    <div>
        {editedProduct && (
                    <form onSubmit={handleSubmit}>
                    <label>
                    Title:
                    <input type="text" name="title" value={editedProduct.title} onChange={handleInputChange} />
                    </label>
                    <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={editedProduct.category.join(', ')}
                        onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value.split(', ') })}
                    />
                    </label>
                    <label>
                    Description:
                    <textarea
                        name="description"
                        value={editedProduct.description}
                        onChange={handleInputChange}
                    ></textarea>
                    </label>
                    <label>
                    Purchase Price:
                    <input
                        type="number"
                        name="purchasePrice"
                        value={editedProduct.purchasePrice}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Rent Price:
                    <input
                        type="number"
                        name="rentPrice"
                        value={editedProduct.rentPrice}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Rent Duration Type:
                    <input
                        type="text"
                        name="rentDurationType"
                        value={editedProduct.rentDurationType}
                        onChange={handleInputChange}
                    />
                    </label>
                    <button type="submit">Edit Product</button>
                </form>
        )}
    </div>

    );
};
    
export default EditProduct;