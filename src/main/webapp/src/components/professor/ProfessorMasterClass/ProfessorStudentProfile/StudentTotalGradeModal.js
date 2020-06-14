import React from 'react';
import {Button, Modal, Row} from "react-bootstrap";



function AssignTotalGradeModal(props){

    return (
        <Modal show={props.totalGradeModal} onHide={props.hideTotalGradeModal}>
            <Modal.Header closeButton>Incheiati media</Modal.Header>
            <Modal.Body>
                {
                     props.scolarYearStructure &&
                     props.scolarYearStructure.semIstart &&
                    props.studentAllFinalGrades &&
                    props.studentAllFinalGrades.listGrades.map((item, index)=>{
                        return(
                            <Row>
                                <h6>{index}) </h6>
                                {
                                    item.semI
                                    && <h6>{item.semI.cours.coursName}: {item.semI.grade}</h6>
                                }
                            </Row>
                        )
                    })
                }
                {
                    props.scolarYearStructure &&
                    props.scolarYearStructure.semIIstart &&
                    props.studentAllFinalGrades &&
                    props.studentAllFinalGrades.listGrades.map((item, index)=>{
                        return(
                            <Row>
                                <h6>{index}) </h6>
                                {
                                    item.semII
                                    && <h6>{item.semII.cours.coursName}: {item.semII.grade}</h6>
                                }
                            </Row>
                        )
                    })
                }
                {
                    props.totalGrade === null
                    ?
                    <Button onClick={props.makeTotalAverage}>
                    Calculati media
                    </Button>
                        :
                        <Row>
                        <h5>
                           Incheiati studentul cu media {props.totalGrade}?
                        </h5>
                            <Button onClick={props.setTotalGradeForStudent}>
                                Incheiati Media
                            </Button>
                        </Row>

                }

            </Modal.Body>
        </Modal>
    )
}

export default AssignTotalGradeModal;
