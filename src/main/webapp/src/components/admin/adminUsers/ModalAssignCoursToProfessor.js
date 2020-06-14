import React from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function ModalAssignCoursToProfessor(props) {
    let columns = [
        {
            text: 'Numele Cursului',
            dataField: 'coursName',
            sort: true
        },
        {
            text: 'ADAUGA',
            dataField: '',
            formatter:  props.assignCoursToProfessorFormat
        }
    ];
    return (
        <Modal show={props.showModalCoursesState} onHide={props.hideModalCourses}>
            <Modal.Header closeButton>ATRIBUIE UN CURS</Modal.Header>
            <Modal.Body>
            <ToolkitProvider
                keyField="id"
                data={ props.unassignedCourses }
                columns={ columns }
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
            </Modal.Body>
        </Modal>
    );
}
export default ModalAssignCoursToProfessor;
