import React from "react";
import {Button, Form, Modal, Tab} from "react-bootstrap";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;
function ModalForNewCourses(props){

    const selectRow = {
        mode: 'checkbox', // multiple row selection
      //  clickToSelect: true,
        onSelect: (row, isSelect) => {
            props.checkCoursToClassCourses(row.cours.id, isSelect);
        },
        onSelectAll: (isSelect, rows) => {
            rows.map((row) => {
                props.checkCoursToClassCourses(row.cours.id, isSelect);
            })
        }
    };

    let columns = [
        {
            text: 'Numele Cursului',
            dataField: 'cours.coursName',
            sort: true,
            editable: false
        },
        {
            text: 'PROFESOR',
            dataField: '',
            formatter: props.changeAssignedProfessorToCoursFormat
        }
    ];

    return(
        <Modal show={props.modalAssignCourses} onHide={props.hideModalAssignCourses}>
            <Modal.Header closeButton>ADAUGA CURSURI</Modal.Header>
            <Modal.Body>
                {
                    <div>
                    <ToolkitProvider
                        keyField="id"
                        data={ props.allFreeUnassignedCourses }
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
                                        selectRow={ selectRow }
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                    <Button onClick={props.addCoursToClass}> Adaugati </Button>
                    </div>

                }
            </Modal.Body>
        </Modal>
    )
}

export default ModalForNewCourses;
