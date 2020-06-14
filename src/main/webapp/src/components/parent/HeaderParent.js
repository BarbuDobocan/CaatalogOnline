import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import auth from "../../authentication/auth";

export default class HeaderParent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            refreshDataForUsers: true,
        }
    }


    render() {
        return(
            <div>
                <Navbar fixed="top" className={"admin-navbar-alloptions"} bg="light" expand="lg">
                    <Navbar.Brand href="#home">PARINTE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav.Link>
                        <Link to={{pathname:"/parent"}}>
                            Anul Scolar
                        </Link>
                    </Nav.Link>

                    <Nav.Link>
                        <Link to={{pathname:"/myKids"}}>
                            Copiii mei
                        </Link>
                    </Nav.Link>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title={<i className="fa fa-cog"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    <Link to={{pathname:"/myProfileParent"}}>
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
