// src/hooks/useFetchCaptures.js
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import axiosClient from '../api/axiosClient'
import { useLocation } from 'react-router-dom'

const useFetchCaptures = (albumId, userId, token) => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])
    const [loadedImages, setLoadedImages] = useState({})
    const [userStatus, setUserStatus] = useState('live')
    
    const touchStartY = useRef(0)
    const touchEndY = useRef(0)

    

    // Fetch the images from the API
    const fetchCaptures = async () => {
        setIsLoading(true)
        try {
            const response = await axiosClient.get(`/photographer/album/${albumId}/user/${userId}/${token}`)
            setImages((prevImages) => {
                const newImages = response.data.captures.filter(newImage => 
                    !prevImages.some(prevImage => prevImage.id === newImage.id)
                )

                const sortNewImages = newImages.sort((a, b) => {
                    return new Date(b.date_add) - new Date(a.date_add)
                })

                return [...sortNewImages, ...prevImages] // Append new images to the top
            })
        } catch (error) {
            console.error('Error in fetchCaptures:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Fetch User status
    const fetchUserStatus = async () => {
        try {
            const response = await axiosClient.get(`/admin`)
            const updatedUserStatus = response.data.users.filter(user => user.id === userId)[0]?.status
            
            if(updatedUserStatus !== userStatus) {
                setUserStatus(updatedUserStatus)

                if(updatedUserStatus === 'longterm') {
                    fetchCaptures()
                }
            }
            
        } catch (error) {
            console.error('Error in fetchUserStatus:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Manual refresh when user swipes down
    const handleTouchStart = (ev) => {
        touchStartY.current = ev.touches[0].clientY

        //ev.preventDefault()
    }

    const handleTouchMove = (ev) => {
        touchEndY.current = ev.touches[0].clientY

        // Prevent default to disable pull-to-refresh
        if (touchStartY.current < touchEndY.current) {
            ev.preventDefault()
        }
    }

    const handleTouchEnd = () => {
        // Detect a downward swipe (threshold is 50px)
        if (touchStartY.current - touchEndY.current > 50) {
            fetchCaptures() // Trigger Manual Refresh
        }
    }

    useEffect(() => {
        // Check the current route 
        const isCaptureRoute = location.pathname.includes('/capture/')

        // Only fetch if we're on the appropriate route
        if (!isCaptureRoute) {
            fetchCaptures()
            fetchUserStatus()
            
            // Set up interval for periodic fetches (every 20 seconds)
            const fetchCaptureInterval = setInterval(fetchCaptures, 20000)
            const fetchUserStatusInterval = setInterval(fetchUserStatus, 20000)

            // Fetch on focus and visibility change
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    fetchCaptures()
                }
            }

            const handleFocus = () => {
                fetchCaptures()
            }

            window.addEventListener('focus', handleFocus)
            window.addEventListener('visibilitychange', handleVisibilityChange)

            // Add touch event listeners
            window.addEventListener('touchstart', handleTouchStart)
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchend', handleTouchEnd)

            // Clean up event listeners
            return () => {
                clearInterval(fetchCaptureInterval)
                clearInterval(fetchUserStatusInterval)
                window.removeEventListener('focus', handleFocus)
                window.removeEventListener('visibilitychange', handleVisibilityChange)
                window.removeEventListener('touchstart', handleTouchStart)
                window.removeEventListener('touchmove', handleTouchMove)
                window.removeEventListener('touchend', handleTouchEnd)
            }
        }
        
    }, [albumId, userId, token, location.pathname]) // Add dependencies to effect

    // Image loading event handler
    const handleImageLoad = (ev, id) => {
        const img = ev.target
        img.classList.add('fadeInUp', 'probootstrap-animated')
        setLoadedImages((prev) => ({ ...prev, [id]: true }))
    }

    return { isLoading, images, loadedImages, handleImageLoad, fetchCaptures }
}

export default useFetchCaptures
