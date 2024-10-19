import { useEffect, useState } from "react"
import { navLists } from "../constants"
import { useParams } from "react-router-dom"
import axiosClient from "../api/axiosClient"

const Aside = ({ handleShowModal, asideRef }) => {
    const { albumId } = useParams()
    const [access, setAccess] = useState('live')

    useEffect(() => {
        const fetchAlbumAccess = async () => {
            try {
                const response = await axiosClient.get('/admin')
                const album = response.data.albums.filter(album => album.id === parseInt(albumId))
                if (album.length > 0) {
                    setAccess(album[0].status)
                }
            } catch (error) {
                console.error('Error in Aside fetchAlbumAccess:', error)
            }
        }
        fetchAlbumAccess()
    }, [albumId])

    const filteredNavLists = navLists.filter(item => item.access === access)

    return (
        <aside ref={asideRef} className="probootstrap-aside js-probootstrap-aside">
            <a href="#" className="probootstrap-close-menu js-probootstrap-close-menu d-md-none"><span className="oi oi-arrow-left"></span> Close</a>
            <div className="probootstrap-site-logo probootstrap-animate" data-animate-effect="fadeInLeft">
                <a className="mb-2 d-block probootstrap-logo">Photographer</a>
            </div>
            <div className="probootstrap-overflow">
                <nav className="probootstrap-nav">
                <ul>
                    {filteredNavLists.map((item, i) => (
                        <li 
                            key={i}
                            className="probootstrap-animate" data-animate-effect="fadeInLeft"
                        >
                            
                            <a className="pe-auto text-uppercase" onClick={() => handleShowModal(item.title, item.content)}>
                            <img src={item.icon} alt={item.title} style={{ width: '32px', height: '32px'}}/>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
                </nav>
                <footer className="probootstrap-aside-footer probootstrap-animate" data-animate-effect="fadeInLeft">
                    <ul className="list-unstyled d-flex probootstrap-aside-social">
                        <li><a href="#" className="p-2"><span className="icon-twitter"></span></a></li>
                        <li><a href="#" className="p-2"><span className="icon-instagram"></span></a></li>
                        <li><a href="#" className="p-2"><span className="icon-dribbble"></span></a></li>
                    </ul>
                    <p>&copy; 2017 <a href="https://uicookies.com/" target="_blank">uiCookies:Aside</a>. <br/> All Rights Reserved.</p>
                </footer>
            </div>
        </aside>
    )
}

export default Aside