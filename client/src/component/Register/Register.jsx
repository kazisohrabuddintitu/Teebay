import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import client from '../../main';
import Swal from 'sweetalert2';

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $address: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      address: $address
      email: $email
      phoneNumber: $phoneNumber
      password: $password
    ) {
      id
      firstName
      lastName
      address
      email
      phoneNumber
      password
    }
  }
`;

function SignUp() {
  const [createUser] = useMutation(CREATE_USER);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { firstName, lastName, address, email, phoneNumber, password, confirmPassword } = data;
  
    if (password !== confirmPassword) {
      // SweetAlert for password mismatch
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }
  
    // Create a new object without confirmPassword
    const userDataWithoutConfirmPassword = { firstName, lastName, address, email, phoneNumber, password };
  
    try {
      const { data: userData } = await createUser({
        variables: userDataWithoutConfirmPassword,
      });
  
      // If user creation is successful
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User created successfully.',
      });
      console.log('User created:', userData.createUser);
  
    } catch (error) {
      // If an error occurs during user creation
      if (error.message.includes('email already exists')) {
        // SweetAlert for existing email
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already exists!',
        });
      } else {
        // Generic error message
        console.error('Error creating user:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already exists!',
        });
      }
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-md overflow-hidden ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-b-lg sm:px-10 border border-gray-300">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 ">
              <input
                name="firstName"
                type="text"
                {...register('firstName')}
                className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="First Name"
              />
              <input
                name="lastName"
                type="text"
                {...register('lastName')}
                className="block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Last Name"
              />
            </div>
            <input
              name="address"
              type="text"
              {...register('address')}
              className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Address"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                {...register('email')}
                className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Email"
              />
              <input
                name="phoneNumber"
                type="text"
                {...register('phoneNumber')}
                className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Phone Number"
              />
            </div>
            <input
              name="password"
              type="password"
              {...register('password')}
              className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Password"
            />
            <input
              name="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Confirm Password"
            />
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                REGISTER
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm">
            Already have an account?
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 px-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

