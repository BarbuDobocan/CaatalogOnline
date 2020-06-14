import React from "react";
import DatePicker from 'react-datepicker';
import {Button, Form, Modal} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function missingsTableSmallFormatter(cell,row){
    if(row.motivated){
        return(<div>MOTIVATA</div>)
    }
    else
    {
        return(<div>NEMOTIVATA</div>)
    }
}

function AssignMissingModal(props) {
    let columnss = [
        {
            text: 'Materie',
            dataField: 'coursName',
            sort: true
        },
        {
            text: "Data",
            dataField: 'date',
            sort: true
        },
        {
            text: 'Motivata',
            dataField: 'motivated',
            formatter: missingsTableSmallFormatter
        }
    ];
    return(
        <Modal show={props.newMissingModal} onHide={props.hideNewMissingeModal}>
            <Modal.Header closeButton>Adaugati o absenta noua</Modal.Header>
            <Modal.Body>
                {
                   props.yearStructure &&
                   !props.yearStructure.scolarYearStructure.semIstart &&
                   !props.yearStructure.scolarYearStructure.semIIstart
                        ?
                        <div>Nu se pot adauga absente pentru ca nu a incept semestrul</div>
                                :
                    props.professorClassCourses && props.professorClassCourses.length === 0
                        ?
                        <div>Se pare ca nu predati cursuri care sa fie invatate de aceasta clasa.</div>
                        :
                        <div>
                            <Form.Group>
                                <Form.Label>Alegeti materia</Form.Label>
                                <Form.Control onChange={props.handleSelectNewMissingCoursId} as="select">
                                    {
                                        props.professorClassCourses && props.professorClassCourses.map((item)=> {
                                            return(<option value={item.id}>{item.coursName}</option>)
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>

                            <ToolkitProvider
                                keyField="id"
                                data={ props.selectedStudentMissings }
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

                            <Form.Group>
                                <Form.Label>Alegeti data</Form.Label>
                                <DatePicker
                                    selected={ props.startDate }
                                    onChange={ props.handleSelectNewMissingDate }
                                    name="startDate"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Form.Group>

                            <Button onClick={props.assignNewMissingToStudent}>
                                Adaugati absenta
                            </Button>
                        </div>
                }
            </Modal.Body>
        </Modal>
    );
};
export default AssignMissingModal;
