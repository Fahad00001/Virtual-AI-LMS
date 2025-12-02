import React from 'react'
import { Navbar } from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaChalkboardTeacher, FaClock, FaShieldAlt, FaPlay, FaBookOpen, FaRobot, FaStar } from 'react-icons/fa'
import heroImg from '../assets/home.jpg'
import aboutImg from '../assets/about.jpg'
import Logo from '../components/Logo'
import ExploreCourses from '../components/ExploreCourses'
import CardPage from '../components/CardPage'
import About from '../components/About'
import Footer from '../components/Footer'
import ReviewPage from '../components/ReviewPage'
// import CardPage from '../components/CardPage'

const Home = () => {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)

  return (
    <div className="w-full overflow-hidden bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-900 min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-[90px]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-indigo-900/80" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 min-h-[80vh] flex flex-col md:flex-row items-center gap-10">
          
          {/* Text Content */}
          <div className="flex-1 max-w-xl text-center md:text-left">
            {/* AI Search button on top */}
            <div className='flex text-center items-center justify-center '>
            <button  onClick={()=>navigate("/search")}
              className="mb-6 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                text-white font-bold text-lg shadow-lg hover:shadow-pink-400/50 hover:scale-110 transition-transform duration-300 
                border border-white/20"
            >
              <FaRobot className="text-2xl" /> AI Search
            </button>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent animate-pulse">
                Grow Your Skills
              </span>
              <br />
              to Advance Your Career Path
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-md">
              Transform your learning journey with AI-powered, personalized courses designed to help you succeed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              {!userData ? (
                <>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-transform"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-transform"
                  >
                    Go to Profile
                  </button>
                  <button
                    onClick={() => navigate('/allcourses')}
                    className="px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform"
                  >
                    View all courses
                  </button>
                </>
              )}
            </div>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6 text-sm sm:text-base text-gray-200">
              <span className="inline-flex items-center gap-2"><FaPlay /> Interactive Lessons</span>
              <span className="inline-flex items-center gap-2"><FaBookOpen /> Real Projects</span>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={heroImg}
              alt="Hero"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-2xl object-cover border-4 border-white/20 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaChalkboardTeacher className="text-2xl" />}
            title="Expert Instructors"
            description="Learn from industry-leading experts with proven track records."
          />
          <FeatureCard
            icon={<FaClock className="text-2xl" />}
            title="Self-paced Learning"
            description="Learn anytime, anywhere, at your own speed."
          />
          <FeatureCard
            icon={<FaShieldAlt className="text-2xl" />}
            title="Secure & Private"
            description="Your learning data and progress are always safe."
          />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img src={aboutImg} alt="About Virtual Courses" className="w-full rounded-xl shadow-2xl object-cover" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
              Why <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">Virtual Courses?</span>
            </h2>
            <p className="mt-4 text-gray-200 leading-relaxed drop-shadow-md">
              Our AI-powered platform tailors lessons to your needs, tracks progress, and ensures you gain real-world skills.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/signup')}
                className="px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-transform"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">What learners say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReviewCard
            text="The lessons are concise and practical. The AI tips helped me grasp concepts faster."
            name="Aisha Khan"
            role="Frontend Developer"
            rating={5}
          />
          <ReviewCard
            text="Flexible pacing let me learn after work. Projects made my portfolio stand out."
            name="Michael Chen"
            role="Data Analyst"
            rating={4}
          />
          <ReviewCard
            text="As an educator, I love how easy it is to structure content and track student progress."
            name="Priya Patel"
            role="Educator"
            rating={5}
          />
        </div>
      </section>

      <div className='mb-[20px]'>
        <Logo />
        <CardPage/>
        <ExploreCourses/>
       
        <About/>
        <ReviewPage/>
        <Footer/>
        {/* <CardPage/> */}
        
      </div>

      {/* Footer */}
      {/* <footer className="border-t border-white/20 py-6 bg-gradient-to-r from-purple-800 to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-200">
          <span>© {new Date().getFullYear()} Virtual Courses. All rights reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
            <button onClick={() => navigate('/profile')} className="hover:text-white">Profile</button>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 transition">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white flex items-center justify-center mb-4 shadow-md">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-200 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ReviewCard({ text, name, role, rating }) {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-1 mb-3" aria-label={`Rated ${rating} out of 5`}>
        {[1,2,3,4,5].map((i) => (
          <FaStar key={i} className={i <= rating ? 'text-yellow-300' : 'text-white/30'} />
        ))}
      </div>
      <p className="text-gray-100">“{text}”</p>
      <div className="mt-4">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-300">{role}</div>
      </div>
    </div>
  )
}

export default Home



// import { createSlice } from "@reduxjs/toolkit";

// const initialUser = JSON.parse(localStorage.getItem("userData")) || null;

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userData: initialUser,
//   },
//   reducers: {
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//       localStorage.setItem("userData", JSON.stringify(action.payload)); // persist
//     },
//     clearUserData: (state) => {
//       state.userData = null;
//       localStorage.removeItem("userData"); // clear on logout
//     },
//   },
// });

// export const { setUserData, clearUserData } = userSlice.actions;
// export default userSlice.reducer;
