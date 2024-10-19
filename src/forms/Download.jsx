import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCookie } from '../utils/getCookie'
import { Button, Spinner } from 'react-bootstrap'
import axiosClient from '../api/axiosClient'

const Download = () => {
  const {albumId, userId, token} = useParams()
  const [fileName, setFileName] = useState(null)
  const [fileSize, setFileSize] = useState(null)
  const [isZipping, setIsZipping] = useState(false)

  const getCSRFCookie = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
  })
}

  const handleDownload = async () => {
    setIsZipping(true)

    await getCSRFCookie()

    const payload = {
      album_id: albumId,
      user_id: userId,
      token: token
    }

    try {
      const response = await axiosClient.post('/photographer/album-download', payload, {
        headers: {
          'Accept': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        withCredentials: true
      })

      console.log(response.data)

      if (response.data.file_name) {
        setFileName(response.data.file_name)
        setFileSize(response.data.file_size)
      }
    } catch (error) {
      console.error('Error in handleDownload:', error)
    } finally {
      setIsZipping(false)
    }
  }

  const downloadFile = async () => {

    await getCSRFCookie()

    try {
      const response = await axiosClient.get(`/photographer/download/album/${albumId}/user/${userId}/file/${fileName}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        withCredentials: true
      })

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file:', response.status)
      }
    } catch (error) {
      console.error('Error in downloadFile:', error)
    }
  }

  const formatFileSize = (size) => {
    if (size < 1024) return size + ' Bytes';
        else if (size < 1048576) return (size / 1024).toFixed(2) + ' KB';
        else return (size / 1048576).toFixed(2) + ' MB';
  }

  return (
    <div className="container mt-4">
        {isZipping ? (
            <div className="text-center">
                <Spinner animation="border" role="status" variant="primary" />
                <p className="mt-2">Zipping album, please wait...</p>
            </div>
        ) : (
            <div>
            {fileName ? (
                <>
                    <p><strong>File Name:</strong> {fileName}</p>
                    <p><strong>File Size:</strong> {formatFileSize(fileSize)}</p>
                    <Button onClick={downloadFile} variant="success">Download Album</Button>
                </>
            ) : (
              <Button variant="primary" onClick={handleDownload}>
                  Prepare Download
              </Button>
            )}
            </div>
        )}
    </div>
  )
}

export default Download