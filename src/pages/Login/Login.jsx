import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../../hooks/useTitle";
import { toast } from "react-toastify";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  useTitle("Login");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [validationCode, setValidationCode] = useState("");
  const [validationError, setValidationError] = useState("");
  // console.log(from);

  const handleValidateCaptcha = () => {
    // const captchaCode = e.target.value;
    // if (validateCaptcha(captchaCode) == true) {
    //   setDisabled(false);
    // } else {
    //   setDisabled(true);
    // }
    if (validateCaptcha(validationCode) == true) {
      setDisabled(false);
      setValidationError("validation successful");
    } else {
      setDisabled(true);
      setValidationError("Doesn't match. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(() => {
        // console.log(err);
        toast.error("Invalid Email or Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mb-20 flex items-center">
      <div className="w-full sm:w-[550px] h-[800px] border px-12 flex flex-col justify-center mx-auto">
        <div className="">
          <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/registration"
              className="font-semibold leading-6 text-[#ff3811]"
            >
              Create your own account
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
            <div className="mb-3">
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
                  id="password"
                  name="password"
                  type={!showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="captcha"
                  className="block font-medium leading-6 text-gray-900"
                >
                  <LoadCanvasTemplate className="text-[#5D5FEF]" />
                </label>
                <div className="text-sm text-right">
                  <Link
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="captcha"
                  name="captha"
                  type="text"
                  onChange={(e) => setValidationCode(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
            <p
              className={`text-sm ${
                validationError === "validation successful"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {validationError}
            </p>
            <div className="form-control mt-6">
              <button
                type="button"
                disabled={validationCode.length !== 6}
                onClick={() => handleValidateCaptcha()}
                className={`flex w-full justify-center rounded-md bg-[#FF3811] px-3 py-1.5 text font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  validationCode.length !== 6
                    ? "bg-gray-300"
                    : "hover:bg-[#FF1811]"
                }`}
              >
                Check Validation
              </button>
            </div>
            <div className="mt-6">
              <input
                type="submit"
                disabled={disabled}
                className={`flex w-full justify-center rounded-md bg-[#FF3811] px-3 py-1.5 text font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  disabled ? "bg-gray-300" : "hover:bg-[#FF1811]"
                }`}
                value="Sign in"
              />
            </div>
          </form>
          <div className="py-12 flex items-center gap-2 justify-center">
            <hr className="w-[69px] sm:w-[120px]" />
            <p className="text-[#424242] font-medium">Or continue with</p>
            <hr className="w-[69px] sm:w-[120px]" />
          </div>
          <div className="flex justify-center sm:justify-between items-center flex-wrap gap-6">
            <button
              className="bg-[#1D9BF0] px-16 py-2 flex gap-2 items-center rounded"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="text-[#FFF] text-xl" />
              <p className="text-[#FFF] font-semibold">Google</p>
            </button>
            <button className="bg-[#24292F] px-16 py-2 flex gap-2 items-center rounded">
              <FaGithub className="text-[#FFF] text-xl" />
              <p className="text-[#FFF] font-semibold">Github</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[750px] hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="h-[800px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
