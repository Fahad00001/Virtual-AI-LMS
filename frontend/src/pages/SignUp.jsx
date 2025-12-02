import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App' // keep as you had it
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/firebase.js'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('Student') // UI shows TitleCase
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch=useDispatch()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    // basic client-side validation
    if (!name.trim() || !email.trim() || !password) {
      toast.error('Please fill name, email and password')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      // normalize role to lowercase for backend (change if backend expects TitleCase)
      const payload = { name: name.trim(), email: email.trim(), password, role: role.toLowerCase() }

      const { data } = await axios.post(`${serverUrl}/api/auth/signup`, payload, { withCredentials: true })
      toast.success(data?.message || 'Signed up successfully')
        dispatch(setUserData(data))
      // optionally clear form: setName('') etc.
      navigate('/') // redirect after success
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Something went wrong'
      toast.error(msg)
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  const googleSignUp =async () => {
   try {
    setLoading(true)
    const response = await signInWithPopup(auth, provider)
    const user = response.user
    const payload = {
      name: user.displayName,
      email: user.email,
      // photoUrl: user.photoURL,
      role: role.toLowerCase()
    }
    const { data } = await axios.post(`${serverUrl}/api/auth/google`, payload, { withCredentials: true })
    dispatch(setUserData(data))
    navigate("/")
    toast.success("Signup successfully")
   } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message || 'Google signup failed')
   } finally {
    setLoading(false)
   }
  }

  return (
    <div className="bg-[#dddbdb] w-full min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-[850px] bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-6 p-8 md:p-10">
          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="font-bold text-black text-3xl mb-1">Let's Get Started</h1>
            <h2 className="text-gray-500 text-lg">Create your account</h2>
          </div>

          {/* Username */}
          <div className="w-full">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Role Selector (accessible buttons) */}
          <div className="flex w-full max-w-[320px] bg-gray-100 rounded-full p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setRole('Student')}
              aria-pressed={role === 'Student'}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-200 focus:outline-none ${
                role === 'Student' ? 'bg-black text-white' : 'text-gray-700 hover:bg-black hover:text-white'
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole('Educator')}
              aria-pressed={role === 'Educator'}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-200 focus:outline-none ${
                role === 'Educator' ? 'bg-black text-white' : 'text-gray-700 hover:bg-black hover:text-white'
              }`}
            >
              Educator
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition duration-300 shadow-lg mt-2 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" role="status" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Signing Up...
              </div>
            ) : (
              'Sign Up'
            )}
          </button>

          {/* Or Continue */}
          <div className="flex items-center w-full gap-3 mt-4 text-gray-500 text-sm">
            <div className="flex-1 h-[1px] bg-[#c4c4c4]" />
            <span className="px-2 text-[14px] text-[#6f6f6f]">Or Continue</span>
            <div className="flex-1 h-[1px] bg-[#c4c4c4]" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={googleSignUp}
            disabled={loading}
            className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-50 disabled:opacity-60"
          >
            <img src={google} alt="google" className="w-[25px] mr-2" />
            <span className="text-[16px] text-gray-700">Continue with Google</span>
          </button>

          {/* Login link */}
          <div className="text-[#6f6f6f]">
            Already have an account?
            <button type="button" onClick={() => navigate('/login')} className="underline underline-offset-1 text-black ml-1">
              Login
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 bg-black hidden md:flex items-center justify-center flex-col p-8">
          <img src={logo} alt="logo" className="w-32 h-32 object-cover rounded-full shadow-2xl mb-4" />
          <span className="text-2xl text-white font-semibold tracking-wider">VIRTUAL COURSES</span>
          <p className="text-gray-400 mt-3 text-center px-6">Learn new skills anytime, anywhere. Your journey starts here.</p>
        </div>
      </form>
    </div>
  )
}
