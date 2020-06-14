import React from "react";
import {Form, Modal, Row, Col, Button} from "react-bootstrap";

function AssignFinalGradeModal(props){
        return (
            <Modal show={props.newFinalGradeModal} onHide={props.hideNewFnalGradeModal}>
                <Modal.Header closeButton>Incheiati media</Modal.Header>
                <Modal.Body>
                    {
                            props.grades && props.grades.length > 0
                            ?
                        <div>
                            <Row>
                                <h6>Note:</h6>
                                {
                                        props.grades && props.grades.map((item) => {
                                        return (
                                            <h6>
                                                {item.grade};
                                            </h6>
                                        )
                                    })
                                }
                            </Row>
                            <Row>
                               {
                                       props.thesis && props.thesis.length > 0
                                           &&
                                     <h6>Teza: {props.thesis[0].grade}</h6>
                               }
                            </Row>
                            <Row>
                                {
                                    props.newFinalGrade === null ?
                                        <Button onClick={props.makeAverage}>
                                            Claculati Media
                                        </Button>
                                        :
                                        <div>
                                            <h6>Media: {props.newFinalGrade}</h6>
                                            <h6>Incheiati media cu nota {Math.round(props.newFinalGrade)}?</h6>
                                            <Button onClick={props.assignNewFinalGradeToStudentA}>
                                                DA
                                            </Button>
                                        </div>
                                }

                            </Row>
                        </div>
                            :
                            <div>
                                Studentul trebuie sa aiba note pentru a avea o medie
                            </div>
                    }
                </Modal.Body>
            </Modal>
        )
}

export default AssignFinalGradeModal;
