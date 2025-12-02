import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";

export default function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 Search only in mobile

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let courseCopy = courseData?.slice() || [];

    // 🔹 Search filter (only in mobile view)
    if (window.innerWidth < 768 && searchTerm.trim() !== "") {
      courseCopy = courseCopy.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }

    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData || []);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category, searchTerm]); // 🔹 Apply searchTerm too

  const categories = [
    "Mobile Development",
    "AI/ML",
    "AI Tools",
    "Data Science",
    "Data Analytics",
    "Ethical Hacking",
    "UI/UX Design",
    "Web Development",
    "Others",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Navbar />

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="fixed top-4 left-4 z-50 bg-white text-black px-4 py-2 rounded-md shadow-md md:hidden border border-gray-300 hover:bg-gray-100 transition"
      >
        {isSidebarVisible ? "❌ Close" : "☰ Filter"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] md:w-[300px] bg-black p-6 pt-[80px] border-r border-gray-200 shadow-lg transition-transform duration-300 z-40
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center gap-3 text-gray-50 mb-6">
          <FaArrowLeft
            onClick={() => navigate("/")}
            className="text-white cursor-pointer hover:text-gray-300 transition"
          />
          Filter by category
        </h2>

        {/* Filter Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 text-sm bg-gray-700 text-white border border-white p-5 rounded-2xl"
        >
          {/* AI Search */}
          <button
            type="button"
            onClick={()=>navigate("/search")}
            className="px-4 py-3 w-full bg-black text-white rounded-xl text-base font-light flex items-center justify-center gap-3 hover:bg-gray-800 transition"
          >
            Search with AI
            <img
              src={ai}
              className="w-7 h-7 rounded-full object-cover"
              alt="AI"
            />
          </button>

          {/* 🔹 Mobile Search Input */}
          <div className="md:hidden">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-400 text-black"
            />
          </div>

          {/* Category Checkboxes */}
          {categories.map((cat, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition"
            >
              <input
                type="checkbox"
                value={cat}
                onChange={() => toggleCategory(cat)}
                checked={category.includes(cat)}
                className="accent-black w-4 h-4 rounded-md"
              />
              {cat}
            </label>
          ))}
        </form>
      </aside>

      {/* Overlay */}
      {/* {isSidebarVisible && (
        <div
          onClick={() => setIsSidebarVisible(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )} */}

      {/* Courses */}
      <main className="flex-1 mt-[30px] transition-all duration-300 py-[100px] md:pl-[300px] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterCourses?.length > 0 ? (
            filterCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail || "https://via.placeholder.com/300"}
                    alt={course.title}
                    className="w-full h-[180px] object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full shadow-md">
                    {course.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col justify-between h-[160px]">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-semibold text-green-600">
                      ₹{course.price?.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => navigate(`/viewcourse/${course._id}`)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center">
              No courses found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
