import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getCurrentUser from './cutsomHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import getCreatorCourse from './cutsomHooks/getCreatorCourse'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './cutsomHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourses from './pages/ViewCourses'
import ScrollToTop from './components/ScrollToTop'
import ViewLecture from './pages/ViewLecture'
import MyEnrollCourses from './pages/MyEnrollCourses'
import getAllReviews from './cutsomHooks/getAllReviews'
import SearchWithAi from './pages/SearchWithAi'
// import  {ToastConatiner} from 'react-toastify'

export const serverUrl = "http://localhost:8000"

const App = () => {
  const { isLoading } = getCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  getAllReviews()

  const { userData } = useSelector(state => state.user)

  console.log('App component - isLoading:', isLoading, 'userData:', userData)

  // Show loading spinner during page refresh/authentication check
  if (isLoading) {
    console.log('Showing loading spinner')
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  console.log('Showing main app content')
 
  return (
    <>
      <ToastContainer theme="dark" />
      <ScrollToTop />
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={userData?<Profile/>:<Navigate to={"/signup"}/>}/>
        <Route path='/forget' element={<ForgetPassword/>}/>
        <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/signup"}/>}/>
        <Route path='/allcourses' element={userData?<AllCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/Dashboard' element={userData?.role=="educator"?<Dashboard/>:<Navigate to={"/signup"}/>}/>
        <Route path='/courses' element={userData?<Courses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/createcourses' element={userData?<CreateCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/editcourse/:courseId' element={userData?.role=="educator"?<EditCourse/>:<Navigate to={"/signup"}/>}/>
        <Route path='/editcourses/:courseId' element={userData?.role=="educator"?<EditCourse/>:<Navigate to={"/signup"}/>}/>
        <Route path='/createlecture/:courseId' element={userData?.role=="educator"?<CreateLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role=="educator"?<EditLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/viewcourse/:courseId' element={userData?<ViewCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/viewlecture/:courseId' element={userData?<ViewLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/mycourses' element={userData?<MyEnrollCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/search' element={userData?<SearchWithAi/>:<Navigate to={"/signup"}/>}/>
      </Routes>
    </>
  )
}

export default App
