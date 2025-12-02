import express from 'express'
import { login, logout, signUp, requestPasswordReset, verifyResetOtp, resetPassword, googleAuth } from '../controller/authController.js'

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post('/forgot/request', requestPasswordReset)
authRouter.post('/forgot/verify', verifyResetOtp)
authRouter.post('/forgot/reset', resetPassword)
authRouter.post('/google', googleAuth)

export default authRouter