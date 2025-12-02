import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const MyEnrollCourses = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const enrolledCourses = userData?.enrolledCourses || [];

  return (
    <div className="min-h-screen w-full py-12 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative text-white">
      {/* Back button */}
      <FaArrowLeft
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-2xl cursor-pointer 
        text-gray-300 hover:text-indigo-400 
        transition-all duration-300 ease-in-out 
        hover:scale-125 hover:-translate-x-1"
      />

      {/* Heading */}
      <h1 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 mb-10 drop-shadow-lg">
        🎓 My Enrolled Courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {enrolledCourses?.map((course, index) => {
            const courseId = course?._id || course?.courseId?._id || course;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden w-[300px] hover:shadow-indigo-500/40 transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title || "Course"}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-2xl"></div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2 truncate">
                    {course?.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                      {course?.category}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 font-medium">
                      {course?.level}
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/viewlecture/${courseId}`)}
                    className="w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    ▶ Watch Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEnrollCourses;
