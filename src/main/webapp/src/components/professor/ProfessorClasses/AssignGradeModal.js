import React from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function optionsGrade(){
    let a = [];
    for(let i=1;i<=10;i++){
        a.push(<option>{i}</option>)
    }
    return a;
}

function AssignGradeModal(props) {
    let columnss = [
        {
            text: 'Materie',
            dataField: 'cours.coursName',
            sort: true
        },
        {
            text: 'Nota',
            dataField: 'grade',
            sort: true,
        },
        {
            text: 'Profesor',
            dataField: 'professorName',
            sort: true,
        }
    ];
    return(
        <Modal show={props.newGradeModal} onHide={props.hideNewGradeModal}>
                <Modal.Header closeButton>Adaugati o nota noua</Modal.Header>
                <Modal.Body>
                    {
                        props.yearStructure
                        && !props.yearStructure.scolarYearStructure.semIstart
                        && !props.yearStructure.scolarYearStructure.semIIstart
                        ?
                            <div>Nu se pot adauga note pentru ca nu a incept semestrul</div>
                                    :
                        props.professorClassCourses && props.professorClassCourses.length === 0
                                ?
                            <div>Se pare ca nu predati cursuri care sa fie invatate de aceasta clasa.</div>
                            :
                            <div>
                                <Form.Group>
                                    <Form.Label>Alegeti materia</Form.Label>
                                    <Form.Control onChange={props.handleSelectedCours} as="select">
                                        {
                                            props.professorClassCourses && props.professorClassCourses.map((item)=> {
                                                return(<option value={item.id}>{item.coursName}</option>)
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>

                                    <ToolkitProvider
                                        keyField="id"
                                        data={ props.finalGradeForStudentData ? props.finalGradeForStudentData.studentGradesResponse : [] }
                                        columns={ columnss }
                                    >
                                        {
                                            proprieties => (
                                                <div>
                                                    <BootstrapTable
                                                        { ...proprieties.baseProps }
                                                        pagination={ paginationFactory() }
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>

                                <Row>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Group>
                                                <Form.Label>Alegeti nota</Form.Label>
                                                <Form.Control onChange={props.handleSelectedGrade}  as="select">
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
                                                selected={ props.startDate }
                                                onChange={ props.handleSelectDateForNewGrade }
                                                name="startDate"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {
                                    props.finalGradeForStudentData && !props.finalGradeForStudentData.finalGradeCours ?
                                        <Button onClick={props.assignNewGradeToStudent}>
                                            Adaugati nota
                                        </Button>
                                        :
                                        <h5>
                                            Studentul are media incheiata
                                        </h5>
                                }
                            </div>
                    }
                </Modal.Body>
        </Modal>
    );
};
export default AssignGradeModal;
