import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import "./ModalForNewUSER.scss";

function ModalForNewUSER(props){
    return (
        <Modal show={props.newUserModal} onHide={props.hideNewUserModal}>
            <Modal.Header closeButton>ADAUGA UN USER NOU</Modal.Header>
            <Modal.Body>
                <h6 className={"error-message-user-modal"}>
                    {props.newUserError}
                </h6>
                <Form.Label>Username:</Form.Label>
                <Form.Control onChange={props.setNewUserUsername} placeholder="Username" />

                <Form.Label>Numele complet:</Form.Label>
                <Form.Control onChange={props.setNewUserFullName} placeholder="Numele Complet"/>

                <Form.Label>Tipul de user:</Form.Label>
                <Form.Control onChange={props.setNewUserRole} as="select">
                    {props.roles && props.roles.map((item)=>{
                        if(item.id !== 1){
                            return <option>{item.role}</option>
                        }
                    })}
                </Form.Control>

                <Form.Label>Adresa:</Form.Label>
                <Form.Control onChange={props.setNewUserAddress} placeholder="Adresa" />

                <Form.Label>Email:</Form.Label>
                <Form.Control onChange={props.setNewUserEmail} placeholder="Email" />

                <Form.Label>Numarul de Telefon:</Form.Label>
                <Form.Control onChange={props.setNewUserPhoneNumber} placeholder="Numarul de Telefon" />
                {
                    props.newUser.roleID === 4 &&
                        <div>
                            <Form.Label>Numarul Matricol Al Elevului:</Form.Label>
                            <Form.Control onChange={props.setNewUserRegistrationNumber} placeholder="Numarul Matricol" />
                        </div>
                }
                <Button onClick={props.addNewUser}>SALVEAZA</Button>
            </Modal.Body>
        </Modal>
    )
}
export default ModalForNewUSER;
