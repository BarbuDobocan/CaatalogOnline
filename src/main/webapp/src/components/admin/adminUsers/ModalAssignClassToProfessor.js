import React from "react";
import {Modal} from 'react-bootstrap';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function ModalAssignClassesToProfessor(props) {
    let columns = [
        {
          text: 'Anul Clasei',
          dataField: 'year',
          sort: true
        },
        {
            text: 'Numele Clasei',
            dataField: 'name',
            sort: true
        },
        {
            text: 'ADAUGA',
            dataField: '',
            formatter:  props.assignClassToProfessorFormat
        }
    ];
    return (
        <Modal show={props.showModalClassesState} onHide={props.hideModalClasses}>
            <Modal.Header closeButton>
                ATRIBUIE CLASE
            </Modal.Header>
            <Modal.Body>
                {
                    <ToolkitProvider
                        keyField="id"
                        data={ props.unassignedClassesToProfessor }
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
                }
            </Modal.Body>
        </Modal>
    );
}
export default ModalAssignClassesToProfessor;
