import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalButton = ({ modalContet, title, btnName }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenMoadl = () => {
        setShowModal(true);
    }

    return (
        <div>
            <Button variant="primary" onClick={handleOpenMoadl}>{btnName}</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContet}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalButton;