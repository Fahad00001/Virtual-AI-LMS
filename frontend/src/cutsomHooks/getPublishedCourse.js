import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'

const getPublishedCourse = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getCourseData = async () => {
            try {
                console.log("Making API call to:", serverUrl + "/api/course/getpublished")
                const result = await axios.get(serverUrl + "/api/course/getpublished", { withCredentials: true })
                console.log("API Response:", result)
                console.log("API Response data:", result.data)
                console.log("Dispatching to Redux:", result.data)
                dispatch(setCourseData(result.data))
                console.log("Redux dispatch completed")
                
            } catch (error) {
                console.log("Error fetching courses:", error)
                console.log("Error response:", error.response)
                
            }
        }
        
        console.log("getPublishedCourse hook called, dispatching getCourseData")
        getCourseData() // Call the function
    }, [dispatch]) // Add dispatch to dependency array
    
    return null // Return null since this is a side-effect hook
}

export default getPublishedCourse