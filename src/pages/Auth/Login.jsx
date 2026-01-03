import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        navigate(location.state || "/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate(location.state || "/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-xl">
        {" "}
        {/* Wide form container */}
        {/* Glassmorphic Login Card */}
        <div className="relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
              Welcome Back
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Sign in to manage your finances with ease
            </p>

            {/* Google Button - Moderate Size */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-md hover:shadow-lg hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 group"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-8 bg-white dark:bg-gray-800/95 text-gray-500 font-medium">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Form - Large Inputs, Moderate Buttons */}
            <form onSubmit={handleLogIn} className="space-y-10">
              {/* Email */}
              <div>
                <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-5"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-5"
                  required
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-base mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-md border-gray-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Keep me signed in
                  </span>
                </label>
                <a
                  href="#"
                  className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button - Moderate Size */}
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-12 text-center text-lg text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors text-xl"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
