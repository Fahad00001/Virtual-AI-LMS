import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import google from '../assets/google.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogin = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const result=await axios.post(serverUrl+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(result.data);
      dispatch(setUserData(result.data))
      setLoading(false)
      toast.success("Login Successfully")
      navigate("/")
      
         } catch (error) {
       console.log(error);
       setLoading(false)
       
       // Handle different types of errors
       if (error.response && error.response.data && error.response.data.message) {
         toast.error(error.response.data.message)
       } else if (error.message) {
         toast.error(error.message)
       } else {
         toast.error('Login failed. Please try again.')
       }
     }

  
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const payload = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      }
      const response = await axios.post(
        serverUrl + '/api/auth/google',
        payload,
        { withCredentials: true }
      )
      dispatch(setUserData(response.data))
      toast.success('Login Successfully')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Google login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#dddbdb] w-full min-h-screen flex items-center justify-center p-6 relative">
      {/* <FaArrowLeft className='absolute top-[3%] md:top-[6%] left-[15%] w-[22px] cursor-pointer' onClick={()=>navigate("/")}/> */}

      <form
        onSubmit={handleLogin}
        className="w-full max-w-[850px] bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden relative"
      >
        <FaArrowLeft
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-2xl cursor-pointer 
        text-gray-300 hover:text-indigo-400 
        transition-all duration-300 ease-in-out 
        hover:scale-125 hover:-translate-x-1"
      />
        {/* Left Side */}
        <div className="md:w-[50%] w-full flex flex-col items-center justify-center gap-6 p-8 md:p-10">
          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="font-bold text-black text-3xl mb-1">Welcome Back</h1>
            <h2 className="text-gray-500 text-lg">Login to your account</h2>
          </div>

          {/* Email */}
          <div className="w-full">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition duration-300 shadow-lg mt-2 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging In...
              </div>
            ) : (
              'Login'
            )}
          </button>

          <span onClick={()=>navigate('/forget')} className="text-[13px] cursor-pointer text-[#585757]">
            Forgot your password?
          </span>

          {/* Or Continue */}
          <div className="flex items-center w-full gap-3 mt-4 text-gray-500 text-sm">
            <div className="flex-1 h-[1px] bg-[#c4c4c4]"></div>
            <span className="px-2 text-[14px] text-[#6f6f6f]">Or Continue</span>
            <div className="flex-1 h-[1px] bg-[#c4c4c4]"></div>
          </div>

          <div onClick={handleGoogleLogin} className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <img src={google} className="w-[25px]" alt="Google" />
            <span className="text-[18px] text-gray-500 ml-1">oogle</span>
          </div>

          <div className="text-[#6f6f6f]">
            Create a new account
            <span
              onClick={() => navigate('/signup')}
              className="underline underline-offset-1 text-black cursor-pointer ml-1"
            >
              Signup
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-[50%] bg-black hidden md:flex items-center justify-center flex-col p-8">
          <img
            src={logo}
            alt="logo"
            className="w-32 h-32 object-cover rounded-full shadow-2xl mb-4"
          />
          <span className="text-2xl text-white font-semibold tracking-wider">
            VIRTUAL COURSES
          </span>
          <p className="text-gray-400 mt-3 text-center px-6">
            Learn new skills anytime, anywhere. Your journey starts here.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
