import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function ModalDeleteUser(props){
    return(
        <Modal show={props.deleteUserModal} onHide={props.hideDeleteUserModal}>
            <Modal.Header closeButton>Stergeti Utilizatorul</Modal.Header>
            <Modal.Body>
                Toata datele utlizatorului vor fi sterse!
            </Modal.Body>
            <Button onClick={props.deleteUserDataOK}>
                OK
            </Button>
        </Modal>
    )
}

export default ModalDeleteUser;
