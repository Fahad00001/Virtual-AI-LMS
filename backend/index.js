import express from "express"
import dotenv  from 'dotenv'
import connectDb from "./config/connectDB.js"
import cookieParser from "cookie-parser"
import authRouter from "./route/authRoute.js"
import cors from 'cors'
import userRouter from "./route/userRoute.js"
import courseRouter from "./route/courseRoute.js"
import paymentRouter from "./route/paymentRoute.js"
import reviewRouter from "./route/reviewRoute.js"
dotenv.config()

const port=process.env.PORT
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
<<<<<<< HEAD
    origin: "http://localhost:5173",
=======
    origin: "https://ai-powerd-lms-3.onrender.com",
>>>>>>> f9debe746dfb321d029133dca084d0ca63a5c25a
    credentials: true,
}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course",courseRouter)
app.use("/api/order",paymentRouter)
app.use("/api/review",reviewRouter)

app.get("/",(req,res)=>{
    res.send("hello from server")

})
app.listen(port,()=>{
    // console.log("server started");
    console.log(`Server started on port ${port}`);
    connectDb()

    
})
