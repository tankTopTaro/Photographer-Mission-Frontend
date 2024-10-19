import React from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getCookie } from '../utils/getCookie'
import axiosClient from '../api/axiosClient'
import axios from 'axios'

const EmailForm = ({content, setModalShow, setIsLoading}) => {
    const { albumId, userId } = useParams()

    const getCSRFCookie = async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
        })
    }

    const postFormData = async (url, formData) => {
        await getCSRFCookie()

        try {
            await axiosClient.post(url, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                },
                withCredentials: true
            })
            setModalShow(false)
        } catch (error) {
            console.error('Error in EmailForm postFormData:', error)
        } finally {
            setIsLoading(false)
        }
    }
    

    const handleDownloadLive = async (formData) => {
        await postFormData('/photographer/email-update', formData)
    }

    const handleInviteLongterm = async (formData) => {
        await postFormData('/photographer/friend-invite', formData)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        setIsLoading(true)

        const formData = new FormData(ev.target)
        formData.append('album_id', albumId)
        formData.append('user_id', userId)

        const formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)

        if (content === 'download-live') {
            handleDownloadLive(formData)
        } else if (content === 'invite-longterm') {
            handleInviteLongterm(formData)
        } 
    }

    return (
        <form onSubmit={handleSubmit}>
            <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-4'
            >
                <Form.Control type='email' name='email' placeholder="name@example.com" />
            </FloatingLabel>
            <Button 
                as="input" 
                type="submit" 
                value="Submit" 
            />
        </form>
    )
}

export default EmailForm