import React from 'react';
import {Modal, Button, Form, Carousel} from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import ToolkitProvider, {Search}  from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

/////NU MAI FOLOSIIII
////
////
////
////
////
////
////
////

//folosesc variabila asta pentru ca memora userul selectat
//sa stiu ce date trmit la userProfile
//se pare ca daca folosesc setState nu mai functioneaza rowExtesion
let selectedUser;

function ModalForSelectedCLASS(props){

    const expandRow = {
        renderer: row => (
            <Button
            onClick={()=>{
                props.history.push({
                    pathname: '/adminUserProfile',
                    state: selectedUser
                   // state: props.selectedUser
                })}}
            >Vezi Profilul</Button>
        )
    };

    const expandRowCours = {
        renderer: row => (
            <div>CURS</div>
        )
    };

    let columnss = [
        {
            text: 'Nume',
            dataField: 'fullName',
            sort: true
        },
        {
            text: 'Numar matricol',
            dataField: 'registrationNumber',
            sort: true,
        },
        {
            text: 'STERGE',
            dataField: '',
            formatter:  props.removeStudentFromClassFormat
        }
    ];

    let columnssd = [
        {
            text: 'Nume',
            dataField: 'fullName',
            sort: true
        },
        {
            text: 'Numar matricol',
            dataField: 'registrationNumber',
            sort: true,
        },
        {
            text: 'ADAUGA',
            dataField: '',
            formatter:  props.addStudentToClassFormat
        }
    ];

    let columnsp = [
        {
            text: 'Nume',
            dataField: 'fullName',
            sort: true
        },
        {
            text: 'Email',
            dataField: 'email',
            sort: true,
        },
        {
            text: 'STERGE',
            dataField: '',
            formatter:  props.removeProfessorFromClassFormat
        }];

    let columnspd = [
        {
            text: 'Nume',
            dataField: 'fullName',
            sort: true
        },
        {
            text: 'Email',
            dataField: 'email',
            sort: true,
        },
        {
            text: 'ADAUGA',
            dataField: '',
            formatter:  props.addProfessorToClassFormat
        }];

    let columnsc = [
        {
            text: 'Numele Cursului',
            dataField: 'coursName',
            sort: true
        },
        {
            text: 'STERGE',
            dataField: '',
            formatter:  props.removeCoursFromClassFormat
        }];

    let columnscd = [
        {
            text: 'Numele Cursului',
            dataField: 'coursName',
            sort: true
        },
        {
            text: 'ADAUGA',
            dataField: '',
            formatter:  props.addCoursToClassFormat
        }];

    const rowEventsS = {
        onClick: (e, row, rowIndex) => {
            selectedUser = row;
            console.log(e.target.value, row, rowIndex);
        }
    };

    const rowEventsP = {
        onClick: (e, row, rowIndex) => {
            selectedUser = row;
            console.log(e.target.value, row, rowIndex)
        }
    };

    const rowEventsC = {
        onClick: (e, row, rowIndex) => {
            console.log(e.target.value, row, rowIndex)
        }
    };


    return (
        <Modal show={props.selectedClassModal} onHide={props.hideSelectedClassModal}>
            <Modal.Header closeButton>Clasa {props.classYear}-{props.className}</Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="students" title="Studenti">
                        {
                            props.showStudentsInModal === 1 &&
                            <div>
                            <ToolkitProvider
                                keyField="id"
                                data={ props.classStudents }
                                columns={ columnss }
                            >
                                {
                                    proprieties => (
                                        <div>
                                            <BootstrapTable
                                                { ...proprieties.baseProps }
                                                pagination={ paginationFactory() }
                                                expandRow={ expandRow }
                                                rowEvents={ rowEventsS }
                                            />
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                            <Button onClick={()=>{props.handleShowStudentsInModal(2)}}>Adauga Studenti</Button>
                            </div>
                        }
                        {
                            props.showStudentsInModal === 2 &&
                            <div>
                                Adauga studenti in clasa
                                <ToolkitProvider
                                    keyField="id"
                                    data={ props.freeStudents }
                                    columns={ columnssd }
                                >
                                    {
                                        proprieties => (
                                            <div>
                                                <BootstrapTable
                                                    { ...proprieties.baseProps }
                                                    pagination={ paginationFactory() }
                                                    expandRow={ expandRow }
                                                    rowEvents={ rowEventsS }
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>
                                <Button onClick={()=>{props.handleShowStudentsInModal(1)}}>Studentii Clasei</Button>
                            </div>
                        }
                    </Tab>
                    <Tab eventKey="profesors" title="Profesori">
                        {
                            props.showProfessorsInModal === 1 &&
                                <div>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={ props.classProfessors }
                                        columns={ columnsp }
                                    >
                                        {
                                            proprieties => (
                                                <div>
                                                    <BootstrapTable
                                                        { ...proprieties.baseProps }
                                                        pagination={ paginationFactory() }
                                                        expandRow={ expandRow }
                                                        rowEvents={ rowEventsP }
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                    <Button onClick={()=>{props.handleShowProfessorsInModal(2)}}>Adauga Profesori</Button>
                                </div>
                        }
                        {
                            props.showProfessorsInModal === 2 &&
                                <div>
                                    Adauga profesori in clasa
                                    <ToolkitProvider
                                        keyField="id"
                                        data={ props.unassignedProfessors }
                                        columns={ columnspd }
                                    >
                                        {
                                            proprieties => (
                                                <div>
                                                    <BootstrapTable
                                                        { ...proprieties.baseProps }
                                                        pagination={ paginationFactory() }
                                                        expandRow={ expandRow }
                                                        rowEvents={ rowEventsP }
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                    <Button onClick={()=>{props.handleShowProfessorsInModal(1)}}>Profesorii Clasei</Button>
                                </div>
                        }
                    </Tab>
                    <Tab eventKey="courses" title="Cursuri">
                        {
                            props.showCoursesInModal === 1 &&
                            <div>
                                <ToolkitProvider
                                    keyField="id"
                                    data={props.classCourses}
                                    columns={columnsc}
                                >
                                    {
                                        proprieties => (
                                            <div>
                                                <BootstrapTable
                                                    {...proprieties.baseProps}
                                                    pagination={paginationFactory()}
                                                    expandRow={expandRowCours}
                                                    rowEvents={rowEventsC}
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>
                                <Button onClick={() => {props.handleShowCoursesInModal(2)}}>Adauga Cursuri</Button>
                            </div>
                        }
                        {
                            props.showCoursesInModal === 2 &&
                            <div>
                                Adauga cursuri clasei
                                <ToolkitProvider
                                    keyField="id"
                                    data={props.unassignedCourses}
                                    columns={columnscd}
                                >
                                    {
                                        proprieties => (
                                            <div>
                                                <BootstrapTable
                                                    {...proprieties.baseProps}
                                                    pagination={paginationFactory()}
                                                    expandRow={expandRowCours}
                                                    rowEvents={rowEventsC}
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>
                                <Button onClick={() => {props.handleShowCoursesInModal(1)}}>Cursurile Clasei</Button>
                            </div>
                        }
                    </Tab>
                    <Tab eventKey="master" title="Diriginte">
                        <div>
                            Dirigintele clasei:
                        </div>
                        <h4>
                            {
                                props.masterOfClass ? props.masterOfClass.fullName : "NU ARE"
                            }
                        </h4>
                        {
                            props.masterOfClass ?
                                <Button onClick = {()=>{props.removeMasterOfClass(props.classId)}}> Renunta La Diriginte </Button>
                                    :
                                <div>
                                    {
                                        props.selectedNewMasterOfClass !== null ?
                                        <div>
                                        <Form.Control onChange={props.handleSelectedNewMasterOfClass} value={props.selectedNewMasterOfClass} as="select">
                                            {
                                                props.professorThatAreNotMasters && props.professorThatAreNotMasters.map((item, index)=>{
                                                    return( <option value={item.id}>{item.fullName}</option> );
                                                })
                                            }
                                        </Form.Control>
                                        <Button onClick={props.assignMasterToClass}>
                                        Adauga Diriginte
                                        </Button>
                                        </div>
                                            :
                                            <div>
                                                Nu exista profesori disponibili
                                            </div>
                                    }
                                </div>

                        }
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}
export default ModalForSelectedCLASS;
