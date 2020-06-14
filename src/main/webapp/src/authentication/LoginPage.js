import React from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import auth from './auth';
import "./LoginPage.scss";
import {showAlert} from "../redux/actions/alert";
import {connect} from "react-redux";
import {Alerta} from "./Alert";

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: null,
            password: null
        }
    }

    componentDidMount() {
        if(localStorage.getItem('jwtToken')){
            this.props.history.push("/user");
        }
    }

    handleUserName = (userName) =>{
        this.setState({username: userName});
       // this.props.showAlert(false, null)
    };

    handlePassword = (password) =>{
        this.setState({password: password});
       /// this.props.showAlert(false, null)
    };

    handleAlert = (result) => {
        console.log(result);
        this.props.showAlert(result.error, result.message)
    };

    render()
    {
        return (
            <div>
                {
                    this.props.show &&
                    <Alerta
                        show = {this.props.show}
                        message = {this.props.messageAlert}

                        showAlert = {this.props.showAlert}
                    />
                }

                <Card className = {"login-page-card-style"}>
                    <Card.Body>
                    <Form.Control onChange={(e) => {this.handleUserName(e.target.value)}} type="email" placeholder="Username"/>
                    <Form.Control onChange={(e) => {this.handlePassword(e.target.value)}} type="password" placeholder="Password"/>
                    <Button className = {"login-page-card-button-style"} onClick={() => {
                        auth.login(
                            this.state.username,
                            this.state.password,
                            () => {this.props.history.push("/user");},
                            (result) => {this.handleAlert(result)})
                    }}> LOGIN </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    const {show, messageAlert} = state.alertReducer;
    return {show, messageAlert};
};

const mapDispatchToProps = (dispatch) => ({
    showAlert:(showA, messageAlert) => {dispatch(showAlert(showA, messageAlert))}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
