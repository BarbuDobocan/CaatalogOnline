import React from 'react';
import {Modal, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";


function optionsGrade(){
    let a = [];
    for(let i=1;i<=10;i++){
        a.push(<option>{i}</option>)
    }
    return a;
}

function ProfileStudentAssignNewThesis(props) {
    return (
        <Modal show={props.newTezaModal} onHide={props.hideNewTezaModal}>
            <Modal.Header closeButton> Adauga TEZA </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                            <Form.Label>Alegeti nota</Form.Label>
                            <Form.Control onChange={props.handleSelectNewTezaGrade}  as="select">
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
                                selected={ props.newTezaDate }
                                onChange={ props.handleSelectNewTezaDate }
                                name="startDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button onClick = {props.assignNewThesis}>
                    Adaugati teza
                </Button>
            </Modal.Body>
        </Modal>
    );
}
export default ProfileStudentAssignNewThesis;
