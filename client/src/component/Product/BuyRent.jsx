import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { AuthContext } from '../../providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";


// const BuyRent = () => {
//   const { selectedProduct } = useLocation().state;
//   const [fullDescription, setFullDescription] = useState(false);

//   // Function to toggle description display
//   const handleShowFullDescription = () => {
//     setFullDescription(!fullDescription);
//   };


//   if (!selectedProduct) {
//     return (
//       <div>
//         <p>No product selected.</p>
//         <Link to="/home">Go back to Home</Link>
//       </div>
//     );
//   }

//   const { title, category, purchasePrice, rentPrice, rentDurationType, description, created_at } = selectedProduct;

//   return (
//     <div className="mx-auto w-4/5 md:w-3/5 justify-between items-center">
//       <div className="p-4 my-4">
//         <div className=" p-4 my-4 md:pb-20 pb-10">
//           <div className="flex justify-between items-center">
//             <h1 className="font-bold text-3xl">{title}</h1>
//           </div>
//           <p className="text-lg">Categories: {category.join(', ')}</p>
//           <p className="text-lg pb-1">
//             Price: ${purchasePrice} | Rent: ${rentPrice} {rentDurationType}
//           </p>
//           <p className="text-lg pb-1">
//             Description: {fullDescription || description.length <= 100 ? (
//               description
//             ) : (
//               <>
//                 {description}
//                 <span
//                   className="text-blue-500 cursor-pointer"
//                   onClick={handleShowFullDescription}
//                 >
//                   Less Details
//                 </span>
//               </>
//             )}
//           </p>
//         </div>
//         <div className="flex justify-end gap-6">
//           <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded mr-2">
//             Rent
//           </button>
//           <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
//             Buy
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default BuyRent;


// Defining the mutation for Rental Data
const CONFIRM_RENT = gql`
  mutation ConfirmRent($id: Int!, $rentStartDate: String!, $rentEndDate: String!, $rentedById: Int!) {
    confirmRent(id: $id, rentStartDate: $rentStartDate, rentEndDate: $rentEndDate, rentedById: $rentedById) {
      id
      title
      rentStartDate
      rentEndDate
      isRented
      isAvailableForRent
      rentedById
    }
  }
`;

//Mutation for Buying
const CONFIRM_BUY = gql`
  mutation ConfirmBuy($id: Int!) {
    confirmBuy(id: $id) {
      id
      isAvailableForSale
      isSold
    }
  }
`;

const BuyRent = () => {
  const { selectedProduct } = useLocation().state;
  const [fullDescription, setFullDescription] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation2, setShowConfirmation2] = useState(false);
  const { userId } = useContext(AuthContext);
  
  // Initialize the useMutation hook
  const [confirmRentMutation] = useMutation(CONFIRM_RENT);
  const [confirmBuyMutation] = useMutation(CONFIRM_BUY);

  //Product description show
  const handleShowFullDescription = () => {
    setFullDescription(!fullDescription);
  };
  
  //returning true if owner of the product
  const isProductOwner = selectedProduct?.userId === parseInt(userId);

  const handleRentClick = () => {
    setShowConfirmation(true);
  };

  const handleBuyClick = () => {
    setShowConfirmation2(true);
  };

  //Handling Rental data from fields to store in database
  const handleConfirmRent = async () => {
    try {
    
      // mutation call
      const { data } = await confirmRentMutation({
        variables: {
          id: selectedProduct.id,
          rentStartDate: document.getElementById('fromDate').value,
          rentEndDate: document.getElementById('toDate').value,
          rentedById: parseInt(userId),
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Product Rented Successfully',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      setShowConfirmation(false); // Close the confirmation modal
    } catch (error) {

      console.error('Error confirming rent:', error);
    }
  };

  //Handling buying data store in database
  const handleConfirmBuy = async () => {
    try {
      const { data } = await confirmBuyMutation({
        variables: {
          id: selectedProduct.id, // Assuming you have selectedProduct.id defined
        },
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Product Bought Successfully',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      setShowConfirmation2(false);
    } catch (error) {
      console.error('Error confirming buy:', error);
      // Handle error: display an error message or handle the error appropriately
    }
  };

  const handleCancelRent = () => {
    setShowConfirmation(false);
  };
  const handleCancelBuy = () => {
    setShowConfirmation2(false);
  };

  if (!selectedProduct) {
    return (
      <div>
        <p>No product selected.</p>
        <Link to="/home">Go back to Home</Link>
      </div>
    );
  }

  
  const { title, category, purchasePrice, rentPrice, rentDurationType, description, created_at } = selectedProduct;

  return (
    <div className="mx-auto w-4/5 md:w-3/5 justify-between items-center">
      <div className="p-4 my-4">
        <div className=" p-4 my-4 md:pb-20 pb-10">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">{title}</h1>
          </div>
          <p className="text-sm">Categories: {category.join(', ')}</p>
          <p className="text-sm pb-1">
            Price: ${purchasePrice} | Rent: ${rentPrice} {rentDurationType}
          </p>
          <p className="text-lg pb-1">
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
        </div>
        <div className="flex justify-end gap-6">
         {!isProductOwner && ( // Conditionally rendering the buttons based on ownership
            <>
              <button onClick={handleRentClick} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded mr-2">
                Rent
              </button>
              <button onClick={handleBuyClick} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
                Buy
              </button>
            </>
          )}
        </div>
        {/* Confirmation for Renting */}
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md text-center">
              <h1 className='text-left pb-5 text-2xl'>Rental period</h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pb-5 pt-5">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="fromDate" className="text-left font-bold text-sm">From</label>
                    <input
                      type="date"
                      id="fromDate"
                      className="border border-gray-300 rounded py-1 px-3 w-full"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="toDate" className="text-left font-bold text-sm">To</label>
                    <input
                      type="date"
                      id="toDate"
                      className="border border-gray-300 rounded py-1 px-3 w-full"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
              </div>
              <div className="flex justify-end mt-5 md:mt-10">
                <button onClick={handleCancelRent} className="bg-red-600 text-white px-4 py-2 mx-2 rounded">
                  Go Back
                </button>
                <button onClick={handleConfirmRent} className="bg-indigo-600 text-white px-4 py-2 mx-2 rounded">
                  Confirm Rent
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation for Buying */}
        {showConfirmation2 && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md text-center">
              <h1 className='text-left pb-5 text-2xl'>Are you sure you want to buy this product?</h1>
              
              <div className="flex justify-end mt-5 md:mt-10">
                <button onClick={handleCancelBuy} className="bg-red-600 text-white px-4 py-2 mx-2 rounded">
                  No
                </button>
                <button onClick={handleConfirmBuy} className="bg-indigo-600 text-white px-4 py-2 mx-2 rounded">
                  Yes
                </button>
              </div>
            </div>      
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyRent;