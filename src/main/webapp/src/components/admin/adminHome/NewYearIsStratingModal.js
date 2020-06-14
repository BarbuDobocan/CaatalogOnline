import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function NewYearIsStartingModal(props){
    return(
        <Modal show={props.newYearModal} onHide={props.hideNewYearModal}>
            <Modal.Header closeButton>Incepeti An Nou</Modal.Header>
            <Modal.Body>
                <h6>Se va creea o copie a situatiei scolare,
                    dupa care v-or fi sterse toate notele,
                    absente, tezele si mediile din sistem!</h6>
            </Modal.Body>
            <Button onClick={props.startNewYear}>OK</Button>
        </Modal>
    )
}
export default NewYearIsStartingModal;
