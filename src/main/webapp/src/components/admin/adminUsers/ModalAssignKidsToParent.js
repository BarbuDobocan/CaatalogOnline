import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// modalKidsToParent = {this.state.modalKidsToParent}
//
// hideModalKidsToParent = {this.hideModalKidsToParent}
const { SearchBar } = Search;
function ModalAssignKidsToParent(props) {

    const selectRow = {
        mode: 'checkbox', // multiple row selection
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            props.assignStudentToParent(row.id, isSelect);

        },
        onSelectAll: (isSelect, rows) => {
            rows.map((row, index) => {
                props.assignStudentToParent(row.id, isSelect);
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
        <Modal show={props.modalKidsToParent} onHide={props.hideModalKidsToParent}>
            <Modal.Header closeButton>ADAUGA COPII</Modal.Header>
            <Modal.Body>
                <ToolkitProvider
                    keyField="id"
                    data={ props.freeStudents }
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

                <Button onClick={props.addStudentsToParent}>
                    Adauga
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default ModalAssignKidsToParent;
