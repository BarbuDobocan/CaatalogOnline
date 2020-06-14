import React from 'react';
import {Row, Col} from 'react-bootstrap';
import "./MyProfile.scss";

class MyProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        let user = JSON.parse(localStorage.getItem('loggedUser'));
        return(
            <div className={"my-profile-main-row"}>
                {<Row> <h6>Username: {user.username}</h6> </Row>}
                {<Row> <h6>Nume: {user.fullName}</h6> </Row>}
                {<Row> <h6>Email: {user.email}</h6></Row>}
                {<Row> <h6>Telefon: {user.phoneNumber}</h6></Row>}
                {<Row> <h6>Adresa: {user.address}</h6></Row>}
                {
                    user.roles[0].id == 2 &&
                    <Row><h6>Sunteti Profesor</h6></Row>
                }
                {
                    user.roles[0].id == 3 &&
                    <Row><h6>Sunteti Parinte</h6></Row>
                }
                {
                    user.roles[0].id == 4 &&
                        <div>
                            <Row><h6>Sunteti Student</h6></Row>
                            <Row><h6>Numar Matricol: {user.registrationNumber} </h6></Row>
                        </div>

                }
            </div>
        )
    }
}

export default MyProfile;
