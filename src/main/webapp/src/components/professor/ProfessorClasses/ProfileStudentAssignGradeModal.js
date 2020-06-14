import React from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import DatePicker from "react-datepicker";

function optionsGrade(){
    let a = [];
    for(let i=1;i<=10;i++){
        a.push(<option>{i}</option>)
    }
    return a;
}
function ProfileStudentAssignGradeModal(props) {
    return(
        <Modal show={props.newGradeModal} onHide={props.hideNewGradeModal}>
            <Modal.Header closeButton> Adauga nota </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                            <Form.Label>Alegeti nota</Form.Label>
                            <Form.Control onChange={props.handleNewGrade}  as="select">
                                {
                                    optionsGrade()
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                            <Form.Label>Alegeti data</Form.Label>
                            <DatePicker
                                selected={ props.newGradeDate }
                                onChange={ props.handleNewGradeDate }
                                name="startDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                    <Button onClick = {props.assignGradeToStudent}>
                        Adaugati nota
                    </Button>
            </Modal.Body>
        </Modal>
    )
}

export default ProfileStudentAssignGradeModal;
