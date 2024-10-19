import React, { useEffect, useState } from 'react'
import CreateForm from '../forms/CreateForm'
import { useParams } from 'react-router-dom'
import RemoteInUse from './RemoteInUse'
import axiosClient from '../api/axiosClient'

const RemoteCheck = () => {
    const { remoteId, token } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [availableRemotes, setAvailableRemotes] = useState([])
    const [isRemoteAvailable, setIsRemoteAvailable] = useState(false)

    useEffect(() => {
        const fetchAvailableRemotes = async () => {
        setIsLoading(true)
        try {
            const response = await axiosClient.get('/admin')

            const remotes = response.data.availableRemotes || []
            setAvailableRemotes(remotes)

            const remoteExists = remotes.some(remote => remote.id === parseInt(remoteId))
            setIsRemoteAvailable(remoteExists)
        } catch (error) {
            console.error('Error in fetchAvailableRemotes:', error)
        } finally {
            setIsLoading(false)
        }
        }

        fetchAvailableRemotes()
    }, [remoteId, token])

    return (
        <> 
        {isRemoteAvailable ? <CreateForm /> : <RemoteInUse />}
        </>
    )
}

export default RemoteCheck