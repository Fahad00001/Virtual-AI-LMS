import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { serverUrl } from '../App'

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (step === 1) {
        const res = await axios.post(`${serverUrl}/api/auth/forgot/request`, { email },{withCredentials:true})
        toast.success(res.data?.message || 'OTP sent to email')
        if (res.data?.devOtp) {
          console.log('DEV OTP:', res.data.devOtp)
        }
        setStep(2)
      } else if (step === 2) {
        const res = await axios.post(`${serverUrl}/api/auth/forgot/verify`, { email, otp },{withCredentials:true})
        toast.success(res.data?.message || 'OTP verified')
        setStep(3)
      } else if (step === 3) {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        const res = await axios.post(`${serverUrl}/api/auth/forgot/reset`, { email, otp, password }, { withCredentials: true })
        toast.success(res.data?.message || 'Password updated')
        setTimeout(() => {
          navigate('/login')
        }, 1200)
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Request failed'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {step === 1 && "Forgot Your Password?"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set New Password"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {step === 1 && "Enter your registered email to receive reset instructions."}
          {step === 2 && "Enter the verification code sent to your email."}
          {step === 3 && "Enter and confirm your new password."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {step === 3 && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {step === 1 && (isLoading ? "Sending..." : "Send OTP")}
            {step === 2 && (isLoading ? "Verifying..." : "Verify OTP")}
            {step === 3 && (isLoading ? "Updating..." : "Update Password")}
          </button>
        </form>

        {/* Back to Login */}
        {step === 1 && (
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-purple-600 hover:underline hover:text-purple-700">
              Back to Login
            </a>
          </div>
        )}
          {step === 2 && (
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-purple-600 hover:underline hover:text-purple-700">
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
