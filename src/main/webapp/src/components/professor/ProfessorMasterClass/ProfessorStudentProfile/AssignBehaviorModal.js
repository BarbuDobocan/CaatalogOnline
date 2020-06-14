import React from 'react';
import {Col, Form, Modal, Button} from 'react-bootstrap';

function optionsGrade(){
    let a = [];
    for(let i=1;i<=10;i++){
        a.push(<option>{i}</option>)
    }
    return a;
}
function AssignBehaviorModal(props){
    return(
      <Modal show={props.finaGradeBehaviorModal} onHide={props.hideFinalGradeBehaviorModal}>
          <Modal.Header closeButton>Incheiati media la purtare</Modal.Header>
          <Modal.Body>
              <Form.Group>
                  <Form.Label>Alegeti nota</Form.Label>
                  <Form.Control onChange={props.handleSelectFinalGradeBehaviorGrade}  as="select">
                      {
                          optionsGrade()
                      }
                  </Form.Control>
              </Form.Group>

              <Button onClick={props.assignBehaviorGrade}>Incheie medie</Button>
          </Modal.Body>
      </Modal>
    );
}

export default AssignBehaviorModal;
