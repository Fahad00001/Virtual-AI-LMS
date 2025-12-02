import User from "../model/userModel.js"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import genToken from "../config/token.js"
// import crypto from 'crypto'
import sendMail from "../config/sendMail.js"
export const signUp=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
        let existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"user already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter valid email"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter strong password"})
        }
        let hasedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:hasedPassword,
            role
        })

        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`SignUp Error ${error}`})
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        let user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        let isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }

        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:`login Error ${error}`})
    }

}

export const logout=async(req,res)=>{
    try {
        await res.clearCookie("token",{
            httpOnly: true,
    secure: true,      // true if deployed on https
    sameSite: "none",
        })
        return res.status(200).json({message:"Logout succesfully"})
    } catch (error) {
        return res.status(500).json({message:`logout Error ${error}`})
    }
}

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Valid email is required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const otp = (Math.floor(100000 + Math.random() * 900000)).toString()
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.resetOtp = otp
        user.resetOtpExpiry = expiry
        user.isOtpVerify=false
        await user.save()
        await sendMail(email,otp)

        // TODO: integrate email service. For now, return OTP in dev response.
        return res.status(200).json({ message: "OTP sent to email", devOtp: otp })
    } catch (error) {
        return res.status(500).json({ message: `requestPasswordReset Error ${error}` })
    }
}

export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.resetOtp || !user.resetOtpExpiry) {
            return res.status(400).json({ message: "Invalid request" })
        }
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        if (new Date() > new Date(user.resetOtpExpiry)) {
            return res.status(400).json({ message: "OTP expired" })
        }
        // Mark OTP as verified without clearing resetOtp/resetOtpExpiry yet,
        // so the reset endpoint can still validate the same OTP.
        user.isOtpVerify = true
        await user.save()
        return res.status(200).json({ message: "OTP verified" })
        
    } catch (error) {
        return res.status(500).json({ message: `verifyResetOtp Error ${error}` })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        const user = await User.findOne({ email })
        if (!user || !user.resetOtp || !user.resetOtpExpiry) {
            return res.status(400).json({ message: "Invalid request" })
        }
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        if (new Date() > new Date(user.resetOtpExpiry)) {
            return res.status(400).json({ message: "OTP expired" })
        }
        const hashed = await bcrypt.hash(password, 10)
        user.password = hashed
        user.resetOtp = null
        user.resetOtpExpiry = null
        user.isOtpVerify = false
        await user.save()
        return res.status(200).json({ message: "Password updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: `resetPassword Error ${error}` })
    }
}

export const googleAuth=async(req,res)=>{
    try {
        const { name, email, role, photoUrl } = req.body
        if (!email) {
            return res.status(400).json({ message: 'Email is required' })
        }

        let user = await User.findOne({ email })
        if (!user) {
            const finalRole = role === 'educator' ? 'educator' : 'student'
            user = await User.create({
                name: name || 'User',
                email,
                password: '',
                role: finalRole,
                photoUrl: photoUrl || ''
            })
        }

        const token = await genToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `googleAuth Error ${error}` })
    }

}
