import { QRCodeSVG } from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'

const InviteQR = ({ modalShow }) => {
  const { albumId } = useParams()
  const salt = process.env.REACT_APP_SALT
  const [token, setToken] = useState('')

  useEffect(() => {
    const newRandomId = Math.floor(Math.random() * 10000)
    const newToken = CryptoJS.SHA256(salt + albumId + newRandomId).toString(CryptoJS.enc.Hex)
    setToken(newToken)
  }, [modalShow, albumId])

  const url = `${process.env.REACT_APP_BASE_URL}/photographer/album/${albumId}/${token}`
  return (
    <div className="w-100 d-flex justify-content-center">
      <QRCodeSVG value={url} size={200}  />
    </div>
  )
}

export default InviteQR