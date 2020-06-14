import {Button, Form, Modal} from "react-bootstrap";
import React from "react";

function ModalForNewClass(props) {
    return (
        <Modal show={props.modalForNewClass} onHide={props.hideNewClassModal}>
            <Modal.Header closeButton>ADAUGA O CLASA NOUA</Modal.Header>
            <Modal.Body>
                <Form.Label>Anul:</Form.Label>
                <Form.Control onChange={props.handleNewClassYear} placeholder="Anul noii clase"/>

                <Form.Label>Numele:</Form.Label>
                <Form.Control onChange={props.handleNewClassName} placeholder="Numele noii clase"/>

                <Button onClick={props.addNewClass}>SALVEAZA</Button>
            </Modal.Body>
        </Modal>
    );
}
export default ModalForNewClass;
