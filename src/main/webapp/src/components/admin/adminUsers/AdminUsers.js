import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import {simpleAction} from "../../../redux/actions/simpleAction";
import {fetchUsers, addNewUser, goBackToUsersPage, } from "../../../redux/actions/adminUsers";
import { setNewUserError } from '../../../redux/actions/alert'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import ModalForNewUSER from "./ModalForNewUSER";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {fetchRoles} from "../../../redux/actions/user";
import "./AdminUsers.scss";

//folosesc variabila asta pentru ca memora userul selectat
//sa stiu ce date trmit la userProfile
//se pare ca daca folosesc setState nu mai functioneaza rowExtesion
let selectedUser;

const { SearchBar } = Search;

class AdminUsers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: null,
            roleId: null,
            userType: null,
            refreshDataForUsers: false,
            newUser:{
                username:null,
                roleID:2,
                isActive:true,
                address:null,
                email:null,
                phoneNumber:null,
                fullName:null,
                registrationNumber:null
            },
            newUserModal: false,
            selectedUser: null
        }
    }

    setUserType = (userType) => {
      this.setState({userType: userType});
    };

    showNewUserModal = () => {
      this.setState({newUserModal: true})
    };

    hideNewUserModal = () => {
        this.props.setNewUserError(null);
        this.setState({newUserModal: false, newUser:{roleID:2}})
    };

    setNewUserUsername = (e) => {
        console.log(e.target.value, this.state.newUser);
        let newUser = this.state.newUser;
        newUser.username = e.target.value;
        this.setState({newUser: newUser});
    };

    setNewUserRole = (e) => {
      console.log(e.target.value, this.state.newUser);
        this.props.roles && this.props.roles.map((item) => {
            if(item.role === e.target.value){
                let newUser = this.state.newUser;
                newUser.roleID = item.id;
                this.setState({newUser: newUser});
            }
        })
    };

    setNewUserAddress = (e) => {
        console.log(e.target.value, this.state.newUser);
        let newUser = this.state.newUser;
        newUser.address = e.target.value;
        this.setState({newUser: newUser});
    };

    setNewUserEmail = (e) => {
        console.log(e.target.value, this.state.newUser);
        let newUser = this.state.newUser;
        newUser.email = e.target.value;
        this.setState({newUser: newUser});
    };

    setNewUserPhoneNumber = (e) => {
        console.log(e.target.value, this.state.newUser);
        let newUser = this.state.newUser;
        newUser.phoneNumber = e.target.value;
        this.setState({newUser: newUser});
    };

    setNewUserFullName = (e) => {
        console.log(e.target.value, this.state.newUser);
        let newUser = this.state.newUser;
        newUser.fullName = e.target.value;
        this.setState({newUser: newUser});
    };

    setNewUserRegistrationNumber = (e) => {
        console.log(e.target.value, this.state.newUser);
        let newUser = this.state.newUser;
        newUser.registrationNumber = e.target.value;
        this.setState({newUser: newUser});
    };


    setTheUsersValue = (users) => {
        this.setState({users: users});
    };

    handleRoleId = (roleId) => {
        this.setState({roleId: roleId});
    };

    refreshDataForUsers = () => {
        this.setState({refreshDataForUsers: !this.state.refreshDataForUsers})
    };

    componentDidMount() {
        this.props.goBackToUsersPage(false);
        this.props.fetchUsers(this.props.location.state.roleId);
        this.props.fetchRoles();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.location.state.refreshDataForUsers !== prevProps.location.state.refreshDataForUsers){
            this.props.fetchUsers(this.props.location.state.roleId);
            this.setState({roleId:  this.props.location.state.roleId})
        }
        if(this.props.location.state.roleId !== this.state.userType){
            this.setUserType(this.props.location.state.roleId);
        }
        if(prevProps.fetchedUsers && this.props.fetchedUsers !== prevProps.fetchedUsers){
            this.hideNewUserModal();
        }
    }

    addNewUser = () => {
        this.props.addNewUser(this.state.newUser);
    };

    textCanBeSorted = (text) => {
      return(
          <div>
              {text + " "}
              <i className="fa fa-sort" aria-hidden="true"/>
          </div>
      )
    };

    render()
    {
       const expandRow = {
            renderer: row => (
                <Button
                    onClick={()=>{
                        this.props.history.push({
                            pathname: '/adminUserProfile',
                            state: row
                        })}}
                >Vezi Profilul</Button>
            )
        };


       let columnss = [
            {
                text: this.textCanBeSorted('Nume'), //'Nume',
                dataField: 'name',
                sort: true
            },
            {
                text: this.textCanBeSorted('Username'),
                dataField: 'userName',
                sort: true,
            },
            {
                text: this.textCanBeSorted('Adresa'),
                dataField: 'address',
                sort: true,
            },
            {
                text: this.textCanBeSorted('Numar Tel.'),
                dataField: 'phoneNumber',
                sort: true,
            },
            {
                text: this.textCanBeSorted('Email'),
                dataField: 'email',
                sort: true,
            }
           ];

        if(this.props.location.state.roleId === 4)
        {
           columnss.push({
               text: this.textCanBeSorted('Numarul Matricol'),
               dataField: 'registrationNumber',
               sort: true,
           });
        }

        let users = [];
        if(this.props.fetchedUsers){
            users = [...this.props.fetchedUsers]
        }

        return(
            <div className={"admin-users-main"}>
                <ModalForNewUSER
                    roles={this.props.roles}
                    newUserModal={this.state.newUserModal}
                    newUser={this.state.newUser}
                    newUserError = {this.props.newUserError}

                    hideNewUserModal={this.hideNewUserModal}
                    addNewUser={this.addNewUser}
                    setNewUserUsername={this.setNewUserUsername}
                    setNewUserRole={this.setNewUserRole}
                    setNewUserEmail={this.setNewUserEmail}
                    setNewUserPhoneNumber={this.setNewUserPhoneNumber}
                    setNewUserFullName={this.setNewUserFullName}
                    setNewUserAddress={this.setNewUserAddress}
                    setNewUserRegistrationNumber={this.setNewUserRegistrationNumber}
                />
                {this.state.userType === 2 && <h4>Profesori</h4>}
                {this.state.userType === 3 && <h4>Parinti</h4>}
                {this.state.userType === 4 && <h4>Studenti</h4>}

                <ToolkitProvider
                    keyField="id"
                    data={ users }
                    columns={ columnss }
                    search
                    >
                    {
                        props => (
                            <div>
                                <hr/>
                                <SearchBar { ...props.searchProps } />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    pagination={ paginationFactory() }
                                    expandRow={ expandRow }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>

                <Button onClick={this.showNewUserModal}>
                    ADAUGATI UN UTILIZATOR NOU
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
     const {simpleReducer} = state.simpleReducer;
     const {fetchedUsers} = state.adminUserReducer;
     const {roles} = state.userReducer;
     const {newUserError} = state.alertReducer;
     return {
         simpleReducer,
         fetchedUsers,
         roles,
         newUserError
     };

};

const mapDispatchToProps = (dispatch) => ({
    simpleAction: () => {dispatch(simpleAction())},
    fetchUsers: (roleID) => {dispatch(fetchUsers(roleID))},
    addNewUser: (newUser) => {dispatch(addNewUser(newUser))},
    fetchRoles: () => {dispatch(fetchRoles())},
    goBackToUsersPage: (bool) => {dispatch(goBackToUsersPage(bool))},
    setNewUserError: (message) => {dispatch(setNewUserError(message))}
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
