import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-base-200  text-near p-8 rounded-2xl w-[380px] shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-2">
          Sign in to your account
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Login to your account for a faster checkout.
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full flex items-center gap-2 border-secondary hover:bg-secondary"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        <div className="flex items-center gap-2 my-6 text-gray-500">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">Or, sign in with your email</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form field */}
        <form onSubmit={handleLogIn}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="input input-bordered w-full bg-transparent border-secondary placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">
              Your Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full bg-transparent border-secondary placeholder-gray-400"
            />
          </div>

          {/* Keep me signed in + Forgot Password */}
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span className="text-near">Keep me signed in</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="btn bg-primary hover:bg-blue-600 w-full text-white border-none rounded-full">
            Sign in
          </button>
        </form>
        {/* Sign Up Link */}
        <p className="text-center text-sm mt-6 text-gray-400">
          Don’t you have an account?{" "}
          <a href="#" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
