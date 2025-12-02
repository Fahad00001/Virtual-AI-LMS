import uploadonCloudinary from "../config/cloudinary.js"
import User from "../model/userModel.js"

export const getCurrentUser=async(req,res)=>{
    try {
        console.log('getCurrentUser called with userId:', req.userId);
        
        if (!req.userId) {
            return res.status(400).json({message: "No userId provided"});
        }
        
        const user=await User.findById(req.userId).select("-password").populate("enrolledCourses")
        console.log('User found:', user ? 'Yes' : 'No');
        
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.error('getCurrentUser error:', error);
        return res.status(500).json({message:`GetCurrentuser error ${error.message}`})
    }
}


export const updateProfile=async(req,res)=>{
    try {
        const userId=req.userId
        const {description,name}=req.body
        let photoUrl
        if(req.file){
            photoUrl=await uploadonCloudinary(req.file.path)
        }
        const user=await User.findByIdAndUpdate(userId,{name,description,photoUrl})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`UpdateProfile error ${error}`})
    }
}