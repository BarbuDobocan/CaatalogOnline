import React from 'react';
import { Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import "./Admin.scss";

export default class Admin extends React.Component{
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
                ZIUA BUNA ADMINE
                <Button
                    onClick={() => {this.props.history.push("/protectedRouteAdmin2")}}
                >
                   !!!!!!!!!!!!!!!!!!!!!!!
                </Button>
                <br/>

            </div>
        )
    }

}
