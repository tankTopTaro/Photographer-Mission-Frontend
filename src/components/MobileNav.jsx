import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Navbar = ({ fetchCaptures }) => {
    const [isSpinning, setIsSpinning] = useState(false)
    const [isCaptureView, setIsCaptureView] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const handleRefresh = () => {
        setIsSpinning(true)
        fetchCaptures()
        setTimeout(() => { setIsSpinning(false) }, 800)
    }

    const handleBack = () => { 
        navigate(location.state.fromPath)
     }

    useEffect(() => {
        setIsCaptureView(location.pathname.includes('/capture/'))
    }, [location])

    return (
        <div className="probootstrap-bar"> 
            <div className="probootstrap-refresh" onClick={isCaptureView ? handleBack : handleRefresh}>
                <span className={`oi ${isCaptureView ? 'oi-arrow-left' : 'oi-reload'} ${isSpinning ? 'spin' : ''}`}></span>
            </div>
            <div className="probootstrap-toggle js-probootstrap-toggle"><span className="oi oi-menu"></span></div>
            <div className="probootstrap-main-site-logo"><a onClick={handleBack}>Photo</a></div>
        </div>
    )
}

export default Navbar