import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);
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

  // Fallback avatar if no photoURL
  const avatarSrc = photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=14b8a6&color=fff&size=256&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Glassmorphic Profile Card */}
        <div className="relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100">
              My Profile
            </h2>

            {/* Avatar + User Info */}
            <div className="flex flex-col items-center mb-12">
              <div className="relative">
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-8 border-white dark:border-gray-700 shadow-2xl"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=14b8a6&color=fff&size=256&bold=true`;
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 pointer-events-none" />
              </div>

              <div className="text-center mt-8">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="space-y-10">
              {/* Full Name */}
              <div>
                <label className="block text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
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

              {/* Photo URL */}
              <div>
                <label className="block text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Profile Photo URL <span className="text-sm font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="input input-lg w-full text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-2xl px-6 py-4"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Paste a direct link to an image (e.g., from Imgur, GitHub, or your own host)
                </p>
              </div>

              {/* Live Preview Note */}
              {photoURL && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Preview updates live above as you type a valid image URL
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:cursor-not-allowed"
              >
                {loading ? "Updating Profile..." : "Update Profile"}
              </button>
            </form>

            {/* Tip */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-10">
              Your profile photo will appear across the app — including transactions and reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;