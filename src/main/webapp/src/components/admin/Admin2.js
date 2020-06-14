import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import auth from "../../authentication/auth";

export default class Admin2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authUser: null,
        }
    }

    render()
    {
        return(
            <div>
                <Alert >
                    ZIUA BUNA ADMINE 2
                </Alert>
                ADMIN
                <br/>
                <Button
                    onClick={() => auth.logout(() => {this.props.history.push("/");})}
                >
                    Logout
                </Button>
            </div>
        )
    }

}
