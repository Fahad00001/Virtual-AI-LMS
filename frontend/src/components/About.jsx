import React from "react";
import about from "../assets/s.jpg";
import Video from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16 relative overflow-hidden">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Left: Image with Video Overlay */}
      <div className="lg:w-1/2 w-full relative flex items-center justify-center">
        <img
          src={about}
          alt="About Us"
          className="w-[85%] rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
        />

        <video
          src={Video}
          className="absolute bottom-6 right-6 w-[40%] h-[40%] rounded-xl shadow-lg border-4 border-white hover:scale-105 transition duration-500"
          controls
          autoPlay
          muted
          loop
        />
      </div>

      {/* Right: About Info */}
      <div className="lg:w-1/2 w-full text-center lg:text-left">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          Simplified{" "}
          <span className="text-indigo-600">Learning</span>
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
          Welcome to our platform! 🚀  
          We believe education should be{" "}
          <span className="font-semibold">easy to follow</span>, 
          accessible, and designed for real growth. That’s why we bring you a learning experience tailored to every level.
        </p>

        {/* Key Highlights */}
        <ul className="space-y-4 text-gray-700 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
          <li className="flex items-start gap-3">
            <FiCheckCircle className="text-green-500 text-xl mt-1" />
            Simplified Learning – No jargon, just clear & practical lessons.
          </li>
          <li className="flex items-start gap-3">
            <FiCheckCircle className="text-green-500 text-xl mt-1" />
            Expert Trainers – Learn directly from industry professionals.
          </li>
          <li className="flex items-start gap-3">
            <FiCheckCircle className="text-green-500 text-xl mt-1" />
            Lifetime Access – Revisit courses anytime, anywhere.
          </li>
          <li className="flex items-start gap-3">
            <FiCheckCircle className="text-green-500 text-xl mt-1" />
            Hands-on Projects – Apply your skills with real-world tasks.
          </li>
        </ul>

        <button
          onClick={() => navigate("/allcourses")}
          className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
        >
          🚀 Explore Courses
        </button>
      </div>
    </div>
  );
};

export default About;
