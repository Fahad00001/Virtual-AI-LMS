import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
// import { set } from 'mongoose';
import { setlectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
const EditLecture = () => {
    const {courseId,lectureId}=useParams()
    const {lectureData}=useSelector(state=>state.lecture)
    // const selectedLecture=lectureData.find(lecture=>lecture._id===lectureId)
    // const [lecturetitle,setLecturetitle]=useState(selectedLecture.lecturetitle)
    const [videoUrl,setVideoUrl]=useState("")
    const [isPreviewFree,setIsPreviewfree]=useState(false)
    const [loading,setLoading]=useState(false)
    const [loading1,setLoading1]=useState(false)
const dispatch=useDispatch()

    const formData=new FormData()
    // formData.append("lectureTitle",lecturetitle)
    formData.append("videoUrl",videoUrl)
    formData.append("isPrevieFree",isPreviewFree)

    const handleEditLecture=async()=>{
        setLoading(true)
        try {
            const formData=new FormData()
            formData.append("videoUrl",videoUrl)
            formData.append("isPreviewFree",isPreviewFree)
            
            console.log("isPreviewFree state:", isPreviewFree);
            console.log("FormData isPrevieFree:", formData.get("isPrevieFree"));
            
            const result=await axios.post(serverUrl+`/api/course/editlecture/${lectureId}`,formData,{withCredentials:true})
            console.log(result.data);
            dispatch(setlectureData([...lectureData,result.data]))
            toast.success("Lecture Updated")
            navigate("/courses")
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setLoading(false)
            
        }

    }
    const navigate=useNavigate()

    const removelecture=async()=>{
        setLoading1(true)
        try {
            const result=await axios.delete(serverUrl+`/api/course/removelecture/${lectureId}`,{withCredentials:true})
            console.log(result.data);
            setLoading(false)
            navigate(`/createlecture/${courseId}`)
            toast.success("Lecture Removed")
          
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setLoading1(false)
            
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='w-full max-w-xl bg-white rounded-xl shadow-lg  p-6 space-y-6'>
            {/* header  */}
            <div className='flex items-center gap-2 mb-2'>
                <FaArrowLeft className='text-gray-600 font-semibold cursor-pointer' onClick={()=>navigate(`/createlecture/${courseId}`)}/>
                <h2 className='text-xl font-semibold text-gray-800'>Update Course Lecture</h2>
            </div>

            <button disabled={loading1} className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm' onClick={removelecture}>{loading1?<ClipLoader size={30} color='white'/>:"Remove Lecture"}</button>

            <div className='space-y-4 '>
                {/* <div >
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">Lecture Title *</label>
                    <input onChange={(e)=>setLecturetitle(e.target.value)} value={lecturetitle} className='w-full p-3 border border-gray-300 rounded-md text-sm  focus:ring-2  focus-ring-[black] focus:outline-none' required type="text" />
                </div> */}
                <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">Video *</label>
                <input className='w-full border border-gray-300 p-2 file:rounded-md file:mr-4 file:py-2 file:px-4 file:bg-gray-700 file:text-white hover:file:bg-gray-500' accept='video/*' required type="file" onChange={(e)=>setVideoUrl(e.target.files[0])} />    
                </div>

                <div className='flex items-center gap-3  '>
                    <input 
                        onChange={(e)=>setIsPreviewfree(e.target.checked)} 
                        checked={isPreviewFree} 
                        type="checkbox"  
                        className='accent-black h-4 w-4 ' 
                        id='isFree'
                    />
                    <label className='text-sm text-gray-700' htmlFor="isFree">Is this Video FREE</label>

                </div>
                {loading? <p>Uploading video...Please wait</p>:"" }
            </div>
            <div className='pt-4 '>
                
            <button disabled={loading} onClick={handleEditLecture} className='w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition'>{loading?<ClipLoader size={30} color='white'/>:"Update Lecture"}</button>
            </div>

        </div>
    </div>
  )
}

export default EditLecture