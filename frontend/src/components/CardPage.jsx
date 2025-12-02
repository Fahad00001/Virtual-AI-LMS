import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CardPage = () => {
  const { courseData } = useSelector(state => state.course)
  const [popularCourse, setPopularCourse] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (courseData && Array.isArray(courseData)) {
      setPopularCourse(courseData.slice(0, 6))
    }
  }, [courseData])

  // Filter courses based on search term
  const filteredCourses = popularCourse.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-50">
      {/* Heading */}
      <h1 className="md:text-[42px] text-[28px] font-bold text-center mt-[80px] mb-4 text-gray-800">
        Our Popular Courses
      </h1>

      {/* Subtitle */}
      <span className="lg:w-[50%] md:w-[80%] text-center text-gray-600 md:text-lg text-base leading-relaxed mb-[30px] px-4">
        Explore <span className="text-blue-500 font-semibold">top rated courses</span> designed to boost your skills, and unlock opportunities in tech, AI, business, and beyond.
      </span>

      {/* Search Box */}
      <div className="w-full flex justify-center mb-[40px] px-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-black md:w-[50%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Courses Grid */}
      <div className="w-full flex flex-wrap items-center justify-center gap-[40px] lg:px-[60px] md:px-[40px] px-[20px] pb-[60px]">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <Card
              id={course._id}
              key={index}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              reviews={course.reviews}
              price={course.price}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No matching courses found
            </h3>
            <p className="text-gray-500">
              Try searching for something else!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardPage
