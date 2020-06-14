import React from "react";
import {Button, Form, Modal, Tab} from "react-bootstrap";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;
function ModalForNewStudents(props) {

    const selectRow = {
        mode: 'checkbox', // multiple row selection
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            props.assignStudentToClass(row.id, isSelect);
        },
        onSelectAll: (isSelect, rows) => {
            rows.map((row, index) => {
                props.assignStudentToClass(row.id, isSelect);
            })
        }
    };

    let columns = [
        {
            text: 'Nume',
            dataField: 'name',
            sort: true
        },
        {
            text: 'Username',
            dataField: 'userName',
            sort: true
        },
        {
            text: 'Numar Matricol',
            dataField: 'registrationNumber',
            sort: true
        }
    ];
    return (
        <Modal show={props.modalAssignStudents} onHide={props.hideModalAssignStudents}>
            <Modal.Header closeButton>ADAUGA STUDENTI</Modal.Header>
            <Modal.Body>
                <ToolkitProvider
                    keyField="id"
                    data={ props.freeStudents }
                    //selectRow={ selectRow }
                    search
                >
                    {
                        proprieties => (
                            <div>
                                <SearchBar { ...proprieties.searchProps } />
                                <BootstrapTable
                                    { ...proprieties.baseProps }
                                    pagination={ paginationFactory() }
                                    columns={ columns }
                                    //cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
                                    selectRow={ selectRow }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>

                <Button onClick={props.addStudentsToClass}>
                    Adauga
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForNewStudents;
