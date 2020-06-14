import React from 'react';
import {Alert, Toast} from 'react-bootstrap';
export function Alerta(props){

    {/*<Toast onClose={() => {props.showAlert(false, null)}} show={props.show} animation={true}>*/}
    {/*    <Toast.Header>*/}
    {/*        Logare nu a Reusit*/}
    {/*    </Toast.Header>*/}
    {/*    <Toast.Body>{props.message}</Toast.Body>*/}
    {/*</Toast>*/}
    return(
        <Alert variant="danger"
           show={props.show}
           onClose={() => {props.showAlert(false, null)}}
           dismissible>
        <Alert.Heading>{props.message}</Alert.Heading>
    </Alert>
    )
}
