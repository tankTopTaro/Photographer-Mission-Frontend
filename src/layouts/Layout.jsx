import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toggleMenu } from '../utils/toggleMenu'
import { animateOnScroll } from '../utils/animateOnScroll'
import { carousel } from '../utils/carousel'
import useFetchCaptures from '../utils/useFetchCaptures'
import Aside from '../components/Aside'
import SpinnerComponent from '../components/SpinnerComponent'
import Navbar from '../components/MobileNav'
import Footer from '../components/Footer'
import ModalComponent from '../components/ModalComponent'
import EmailForm from '../forms/EmailForm'
import Download from '../forms/Download'
import InviteQR from '../forms/InviteQR'

const Layout = ({ children }) => {
    const { albumId, userId, token } = useParams()
    const { fetchCaptures } = useFetchCaptures(albumId, userId, token)
    
    const asideRef = useRef(null)
    const mainRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalContent, setModalContent] = useState({
        title: '',
        content: ''
    })

    const handleShowModal = (title, content) => {
        setModalContent({title, content})
        setModalShow(true)
    }

    useEffect(() => {
        animateOnScroll()
        carousel()

        const cleanUpToggleMenu = toggleMenu(asideRef.current, mainRef.current)

        return () => {
            cleanUpToggleMenu()
        }
    }, [])

  return (
    <>
    <Aside handleShowModal={handleShowModal} asideRef={asideRef}/>

    { isLoading && (<SpinnerComponent />) }

    <main ref={mainRef} role="main" className="probootstrap-main js-probootstrap-main">
        <Navbar fetchCaptures={fetchCaptures}/>
            {children}
        <Footer />
    </main>

    <ModalComponent show={modalShow} close={() => setModalShow(false)} title={modalContent.title}>
        {modalContent.content === 'download-live' && (<EmailForm content={modalContent.content} setModalShow={setModalShow} setIsLoading={setIsLoading}/>)}
        {modalContent.content === 'invite-live' && (<InviteQR modalShow={modalShow} />)}
        {modalContent.content === 'invite-longterm' && (<EmailForm content={modalContent.content} setModalShow={setModalShow} setIsLoading={setIsLoading} />)}
        {modalContent.content === 'download-longterm' && (<Download />)}
    </ModalComponent>
    </>
  )
}

export default Layout