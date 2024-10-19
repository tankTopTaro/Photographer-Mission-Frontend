import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InviteForm from '../forms/InviteForm'
import NotFound from './NotFound'
import axiosClient from '../api/axiosClient'

const InviteCheck = () => {
    const { albumId, token } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        const checkInviteToken = async () => {
            setIsLoading(true)
            try {
                const response = await axiosClient.get(`/check-token/${albumId}/${token}`)
                if (response.data.used) {
                    setIsTokenValid(true)
                } else {
                    setIsTokenValid(false)
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setIsTokenValid(false)
                } else {
                    console.error('Error in checkInviteToken:', error)
                }
            } finally {
                setIsLoading(false)
            }
        }

        checkInviteToken()
    }, [albumId, token])

    return (
        <>  
        {isTokenValid ? <NotFound /> : <InviteForm />}
        </>
    )
}

export default InviteCheck