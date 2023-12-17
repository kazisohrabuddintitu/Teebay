
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthPorviders";


const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // SignIn code using Firebase func
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/myproducts");
      })
      .catch((error) => {
        console.log(error.message);
        // Show error message if User or Password is invalid accordingly
        if (
          error.message === "Firebase: Error (auth/user-not-found)." ||
          error.message === "Firebase: Error (auth/wrong-password)."
        ) {
          Swal.fire({
            icon: "error",
            title: "Invalid",
            text: "Email or Password is invalid!",
          });
        }
      });
  };

  return (
    <div className="mt-10 mb-10 px-3 md:px-0 flex justify-center">
      <div
        className=" max-w-5xl md:px-10 card border-slate-100 border drop-shadow-sm shadow-xl"
      >
        <div className="md:flex justify-evenly items-center md:gap-8 gap-3">
    
          <div className="card w-full max-w-md flex-1">
            <p className="text-3xl font-bold text-center card-body pb-5">
              Login
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body pb-6 pt-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    required
                    placeholder="Your email"
                    className="input input-bordered border-[1.8px] rounded-full border-green-500"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label ">
                    <span className="label-text text-base font-semibold">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      required
                      placeholder="Your password"
                      className="w-full border-[1.8px] border-green-500 input rounded-full pe-12"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-0 bottom-0 right-0 text-2xl px-2 pe-4 focus:outline-none"
                    >
                      {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600 mt-1">Password is required.</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600 mt-1">
                      Password must be 6 characters.
                    </p>
                  )}
                  <label className="label mt-2">
                    <a
                      href="#"
                      className="label-text-alt font-semibold text-sm link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn hover:bg-green-500 bg-green-400 text-black rounded-full font-bold px-6 normal-case text-lg border-0"
                  >
                    Login
                  </button>
                </div>
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
                  className="label-text-alt font-bold text-base link link-hover ps-2 text-green-500"
                >
                  Register Now!
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
