import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import auth from "../../authentication/auth";

export default class HeaderStudent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Navbar fixed="top" className={"admin-navbar-alloptions"} bg="light" expand="lg">
                    <Navbar.Brand href="#home">STUDENT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav.Link>
                        <Link to={{pathname:"/student"}}>
                            Anul Scolar
                        </Link>
                    </Nav.Link>

                    <Nav.Link>
                        <Link to={{
                            pathname:"/myGrades",
                            state: JSON.parse(localStorage.getItem('loggedUser'))
                        }}>
                            Situatia mea
                        </Link>
                    </Nav.Link>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title={<i className="fa fa-cog"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to={{pathname:"/myProfileStudent"}}>
                                        Datele Mele
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">
                                    <Button
                                        onClick={() => auth.logout(() => {
                                            this.props.history.push("/");
                                        })}
                                    >
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}
