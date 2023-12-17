
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import {AuthContext} from '../../providers/AuthContext'


const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginUser] = useMutation(LOGIN_USER);
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    
    try {
      const { data: userData } = await loginUser({
        variables: { email, password },
      });
      
      // After successful login: Redirecting to the home page and storing user ID in local storage
      login(userData.loginUser.id);
      console.log(userData.loginUser.id)
      navigate('/home');

    } catch (error) {
      console.error('Error logging in:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect Credentials',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-md overflow-hidden ">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-b-lg sm:px-10 border border-gray-300 space-y-8">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="email"
              type="email"
              {...register('email')}
              className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              {...register('password')}
              className="block w-full h-10 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Password"
            />
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>
          </form>
            <div className="px-8 mt-0 flex flex-col gap-4">
              <div className="flex items-center px-2">
                <hr className="flex-1 border-gray-300 border-[1px]" />
                <div className="mx-4 label-text text-base font-medium">Or</div>
                <hr className="flex-1 border-gray-300 border-[1px]" />
              </div>

            </div>
            <p className="text-center px-8 pt-0 mt-4 pb-8">
              <span className="label-text text-base font-semibold">
                Do not have an account?
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
                >
                  Signup
                </Link>
              </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
