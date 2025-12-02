import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineHand } from "react-icons/hi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { creatorCourseData } = useSelector((state) => state.course);

  // Course Progress Graph Data
  const courseProgressData =
    creatorCourseData?.map((course) => ({
      name: course?.title?.slice(0, 10) + "...",
      lectures: course?.lectures?.length || 0,
    })) || [];

  // Student Enrollment Graph Data
  const EnrollData =
    creatorCourseData?.map((course) => ({
      name: course?.title?.slice(0, 10) + "...",
      enroll: course?.enrolledStudent?.length || 0,
    })) || [];

  // ✅ Calculate Total Earnings
  const totalEarnings = useMemo(() => {
    return (
      creatorCourseData?.reduce((acc, course) => {
        const price = Number(course?.price) || 0;
        const students = course?.enrolledStudent?.length || 0;
        return acc + price * students;
      }, 0) || 0
    );
  }, [creatorCourseData]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-indigo-50 relative">
      {/* Back Button */}
      <FaArrowLeft
        className="absolute top-2 left-6 w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-600 transition-all duration-300"
        onClick={() => navigate("/")}
      />

      <div className="w-full px-6 py-10 space-y-10">
        {/* Main Section */}
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-8 border border-gray-200">
          {/* Profile Image */}
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt="educator"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white">
              {userData?.name?.charAt(0).toUpperCase() || "E"}
            </div>
          )}

          {/* Text Content */}
          <div className="text-center md:text-left space-y-3">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Welcome, {userData?.name || "Educator"}
              <HiOutlineHand className="text-yellow-500 animate-wave" />
            </h1>

            {/* ✅ Total Earnings Section */}
            <h2 className="text-xl font-semibold text-indigo-600">
              💰 Total Earnings:{" "}
              <span className="text-gray-800">₹{totalEarnings.toLocaleString()}</span>
            </h2>

            <p className="text-gray-600 text-sm">
              {userData?.description ||
                "Start creating courses for your students and grow your impact."}
            </p>

            {/* Create Courses Button */}
            <button
              onClick={() => navigate("/courses")}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              ➕ Create Courses
            </button>
          </div>
        </div>

        {/* Graph / Stats Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Graph */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student Enrollment Graph */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Student Enrollment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enroll" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
