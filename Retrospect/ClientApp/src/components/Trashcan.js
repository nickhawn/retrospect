import React, { useState, Fragment } from "react";
import { deleteFeedback } from "../services/apiService";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

export default function Trashcan({ itemId }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const removeItem = () => {
        setModal(!modal)
        deleteFeedback(itemId)
    };

    return (
        <Fragment>
            <Button onClick={toggle} className="bg-transparent text-secondary border-0 float-right" aria-label="Remove feedback">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash float-right" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
            </Button>
            <Modal toggle={toggle} className="modal-dialog-centered" isOpen={modal}>
                <ModalHeader toggle={toggle}>Delete Feedback?</ModalHeader>
                <ModalBody>
                    Are you sure you want to remove this feedback?
                </ModalBody>
                <ModalFooter className="border-0">
                    <Button color="primary" onClick={removeItem}>Yes</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}
