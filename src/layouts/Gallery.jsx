import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SpinnerComponent from '../components/SpinnerComponent'
import CryptoJS from 'crypto-js'
import useFetchCaptures from '../utils/useFetchCaptures'
import { useState } from 'react'

const Gallery = () => {
    const { albumId, userId, token: initialToken } = useParams()

    const [token, setToken] = useState(initialToken)

    const { isLoading, images, loadedImages, handleImageLoad } = useFetchCaptures(albumId, userId, token)

    const location = useLocation()

    const navigate = useNavigate()

    const salt = process.env.REACT_APP_SALT

    const openImage = (image) => {
        const captureToken = CryptoJS.SHA256(salt + albumId + userId + image.id).toString(CryptoJS.enc.Hex)

        navigate(`/photographer/album/${albumId}/user/${userId}/capture/${image.id}/${captureToken}`, { 
            state: {
                image: image,
                fromPath: location.pathname
            }
        })
    }
    
    return (
        <div className="card-columns pt-5">
            {isLoading && (<SpinnerComponent />)}
            {images.map((im) => (
                <div className={`card ${loadedImages[im.id] ? 'image-loaded' : ''}`} onClick={() => openImage(im)} key={im.id}>
                    <img onLoad={(ev) => handleImageLoad(ev, im.id)} className="card-img-top probootstrap-animate" src={`${process.env.REACT_APP_API_BASE_URL}/${im.image}`} alt={im.date_add}/>
                </div>
            ))}
        </div>  
    )
}

Gallery.displayName = 'Gallery'

export default Gallery