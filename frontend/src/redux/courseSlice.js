import { createSlice } from "@reduxjs/toolkit";

const courseSlice=createSlice({
    name:"course",
    initialState:{
         creatorCourseData:[],
         courseData:[],
         selectedCourse:null

    },
    reducers:{
        setCreatorCourseData:(state,action)=>{
            state.creatorCourseData=action.payload
        },
        setCourseData:(state,action)=>{
            state.courseData=action.payload
        },
        setSelectedCourse:(state,action)=>{
            state.selectedCourse=action.payload
        }
    }
})

export const {setCreatorCourseData, setCourseData,setSelectedCourse}=courseSlice.actions

export default courseSlice.reducer




// import React, { useEffect, useState } from 'react'
// import { FaArrowLeft, FaPlay, FaClock, FaUser, FaStar } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { setSelectedCourse } from '../redux/courseSlice';
// import img from '../assets/empty.jpg'

// const ViewCourses = () => {
//     const navigate = useNavigate()
//     const { courseData } = useSelector(state => state.course)
//     const { courseId } = useParams()
//     const { selectedCourse } = useSelector(state => state.course)
    
//     const dispatch = useDispatch()

//     const fetchCourseData = async () => {
//         if (courseData && courseData.length > 0) {
//             const course = courseData.find(course => course._id === courseId)
//             if (course) {
//                 dispatch(setSelectedCourse(course))
//                 console.log("Selected Course:", course);
//             }
//         }
//     }

//     useEffect(() => {
//         fetchCourseData()
//     }, [courseData, courseId])

//     if (!selectedCourse) {
//         return (
//             <div className='min-h-screen p-6 bg-gray-50 flex items-center justify-center'>
//                 <div className='text-center'>
//                     <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4'></div>
//                     <p className='text-gray-600'>Loading course...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className='min-h-screen p-6 bg-gray-50'>
//             <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
//                 {/* Back Button */}
//                 <FaArrowLeft 
//                     className='text-black w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors' 
//                     onClick={() => navigate("/")}
//                 />

//                 {/* Course Header */}
//                 <div className='flex flex-col gap-6 md:flex-row'>
//                     {/* Thumbnail */}
//                     <div className='w-full md:w-1/2'>
//                         <div className='relative'>
//                             <img 
//                                 src={selectedCourse?.thumbnail || img} 
//                                 className='rounded-xl w-full h-64 md:h-80 object-cover shadow-lg' 
//                                 alt={selectedCourse?.title || "Course thumbnail"}
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = img;
//                                 }}
//                             />
//                             <div className='absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center'>
//                                 <div className='bg-white bg-opacity-90 rounded-full p-3'>
//                                     <FaPlay className='text-black w-6 h-6' />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Course Details */}
//                     <div className='w-full md:w-1/2 space-y-4'>
//                         <div>
//                             <h1 className='text-3xl font-bold text-gray-800 mb-2'>
//                                 {selectedCourse?.title || "Course Title"}
//                             </h1>
//                             <p className='text-gray-600 text-lg'>
//                                 {selectedCourse?.subTitle || "Course Subtitle"}
//                             </p>
//                         </div>

//                         <div className='flex items-center gap-4 text-sm text-gray-500'>
//                             <span className='flex items-center gap-1'>
//                                 <FaUser />
//                                 Instructor
//                             </span>
//                             <span className='flex items-center gap-1'>
//                                 <FaClock />
//                                 {selectedCourse?.level || "Beginner"}
//                             </span>
//                             <span className='flex items-center gap-1'>
//                                 <FaStar className='text-yellow-400' />
//                                 4.5 (120 reviews)
//                             </span>
//                         </div>

//                         <div className='bg-gray-50 p-4 rounded-lg'>
//                             <h3 className='font-semibold text-gray-800 mb-2'>Course Description</h3>
//                             <p className='text-gray-600 leading-relaxed'>
//                                 {selectedCourse?.description || "No description available for this course."}
//                             </p>
//                         </div>

//                         <div className='flex items-center justify-between'>
//                             <div>
//                                 <span className='text-2xl font-bold text-green-600'>
//                                     ₹{selectedCourse?.price?.toLocaleString("en-IN") || "0"}
//                                 </span>
//                                 <span className='text-gray-500 line-through ml-2'>₹999</span>
//                             </div>
//                             <button className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'>
//                                 Enroll Now
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Course Content */}
//                 <div className='border-t pt-6'>
//                     <h2 className='text-2xl font-bold text-gray-800 mb-4'>Course Content</h2>
//                     <div className='space-y-3'>
//                         {selectedCourse?.lectures && selectedCourse.lectures.length > 0 ? (
//                             selectedCourse.lectures.map((lecture, index) => (
//                                 <div key={lecture._id || index} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
//                                     <div className='flex items-center gap-3'>
//                                         <span className='text-gray-500 text-sm'>{index + 1}</span>
//                                         <span className='font-medium'>{lecture.lectureTitle || `Lecture ${index + 1}`}</span>
//                                     </div>
//                                     <span className='text-sm text-gray-500'>5 min</span>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className='text-gray-500 text-center py-8'>No lectures available yet.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ViewCourses
