import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'

const getAllReviews = () => {
    const dispatch=useDispatch()

  useEffect(()=>{
    const allReviews=async()=>{
        try {
            const reuslt=await axios.get(serverUrl+"/api/review/getreview",{withCredentials:true})
            dispatch(setReviewData(reuslt.data))
            console.log(reuslt.data);
            

        } catch (error) {
            console.log(error);
            
        }
    }
    allReviews()
  },[])
}

export default getAllReviews