import {Button, Form, Modal} from "react-bootstrap";
import React from "react";

// newCoursModal={this.state.newCoursModal}
//
// handleNewCoursName={this.handleNewCoursName}
// hideNewCoursModal={this.hideNewCoursModal}
// createNewCours={this.createNewCours}

function ModalForNewCours(props) {
    return (
        <Modal show={props.newCoursModal} onHide={props.hideNewCoursModal}>
            <Modal.Header closeButton>ADAUGA UN CURS NOU</Modal.Header>
            <Modal.Body>
                <Form.Label>Numele cursului:</Form.Label>
                <Form.Control onChange={props.handleNewCoursName} placeholder="Nume"/>

                <Button onClick={props.createNewCours}>SALVEAZA</Button>
            </Modal.Body>
        </Modal>
    );
}
export default ModalForNewCours;
