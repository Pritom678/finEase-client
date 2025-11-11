import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Profile updated successfully 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-16 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          👤 My Profile
        </h2>

        <div className="flex flex-col items-center mb-8">
          <img
            src={
              photoURL ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-400 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-700">{user?.displayName || "Unnamed User"}</h3>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-gray-50 border-gray-300"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Profile Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full bg-gray-50 border-gray-300"
              placeholder="Enter image URL"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full mt-4 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white border-none rounded-full transition-all`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Profile;

