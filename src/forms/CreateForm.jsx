import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { getCookie } from '../utils/getCookie'
import axiosClient from '../api/axiosClient'

const CreateForm = () => {
    const { remoteId, token } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
        })

        const formData = new FormData(event.target)
        formData.append('remote_id', remoteId)

        console.log(getCookie('XSRF-TOKEN'))

        try {
            const response = await axiosClient.post('/photographer-store', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                },
                withCredentials: true,
            })
            
            event.target.reset()
            console.log(response.data)
            navigate(`/photographer/album/${response.data.albumId}/user/${response.data.userId}/${response.data.token}`)
        } catch (error) {
            console.error('Error in CreateForm handleSubmit:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
        {isLoading ? (
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '100vh' }}>
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        ) : (
            <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-light" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className=" mb-2 text-uppercase">Welcome</h2>
                                <p className="mb-5">Please enter your name and email!</p>

                                <form onSubmit={handleSubmit}>
                                    <FloatingLabel
                                        controlId='floatingInput'
                                        label='Name'
                                        className='mb-4'
                                    >
                                        <Form.Control className='bg-white' type='text' name='name' placeholder="John Doe" />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId='floatingInput'
                                        label='Email address'
                                        className='mb-4'
                                    >
                                        <Form.Control className='bg-white' type='email' name='email' placeholder="name@example.com" />
                                    </FloatingLabel>

                                    <Button 
                                        className="btn btn-lg px-5" 
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default CreateForm