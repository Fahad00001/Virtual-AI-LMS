import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"; // ✅ import loader

const CreateCourses = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    if (!title || !category) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Course created");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create a Course
        </h1>

        {/* Course Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Course Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter course title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select category</option>
            <option value="web Development">Web Development</option>
            <option value="data Science">Data Science</option>
            <option value="design">UI/UX Design</option>
            <option value="mobile">Mobile Development</option>
            <option value="Ethical Hacking">Ethical Hacking</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="App Development">AI Tools</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleCreateCourse}
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? (
            <>
              <ClipLoader size={20} color="#fff" />
              Creating...
            </>
          ) : (
            "Create Course"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateCourses;
