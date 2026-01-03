import React, { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, signOutUser } = use(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name.trim(),
        photoURL: photoURL.trim() || null,
      });
      toast.success("Profile updated successfully! 🎉");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fallback avatar
  const avatarSrc =
    photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "User"
    )}&background=14b8a6&color=fff&size=256&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Glassmorphic Profile Card */}
        <div className="relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10 p-10 md:p-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100">
              My Profile
            </h2>

            {/* Avatar + Info */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-8 border-white dark:border-gray-700 shadow-2xl"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      name || "User"
                    )}&background=14b8a6&color=fff&size=256&bold=true`;
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 pointer-events-none" />
              </div>

              <div className="text-center mt-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="space-y-8 mb-10">
              <div>
                <label className="block text-lg md:text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                  required
                />
              </div>

              <div>
                <label className="block text-lg md:text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Profile Photo URL{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Paste a direct link to an image
                </p>
              </div>

              {/* Buttons Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-70 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>

                <button
                  type="button"
                  onClick={signOutUser}
                  className="py-5 bg-rose-500/10 hover:bg-rose-500/20 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xl rounded-2xl border-2 border-rose-500/50 dark:border-rose-700/50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-8">
              Your profile photo appears across the app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;