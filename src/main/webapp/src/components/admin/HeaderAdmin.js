import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import auth from "../../authentication/auth";

export default class HeaderAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            refreshDataForUsers: true,
        }
    }

    refreshDataForUsers = () => {
      this.setState({refreshDataForUsers: !this.state.refreshDataForUsers})
    };

    render()
    {
        return (
            <div>
                <Navbar fixed="top" className={"admin-navbar-alloptions"} bg="light" expand="lg">
                    <Navbar.Brand href="#home">ADMIN</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <Link to={{pathname:"/adminHome"}}>
                                    Acasa
                                </Link>
                            </Nav.Link>
                            <NavDropdown title="Utilizatori" id="basic-nav-dropdown">
                                {/*href="/protectedRouteAdmin2"*/}
                                <NavDropdown.Item>
                                    <Link
                                        onClick={this.refreshDataForUsers}
                                        to={{pathname:"/adminUsers", state:{roleId: 2, refreshDataForUsers: this.state.refreshDataForUsers}}}>
                                        Profesori
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                {/*href="#parinti"*/}
                                <NavDropdown.Item>
                                    <Link
                                        onClick={this.refreshDataForUsers}
                                        to={{pathname:"/adminUsers", state:{roleId: 3, refreshDataForUsers: this.state.refreshDataForUsers}}}>
                                        Parinti
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>
                                  <Link
                                      onClick={this.refreshDataForUsers}
                                      to={{pathname:"/adminUsers", state:{roleId: 4, refreshDataForUsers: this.state.refreshDataForUsers}}}>
                                      Studenti
                                  </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>
                                <Link to={{pathname:"/adminClasses"}}>
                                Clase
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={{pathname:"/adminCourses"}}>
                                Cursuri
                                </Link>
                            </Nav.Link>

                            {/*className={"nav-dropdown-admin-page"}*/}
                            <NavDropdown title={<i className="fa fa-cog"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    <Link to={{pathname:"/myProfileAdmin"}}>
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
