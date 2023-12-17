import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../../hooks/useTitle";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BiInfoCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Registration = () => {
  useTitle("Sing Up");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingUser(true);
    const result = await axiosPublic.get(`/user/${data.email}`);
    if (result.data?.isDelete) {
      toast.error("Account has been registered", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const userInfo = {
        email: data.email,
        password: data.password,
        date: new Date(),
        try: "login failed",
      };
      // logger info
      axiosPublic.post("/logger", userInfo).then((res) => {
        console.log(res.data.insertedId);
      });
      setLoadingUser(false);
      return;
    }

    const userInfo = {
      name: data.name,
      email: data.email,
      photo: data.photoUrl,
      password: data.password,
      role: data.category,
      date: new Date(),
    };
    // logger info
    axiosPublic.post("/logger", userInfo).then((res) => {
      console.log(res.data.insertedId);
    });

    // create user
    axiosPublic.post("/registration", userInfo).then((res) => {
      if (res.data.insertedId) {
        createUser(data.email, data.password)
          .then(() => {
            updateUserProfile(data.name, data.photoUrl)
              .then(() => {
                reset();
                setLoadingUser(false);
                toast.success("Registration Success");
                navigate("/");
              })
              .catch((error) => {
                toast.error(error.message);
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  if (loadingUser) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p>Loading....</p>
        {/* <RotatingLines
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          width="36"
          visible={true}
        /> */}
      </div>
    );
  }

  return (
    <div className="mb-20 flex items-center">
      <div className="w-full sm:w-[550px] h-[800px] border px-12 flex flex-col justify-center mx-auto">
        <div className="">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to create account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            ALready a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-[#FF3811]"
            >
              Login to your account
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="type"
                className="block font-medium leading-6 text-gray-900"
              >
                Account Type
              </label>
              <div className="flex justify-between items-center gap-2 mt-2">
                <select
                  {...register("category", { required: true })}
                  className="input input-bordered focus:outline-none flex-1"
                  defaultValue="seeker"
                >
                  <option value="seeker">Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("name", { required: true })}
                  type="name"
                  placeholder="Type here"
                  className={`rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4 ${
                    errors.name ? "border border-red-600" : "input-bordered"
                  } focus:outline-none w-full`}
                />
                {errors.name && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 text-xl flex items-center pr-3 cursor-pointer"
                  >
                    <BiInfoCircle className="text-2xl text-red-600" />
                  </button>
                )}
              </div>
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Type here"
                  className={`rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4 ${
                    errors.email ? "border border-red-600" : "input-bordered"
                  } focus:outline-none w-full`}
                />
                {errors.email && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 text-xl flex items-center pr-3 cursor-pointer"
                  >
                    <BiInfoCircle className="text-2xl text-red-600" />
                  </button>
                )}
              </div>
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Photo URL
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("photoUrl", { required: true })}
                  type="text"
                  placeholder="Photo URL"
                  className={`rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4 ${
                    errors.photoUrl ? "border border-red-600" : "input-bordered"
                  } focus:outline-none w-full`}
                />
                {errors.photoUrl && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 text-xl flex items-center pr-3 cursor-pointer"
                  >
                    <BiInfoCircle className="text-2xl text-red-600" />
                  </button>
                )}
              </div>
              {errors.photoUrl && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]).+$/,
                  })}
                  type={!showPassword ? "text" : "password"}
                  className={`rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4 ${
                    errors.password ? "border border-red-600" : "input-bordered"
                  } focus:outline-none w-full`}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-600">
                  {errors.password?.type === "required"
                    ? "Password is required"
                    : errors.password?.type === "minLength"
                    ? "Password must be at least 6 characters long"
                    : errors.password?.type === "maxLength"
                    ? "Password must not exceed 20 characters"
                    : errors.password?.type === "pattern" && (
                        <>
                          Password must contain uppercase, special characters,
                          digit.
                        </>
                      )}
                </span>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#FF3811] px-3 py-1.5 text font-semibold leading-6 text-white shadow-sm hover:bg-[#FF1811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-[750px] hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="h-[800px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;
