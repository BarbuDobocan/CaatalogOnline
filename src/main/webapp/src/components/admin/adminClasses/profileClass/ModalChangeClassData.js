import {Button, Form, Modal} from "react-bootstrap";
import React from "react";

function ModalChangeClassData(props) {
    return (
        <Modal show={props.modalChangeClass} onHide={props.hideModalChangeClass}>
            <Modal.Header closeButton>Schimba Numele/Anul</Modal.Header>
            <Modal.Body>
                <Form.Label>Anul:</Form.Label>
                <Form.Control onChange={props.handleNewClassYear} placeholder="Anul clasei"/>

                <Form.Label>Numele:</Form.Label>
                <Form.Control onChange={props.handleNewClassName} placeholder="Numele clasei"/>

                <Button onClick={props.changeClassData}>SALVEAZA</Button>
            </Modal.Body>
        </Modal>
    );
}
export default ModalChangeClassData;
