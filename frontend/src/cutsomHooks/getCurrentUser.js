         import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

const getCurrentUser = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    
    // Get the current user data from the store
    const currentUserData = useSelector(state => state.user.userData)

    console.log('getCurrentUser hook called - isLoading:', isLoading, 'currentUserData:', currentUserData)

    useEffect(() => {
        console.log('getCurrentUser effect - currentUserData:', currentUserData, 'isLoading:', isLoading)
        
        let isMounted = true

        const fetchUser = async () => {
            try {
                if (!isMounted) return
                
                console.log('Fetching user from API...')
                setIsLoading(true)
                
                // Add a small delay to make loading state visible
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                const result = await axios.get(serverUrl + "/api/user/getcurrentuser", { 
                    withCredentials: true,
                    timeout: 10000 // 10 second timeout
                })
                
                if (!isMounted) return
                
                console.log('API response:', result.data)
                
                if (result.data && result.data._id) {
                    dispatch(setUserData(result.data))
                } else {
                    dispatch(setUserData(null))
                }
            } catch (error) {
                if (!isMounted) return
                
                console.log("Authentication error:", error)
                
                // Handle different types of errors
                if (error.response?.status === 401) {
                    // Unauthorized - clear user data
                    dispatch(setUserData(null))
                } else {
                    // Other errors - clear user data
                    dispatch(setUserData(null))
                }
            } finally {
                if (isMounted) {
                    console.log('Setting isLoading to false')
                    setIsLoading(false)
                }
            }
        }

        // Check if we need to fetch user data
        if (currentUserData) {
            console.log('User data already in store from persistence, skipping API call')
            // Add a small delay even when skipping API call to show loading briefly
            setTimeout(() => {
                if (isMounted) {
                    setIsLoading(false)
                }
            }, 500)
        } else {
            console.log('No user data in store, fetching from API...')
            fetchUser()
        }

        // Cleanup function
        return () => {
            isMounted = false
        }
    }, [dispatch, currentUserData])

    console.log('getCurrentUser hook returning - isLoading:', isLoading)
    return { isLoading }
}

export default getCurrentUser