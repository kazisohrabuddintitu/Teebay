
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// // import { useForm } from "react-hook-form";
// import { useContext } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// // import { AuthContext } from "../../providers/AuthPorviders";
// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// // import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// const SIGN_UP = gql`
//   mutation SignUp(
//     $firstName: String!
//     $lastName: String!
//     $address: String!
//     $email: String!
//     $phoneNumber: String!
//     $password: String!
//   ) {
//     createUser(
//       firstName: $firstName
//       lastName: $lastName
//       address: $address
//       email: $email
//       phoneNumber: $phoneNumber
//       password: $password
//     ) {
//       id
//       firstName
//       lastName
//     }
//   }
// `;


// function SignUp() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//   });

//   const [signUp, { loading, error }] = useMutation(SIGN_UP);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prevVisible) => !prevVisible);
//   };
//   const [passwordVisible2, setPasswordVisible2] = useState(false);
//   const togglePasswordVisibility2 = () => {
//     setPasswordVisible2((prevVisible) => !prevVisible);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await signUp({ variables: formData });
//       console.log('User created:', data.createUser);
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mt-10 mb-10 px-3 md:px-0  flex justify-center">
//       <div className="max-w-5xl md:px-10 card border-slate-100 border drop-shadow-sm shadow-xl">
//          <div className="md:flex justify-evenly items-center md:gap-8 gap-3">
//            <div className="card w-full max-w-md flex-1">
//              <p className="text-3xl font-bold text-center card-body pb-5">
//                Sign Up
//              </p>
//                <div className="card-body pb-5 pt-5">
//                  <div className="form-control">
//                    <label className="label">
//                      <span className="label-text text-base font-semibold">
//                       First Name
//                      </span>
//                    </label>
//                    <input
//                       type="text"
//                       name="firstName"
//                       placeholder="First Name"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="input input-bordered border-[1.8px] rounded-full border-green-500"
//                     />
//                    {errors.name && (
//                      <span className="text-red-600 mt-1">Name is required.</span>
//                    )}
//                  </div>

//                  <div className="form-control">
//                    <label className="label">
//                      <span className="label-text text-base font-semibold">
//                        Last Name
//                      </span>
//                    </label>
//                    <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       placeholder="Last Name"
//                       className="input input-bordered border-[1.8px] rounded-full border-green-500"
//                     />
//                    {errors.address && (
//                      <p className="text-red-600 mt-1">Address is required.</p>
//                    )}
//                  </div>

//                  <div className="form-control flex-1 mr-2">
//                   <label className="label">
//                     <span className="label-text text-base font-semibold">Address</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     className="input input-bordered border-[1.8px] rounded-full border-green-500"
//                   />
//                   {errors.email && (
//                     <span className="text-red-600 mt-1">Email is required.</span>
//                   )}
//                 </div>
//                 <div className="form-control flex-1 ml-2">
//                   <label className="label">
//                     <span className="label-text text-base font-semibold">
//                       Phone Number
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     placeholder="Phone Number"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     className="input input-bordered border-[1.8px] rounded-full border-green-500"
//                   />
//                   {errors.phoneNumber && (
//                     <span className="text-red-600 mt-1">
//                       Phone Number is required.
//                     </span>
//                   )}
//                 </div>
//                  <div className="form-control">
//                    <label className="label ">
//                      <span className="label-text text-base font-semibold">
//                        Password
//                      </span>
//                    </label>
//                    <div className="relative">
//                      <input
//                        type={passwordVisible ? "text" : "password"}
//                        name="password"
//                        value={formData.password}
//                        onChange={handleChange}
//                        placeholder="Password"
//                        className="w-full border-[1.8px] border-green-500 input rounded-full pe-12"
//                      />
//                      <button
//                        type="button"
//                        onClick={togglePasswordVisibility}
//                        className="absolute top-0 bottom-0 right-0 text-2xl px-2 pe-4 focus:outline-none"
//                      >
//                        {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
//                      </button>
//                    </div>
//                    {errors.password?.type === "required" && (
//                      <p className="text-red-600 mt-1">Password is required.</p>
//                    )}
//                  </div>
//                  <div className="form-control">
//                    <label className="label ">
//                      <span className="label-text text-base font-semibold">
//                        Confirm Password
//                      </span>
//                    </label>
//                    <div className="relative">
//                      <input
//                        type={passwordVisible2 ? "text" : "password"}
//                        name="confirmPassword"
//                        value={formData.confirmpassword}
//                        onChange={handleChange}
//                        placeholder="Confirm Password"
//                        className="w-full border-[1.8px] border-green-500 input rounded-full pe-12"
//                      />
//                      <button
//                        type="button"
//                        onClick={togglePasswordVisibility2}
//                        className="absolute top-0 bottom-0 right-0 text-2xl px-2 pe-4 focus:outline-none"
//                      >
//                        {passwordVisible2 ? (
//                          <AiFillEyeInvisible />
//                        ) : (
//                          <AiFillEye />
//                        )}
//                      </button>
//                    </div>
//                  </div>
//                  <div className="form-control mt-8">
//                    <button
//                      type="submit"
//                      className="btn hover:bg-green-500 bg-green-400 text-black rounded-full font-bold px-6 normal-case text-lg border-0"
//                    >
//                      REGISTER
//                    </button>
//                  </div>
//                </div>
//              <div className="px-8 mt-0 flex flex-col gap-4">
//                <div className="flex items-center px-2">
//                  <hr className="flex-1 border-gray-300 border-[1px]" />
//                  <div className="mx-4 label-text text-base font-medium">Or</div>
//                  <hr className="flex-1 border-gray-300 border-[1px]" />
//                </div>
//              </div>

//              <p className="text-center px-8 pt-0 mt-4 pb-8">
//                <span className="label-text text-base font-semibold">
//                  Already have an account?
//                  <Link
//                    to="/login"
//                    className="label-text-alt font-bold text-base link link-hover ps-2 text-green-500"
//                  >
//                    Sign in
//                  </Link>
//                </span>
//              </p>
//            </div>
//          </div>
//        </div>
//      </div>
//     </form>
//   );
// }

// export default SignUp;


import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $address: String!
    $password: String!
  ) {
    createUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
        address: $address
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
      phoneNumber
      address
      password
    }
  }
`;

function SignUp() {
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // form data
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber');
    const address = formData.get('address');
    const password = formData.get('password');

    try {
      // Perform GraphQL mutation
      const { data } = await createUser({
        variables: { firstName, lastName, email, phoneNumber, address, password},
      });
      console.log('User created:', data.createUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    
    <div className="mt-10 mb-10 px-3 md:px-0  flex justify-center">
      <div className="max-w-5xl md:px-10 card border-slate-100 border drop-shadow-sm shadow-xl">
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" />
          <input type="text" name="address" placeholder="Address" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">REGISTER</button>
        </form>
      </div>
      <p className="text-center px-8 pt-0 mt-4 pb-8">
        <span className="label-text text-base font-semibold">
          Already have an account?
          <Link
            to="/login"
            className="label-text-alt font-bold text-base link link-hover ps-2 text-green-500"
          >
            Login!
          </Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
