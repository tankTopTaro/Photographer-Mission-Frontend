import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalComponent = ({ className, title, show, close, children}) => {
  return (
    <Modal
        className={className}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
            <div onClick={close} className='d-flex align-items-center pe-auto' >
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2e2e2e"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>
  )
}

export default ModalComponent