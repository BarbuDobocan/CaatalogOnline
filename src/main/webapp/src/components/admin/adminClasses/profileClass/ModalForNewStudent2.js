import React from 'react';
import {Button, Modal} from "react-bootstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function ModalForNewStudents2(props) {

    let columns = [
        {
            text: 'Nume',
            dataField: 'name',
            sort: true
        },
        {
            text: 'Numar Matricol',
            dataField: 'registrationNumber',
            sort: true
        },
        {
            text: 'ADAUGA',
            dataField: '',
            formatter: props.assignStudentButtonFormat
        }
    ];
    return (
        <Modal show={props.modalForNewStudents2} onHide={props.hideModalAssignStudents2}>
            <Modal.Header closeButton>ADAUGA STUDENTI</Modal.Header>
            <Modal.Body>
                <ToolkitProvider
                    keyField="id"
                    data={ props.freeStudents }
                    search
                >
                    {
                        proprieties => (
                            <div>
                                <BootstrapTable
                                    { ...proprieties.baseProps }
                                    pagination={ paginationFactory() }
                                    columns={ columns }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForNewStudents2;
