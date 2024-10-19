import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Single = () => {
    const location = useLocation()
    const image = location.state?.image || {}
    

    const touchStartTime = useRef(0)

    // Handle Touch start
    const handleTouchStart = () => {
        touchStartTime.current = Date.now().getTime()
    }

    // Handle Touch end
    const handleTouchEnd = () => {
        const touchEndTime = Date.now().getTime()
        const touchDuration = touchEndTime - touchStartTime.current

        if (touchDuration >= 300) { // 300 ms is the minimum duration for a long press
            alert('Long press detected!')
        }
    }

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
        <div className="row justify-content-center pt-5 pb-5">
            <div className="col-xl-8 col-lg-12 ">
                <p className="mb-4 text-center">
                    <img 
                        src={`${process.env.REACT_APP_API_BASE_URL}/${image.image}`} 
                        alt={image.date_add} 
                        className="img-fluid"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    />
                </p>
            </div>
            <p className='text-center'>Long click on the image and click save to camera roll</p>
        </div>
    )
}

export default Single