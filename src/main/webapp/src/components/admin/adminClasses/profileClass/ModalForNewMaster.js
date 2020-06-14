import React from "react";
import {Button, Form, Modal, Tab} from "react-bootstrap";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;
function ModalForNewMaster(props) {

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect) => {
          props.handleSelectNewMaster(row.id)
        }
    };

    let columns = [
        {
            text: 'Profesorul',
            dataField: 'name',
            sort: true,
            editable: false
        },
        {
            text: 'Username',
            dataField: 'userName'
        }
    ];

    return(
        <Modal show={props.modalForNewMaster} onHide={props.hideModalForNewMaster}>
            <Modal.Header closeButton>ADAUGA DIRIGINTE</Modal.Header>
            <Modal.Body>
                <div>
                    <ToolkitProvider
                        keyField="id"
                        data={ props.simpleProfessors }
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
                    <Button onClick={props.assignMaster}> Adaugati Diriginte </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForNewMaster;
