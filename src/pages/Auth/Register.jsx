import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Password validation
    if (name === "password") {
      const uppercase = /[A-Z]/;
      const lowercase = /[a-z]/;

      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters");
      } else if (!uppercase.test(value)) {
        setPasswordError("Must include at least one uppercase letter");
      } else if (!lowercase.test(value)) {
        setPasswordError("Must include at least one lowercase letter");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordError) {
      toast.error("Please fix password requirements");
      return;
    }

    setLoading(true);
    toast.loading("Creating your account...", { id: "signup" });

    try {
      const result = await createUser(formData.email, formData.password);
      await updateUserProfile(formData.name, formData.photo || null);

      toast.success("Account created successfully! Welcome! 🎉", {
        id: "signup",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      let message = "Failed to create account";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak";
      }
      toast.error(message, { id: "signup" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    toast.loading("Signing up with Google...", { id: "signup" });

    try {
      await signInWithGoogle();
      toast.success("Welcome! Account created with Google! 🎉", {
        id: "signup",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google signup failed", { id: "signup" });
    } finally {
      setLoading(false);
    }
  };

  // Live avatar preview
  const avatarSrc =
    formData.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.name || "User"
    )}&background=14b8a6&color=fff&size=256&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-xl">
        {/* Glassmorphic Signup Card */}
        <div className="relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
              Create Account
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Join FinEase and take control of your finances
            </p>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-md hover:shadow-lg hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 group disabled:opacity-70"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Sign up with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-8 bg-white dark:bg-gray-800/95 text-gray-500 font-medium">
                  or sign up with email
                </span>
              </div>
            </div>

            {/* Live Avatar Preview */}
            <div className="flex justify-center mb-10">
              <img
                src={avatarSrc}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-teal-500/30 shadow-xl"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    formData.name || "User"
                  )}&background=14b8a6&color=fff&size=256&bold=true`;
                }}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-8">
              {/* Name */}
              <div>
                <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                  required
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Profile Photo URL{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Paste a direct image link (preview updates live above)
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Submit Button - Moderate Size */}
              <button
                type="submit"
                disabled={loading || passwordError}
                className="w-full py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-12 text-center text-lg text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors text-xl"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
