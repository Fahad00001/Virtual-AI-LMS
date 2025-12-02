import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiOutlineOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";
const ExploreCourses = () => {
//   const courses = [
//     { id: 1, title: "React for Beginners", rating: 4.5 },
//     { id: 2, title: "Advanced JavaScript", rating: 4.8 },
//     { id: 3, title: "UI/UX Design Basics", rating: 4.2 },
//   ];
const navigate=useNavigate()

  return (
    <div className="w-full min-h-[50vh] flex flex-col lg:flex-row items-center justify-between gap-8 px-6 lg:px-12 py-10 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Left Section */}
      <div className="w-full lg:w-[350px] flex flex-col items-start justify-center gap-4">
        <span className="text-[35px] font-semibold leading-tight text-gray-800">
          Explore Courses
        </span>
        <p className="text-[17px] text-gray-600">
          Discover a variety of top-rated courses designed to help you learn new
          skills, level up your career, and achieve your goals.
        </p>
        <button onClick={()=>navigate("/allcourses")} className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Explore Courses <FaArrowRight />
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[720px]  max-w-[90%] lg:h-[300px] md:min-h-[300px]  flex items-center justify-center lg:gap-[60px]  gap-[50px]  flex-wrap mb-[50px] lg:mb-[0px] ">
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#c1b5c1]  rounded-lg  flex items-center justify-center">
           <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">  Web Development</span>
        </div>
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#99be9d]  rounded-lg  flex items-center justify-center">
           <FaUikit className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">UI/UX Designing</span>
        </div>
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#c47fbd]  rounded-lg  flex items-center justify-center">
           <MdAppShortcut className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">App dev</span>
        </div>
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#c1b5c1]  rounded-lg  flex items-center justify-center">
           <FaHackerrank className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">Ethical Hacking</span>
        </div>
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#c1b5c1]  rounded-lg  flex items-center justify-center">
           <AiOutlineOpenAI  className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">AI/ML</span>
        </div>
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#da633e]  rounded-lg  flex items-center justify-center">
           <SiGoogledataproc  className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">Data Science</span>
        </div>
        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#c1b5c1]  rounded-lg  flex items-center justify-center">
           <BsClipboardDataFill  className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">Data Analytics</span>
        </div>

        <div className="w-[100px] h-[130px]  font-light text-[13px] flex flex-col gap-3 text-center"> 
           <div className="w-[100px] h-[90px]  bg-[#46b944]  rounded-lg  flex items-center justify-center">
           <SiOpenaigym  className="w-[60px] h-[60px] text-gray-300" />

            
            </div> 
          <span className="text-black font-semibold">AI Tools</span>
        </div>
        

        
      </div>
    </div>
  );
};

export default ExploreCourses;

// import React, { useState } from "react";
// import { FaSearch, FaStar } from "react-icons/fa";

// const ExploreCourses = () => {
//   const [search, setSearch] = useState("");

//   // Reliable sample images (https)
//   const courses = [
//     {
//       id: 1,
//       title: "React for Beginners",
//       instructor: "John Doe",
//       rating: 4.5,
//       image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 2,
//       title: "Advanced JavaScript",
//       instructor: "Jane Smith",
//       rating: 4.8,
//       image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 3,
//       title: "UI/UX Design Basics",
//       instructor: "Alex Carter",
//       rating: 4.2,
//       image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 4,
//       title: "Python Data Science",
//       instructor: "Emily Brown",
//       rating: 4.9,
//       image: "https://th.bing.com/th/id/R.5501854bc42def02bb21ccbb6d01f0f8?rik=XAZiWINaMQdk9w&pid=ImgRaw&r=0",
//     },
//     {
//       id: 5,
//       title: "Full Stack Development",
//       instructor: "Michael Lee",
//       rating: 4.7,
//       image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
//     },
//   ];

//   const filtered = courses.filter((c) =>
//     c.title.toLowerCase().includes(search.toLowerCase())
//   );

//   // simple SVG fallback data URL (small, no external request)
//   const FALLBACK_SVG =
//     "data:image/svg+xml;utf8," +
//     encodeURIComponent(
//       `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%' height='100%' fill='#eef2ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#7c3aed' font-family='Arial' font-size='28'>Image unavailable</text></svg>`
//     );

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-10">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Explore Courses</h1>
//         <p className="text-gray-500 mt-2">Find the best courses to enhance your skills</p>
//       </div>

//       {/* Search */}
//       <div className="max-w-md mx-auto mb-8 relative">
//         <input
//           type="text"
//           placeholder="Search courses..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
//         />
//         <FaSearch className="absolute right-4 top-3 text-gray-400" />
//       </div>

//       {/* Grid */}
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filtered.length ? (
//           filtered.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
//             >
//               <div>
//                 {/* image container */}
//                 <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100">
//                   <img
//                     src={course.image}
//                     alt={course.title}
//                     loading="lazy"
//                     onError={(e) => {
//                       e.currentTarget.onerror = null;
//                       e.currentTarget.src = FALLBACK_SVG;
//                     }}
//                     className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>

//                 <h2 className="mt-4 text-lg font-semibold text-gray-800">{course.title}</h2>
//                 <p className="text-sm text-gray-500">{course.instructor}</p>
//               </div>

//               <div className="mt-4 flex items-center justify-between">
//                 <div className="flex items-center gap-1 text-yellow-500">
//                   <FaStar />
//                   <span className="text-gray-700">{course.rating}</span>
//                 </div>
//                 <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition">
//                   View
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">No courses found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExploreCourses;

