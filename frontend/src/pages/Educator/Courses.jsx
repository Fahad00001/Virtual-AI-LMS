import React, { useEffect } from 'react';
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import img from "../../assets/empty.jpg";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCreatorCourseData } from '../../redux/courseSlice';

const Courses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { creatorCourseData } = useSelector(state => state.course);
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        if (!userData) return;
        const fetchCreatorCourses = async () => {
            try {
                const result = await axios.get('/api/course/getcreator', { withCredentials: true });
                console.log('Creator courses:', result.data);
                dispatch(setCreatorCourseData(result.data));
            } catch (error) {
                console.log('getcreator error', error);
            }
        };
        fetchCreatorCourses();
    }, [userData, dispatch]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <FaArrowLeft
                        className="w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-600 transition-all duration-300"
                        onClick={() => navigate("/dashboard")}
                    />
                    <h1 className="text-2xl font-semibold text-gray-800">
                        All Created Courses
                    </h1>
                </div>

                <button
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={() => navigate("/createcourses")}
                >
                    + Create Course
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-200 text-gray-700 sticky top-0">
                        <tr>
                            <th className="py-3 px-4 text-left">Course</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creatorCourseData && creatorCourseData.length > 0 ? (
                            creatorCourseData.map((course) => (
                                <tr key={course._id} className="border-t hover:bg-gray-50 transition">
                                    {/* Course Image + Name */}
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <img
                                            src={course.thumbnail || img}
                                            alt={course.title}
                                            className="w-14 h-14 rounded-lg object-cover shadow-sm"
                                        />
                                        <span className="font-medium text-gray-800">{course.title}</span>
                                    </td>

                                    {/* Price */}
                                    <td className="py-3 px-4">
                                        {course.price ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            ₹ {course.price}
                                            </span>
                                        ) : (
                                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                                NA
                                            </span>
                                        )}
                                    </td>

                                    {/* Status */}
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${course.isPublished
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {course.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-3 px-4 flex gap-4 text-lg">
                                        <FaEdit
                                            className="text-green-500 hover:text-green-700 cursor-pointer"
                                            onClick={() => navigate(`/editcourses/${course?._id}`)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-400 py-6">
                                    No courses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {creatorCourseData?.length > 0 && (
                    <p className="text-center text-gray-400 mt-6">A list of your recent courses</p>
                )}
            </div>

            {/* Mobile View - Cards */}
            <div className="sm:hidden mt-6 space-y-4">
                {creatorCourseData && creatorCourseData.length > 0 ? (
                    creatorCourseData.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={course.thumbnail || img}
                                    alt={course.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <span>{course.title}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                {course.price ? (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        ${course.price}
                                    </span>
                                ) : (
                                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                        NA
                                    </span>
                                )}
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${course.isPublished
                                            ? "bg-green-100 text-green-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {course.isPublished ? "Published" : "Draft"}
                                </span>
                            </div>
                            <div className="flex gap-4 mt-2 text-lg">
                                <FaEdit
                                    className="text-green-500 hover:text-green-700 cursor-pointer"
                                    onClick={() => navigate(`/editcourses/${course?._id}`)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 mt-6">
                        No courses found
                    </p>
                )}
                {creatorCourseData?.length > 0 && (
                    <p className="text-center text-gray-400 mt-6">A list of your recent courses</p>
                )}
            </div>
        </div>
    );
};

export default Courses;
