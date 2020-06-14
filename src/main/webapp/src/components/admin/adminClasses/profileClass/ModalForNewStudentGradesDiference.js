import React from 'react';
import {Table, Modal, Button, Form} from 'react-bootstrap';

function optionsGrade(){
    let a = [];
    for(let i=1;i<=10;i++){
        a.push(<option value={i}>{i}</option>)
    }
    return a;
}
function ModalForNewStudentGradesDiference(props){
    return(
        <Modal show={props.showModalForTransfStudent} onHide={props.hideModalForTransfStudents}>
        <Modal.Header closeButton>
            DIFERENTE
        </Modal.Header>
            <Modal.Body>
            <Table responsive>
                <thead>
                <tr>
                    <th>Materia</th>
                    <th>Media</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.differenceCourses && props.differenceCourses.map((item) => {
                      return(
                          <tr>
                            <td>{item.coursName}</td>
                            <td>
                                <Form.Control onChange={(e) => {props.handleGradesFowNewStudent(item.id, parseInt(e.target.value))}}  as="select">
                                    {
                                        optionsGrade()
                                    }
                                </Form.Control>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </Table>
                <Button
                onClick={props.assignTransferredStudentToClass}
                >
                    Adauga student
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default ModalForNewStudentGradesDiference;
