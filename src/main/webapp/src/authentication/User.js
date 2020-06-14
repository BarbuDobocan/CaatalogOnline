import React from 'react';
import {connect} from "react-redux";
import {fetchRoles} from "../redux/actions/user";
import {Spinner} from 'react-bootstrap';
import auth from "./auth";

class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: null,
            password: null
        }
    }

    componentDidMount() {
        this.props.fetchRoles();
        fetch('http://localhost:8080/users/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: null
        })
            .then(response => response.json())
            .then(result => {
               if( result.error )
               {
                   auth.logout(() => {
                       this.props.history.push("/");
                   })
               }
               else
               {
                   localStorage.setItem('loggedUser', JSON.stringify(result));//JSON.parse()
                   result.roles[0].id === 1 ? this.props.history.push("/adminHome")
                       :
                       result.roles[0].id === 2 ? this.props.history.push("/professor")
                           :
                           result.roles[0].id === 3 ? this.props.history.push("/parent")
                               :
                               result.roles[0].id === 4 ? this.props.history.push("/student")
                                   : console.log("NOPE");
               }
            });
    }

    render()
    {
        return (
            <div>
                <Spinner animation="grow" size="lg" />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const {roles} = state.userReducer;
    return {roles};
};

const mapDispatchToProps = (dispatch) => ({
    fetchRoles: () => {dispatch(fetchRoles())}
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
