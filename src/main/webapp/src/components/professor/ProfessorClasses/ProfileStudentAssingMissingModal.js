import React from 'react';
import {Modal, Form, Row, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";

function ProfileStudentAssignMissingModal(props) {
    return(
        <Modal show={props.newMissingModal} onHide={props.hideNewMissingModal}>
            <Modal.Header closeButton> Adaugati Absenta </Modal.Header>
            <Modal.Body>

                <Form.Group>
                    <Form.Label>Alegeti data</Form.Label>
                    <DatePicker
                        selected={ props.newMissingDate }
                        onChange={ props.handleSelectNewMissingDate }
                        name="startDate"
                        dateFormat="dd/MM/yyyy"
                    />
                </Form.Group>
                    <Button onClick={props.assignMissingToStudentA}>
                        Adaugati absenta
                    </Button>

            </Modal.Body>
        </Modal>
    )
}

export default ProfileStudentAssignMissingModal;
