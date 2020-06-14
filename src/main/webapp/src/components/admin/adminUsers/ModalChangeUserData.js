import React from "react";
import {Button, Form, Modal} from "react-bootstrap";

function ModalChangeUserData(props){
    return (
        <Modal show={props.changeUserModal} onHide={props.hideModalChangeUser}>
            <Modal.Header closeButton>Datele utilizatorului</Modal.Header>
            <Modal.Body>
                <Form.Label>Numele complet:</Form.Label>
                <Form.Control onChange={props.handleName} defaultValue={props.name}/>

                <Form.Label>Adresa:</Form.Label>
                <Form.Control onChange={props.handleAddress} defaultValue={props.address}/>

                <Form.Label>Email:</Form.Label>
                <Form.Control onChange={props.handleEmail} defaultValue={props.email}/>

                <Form.Label>Numarul de Telefon:</Form.Label>
                <Form.Control onChange={props.handlePhoneNumber} defaultValue={props.phoneNumber}/>
                {
                    props.selectedUser && props.selectedUser.user.roles[0].id === 4 &&
                    <div>
                        <Form.Label>Numarul Matricol:</Form.Label>
                        <Form.Control onChange={props.handleRegistrationNumber} defaultValue={props.registrationNumber}/>
                    </div>
                }
                <Button onClick={props.changeUserD}>SALVEAZA</Button>
            </Modal.Body>
        </Modal>
    )
}
export default ModalChangeUserData;
