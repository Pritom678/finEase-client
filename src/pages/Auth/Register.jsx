import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, photo, email, password);

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(name, photo);
        toast.success("User created successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then((result) => {
        toast.success("User created successfully!", { id: "create-user" });
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handlePasswordError = (e) => {
    const password = e.target.value;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      setPasswordError("At least 6 characters required");
    } else if (!uppercaseRegex.test(password)) {
      setPasswordError("Must include an uppercase letter");
    } else if (!lowercaseRegex.test(password)) {
      setPasswordError("Must include an lowercase letter");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-near my-10">
      <div className="bg-base-200 text-near p-8 rounded-2xl w-[380px] shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-2 text-near]">
          Create your account
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Sign up to manage your personal finance securely.
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center gap-2 border-secondary hover:bg-secondary"
        >
          <FcGoogle className="text-xl" /> Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-gray-500">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">Or, sign up with your email</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form field */}
        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="input input-bordered w-full bg-base-100 border-secondary text-near placeholder-gray-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="input input-bordered w-full bg-base-100 border-secondary text-near placeholder-gray-500"
            />
          </div>

          {/* Photo URL Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your Photo URL"
              className="input input-bordered w-full bg-base-100 border-secondary text-near placeholder-gray-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              onChange={handlePasswordError}
              placeholder="Enter your Password"
              className="input input-bordered w-full bg-base-100 border-secondary text-near placeholder-gray-500"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button className="btn w-full text-white border-none rounded-full bg-primary hover:bg-blue-600">
            Sign up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
