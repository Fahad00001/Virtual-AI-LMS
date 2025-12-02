import express from 'express'
import { CreateCourse, createLecture, editCourse, editLecture, getCourseById, getcourseLecture, getCreatorById, getCreatorCourses, getPublishedCourse, removeCourse, removeLecture } from '../controller/courseController.js'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { SearchWithAi } from '../controller/searchController.js'

const courseRouter=express.Router()

courseRouter.post("/create",isAuth,CreateCourse)
courseRouter.get("/getpublished",getPublishedCourse)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse)
courseRouter.get("/getcoursebyid/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)


// for lecture 
courseRouter.post("/createlecture/:courseId",isAuth,createLecture)
courseRouter.get("/courselecture/:courseId",isAuth,getcourseLecture)
courseRouter.post("/editlecture/:lectureId",isAuth,upload.single("videoUrl"),editLecture)
courseRouter.delete("/removelecture/:lectureId",isAuth,removeLecture)
courseRouter.post("/creator",isAuth,getCreatorById)

// for search 
courseRouter.post("/search",SearchWithAi)
export default courseRouter