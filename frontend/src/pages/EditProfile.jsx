import React, { useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [previewImage, setPreviewImage] = useState(userData?.photoUrl || null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setPreviewImage(URL.createObjectURL(selected));
    setFile(selected); // store to upload on submit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", name.trim());
      form.append("description", description);
      if (file) form.append("photoUrl", file);

      await axios.post(`/api/user/profile`, form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = await axios.get(`/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      dispatch(setUserData(data));
      toast.success("Profile updated");
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full relative transition-all duration-300 hover:shadow-2xl">
        
        {/* Back Button */}
        <FaArrowLeft
          className="absolute top-6 left-6 w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors"
          onClick={() => navigate("/profile")}
        />

        {/* Profile Avatar with Upload Option */}
        <div className="flex flex-col items-center relative">
          <label htmlFor="profileImage" className="relative cursor-pointer group">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:opacity-80 transition duration-300"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full text-white text-[30px] bg-black border-4 border-white shadow-md group-hover:opacity-80 transition duration-300">
                {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}

            {/* Camera Icon Overlay */}
            <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white shadow-md group-hover:scale-105 transition">
              <FaCamera className="w-4 h-4" />
            </div>
          </label>

          {/* Hidden file input */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <h2 className="text-xl font-bold mt-4 text-gray-800">
            Edit Your Profile
          </h2>
          <p className="text-sm text-gray-500">Update your personal info</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={userData?.email || ""}
              readOnly
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Bio
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white rounded-lg font-medium shadow-md transition-all ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
