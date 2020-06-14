import React from 'react';
import {Row, Col, Accordion, Card, Button, Form} from 'react-bootstrap';
import "./AdminUserProfile.scss";
import {connect} from "react-redux";
import {fetchStudentData,
    fetchProfessorData,
    getProfessorUnassignedCourses,
    assignCoursToProfessor,
    removeCoursFromProfessor,
    removeClassFromMaster,
    setNULLSelectedUser,
    setNULLStudentGrades,
    setNULLStudentMissing,
    findParentProfileData,
    removeKidFromParent,
    findStudentThatAreNotKids,
    addKidsToParent,
    changeUserData,
    deleteUser,
} from "../../../redux/actions/adminUsers"
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalAssignCoursToProfessor from './ModalAssignCoursToProfessor.js';
import ModalAssignClassToProfessor from './ModalAssignClassToProfessor.js';
import ModalAssignKidsToParent from "./ModalAssignKidsToParent";
import ModalChangeUserData from "./ModalChangeUserData";
import ModalDeleteUser from "./ModalDeleteUser";
import FinalGradesForStudent from "./StudentProfile/FinalGradesForStudent";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {fetchDataForFinalGrade, fetchStudentCoursMissings} from "../../../redux/actions/professorClasses";
import {getYearStructure} from "../../../redux/actions/yearStuctureAction";

const { SearchBar } = Search;
class AdminUserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showModalCourses: false,
            showModalClasses: false,
            selectedUser: null,
            selectedUserRoleId: {
                roleId: null
            },

            //student
            selectedSemester: 1,
            selectedCoursGrades: 0,
            selectedCoursAbsences: 0,

            //parent
            modalKidsToParent: false,
            assignStudents: [],

            //changeUser
            changeUserModal: false,
            name: null,
            address: null,
            email: null,
            phoneNumber: null,
            registrationNumber: null,

            //deleteUserModal,
            deleteUserModal: false
        }
    }

    showDeleteUserModal = () => {
        this.setState({deleteUserModal: true})
    };

    hideDeleteUserModal = () => {
        this.setState({deleteUserModal: false})
    };

    hideModalChangeUser = () =>  {
      this.setState({changeUserModal: false})
    };

    showModalChangeUser = () => {
      this.setState({
          changeUserModal: true,
          name: this.props.selectedUser.user.name,
          address: this.props.selectedUser.user.address,
          email: this.props.selectedUser.user.email,
          phoneNumber: this.props.selectedUser.user.phoneNumber,
      });
        if(this.props.selectedUser.user.roles[0].id === 4){
         this.setState({
             registrationNumber: this.props.selectedUser.user.registrationNumber
         })
        }
    };

    handleName = (e) => {
        this.setState({name: e.target.value})
    };

    handleAddress = (e) => {
        this.setState({address: e.target.value})
    };

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    };

    handlePhoneNumber = (e) => {
        this.setState({phoneNumber: e.target.value})
    };

    handleRegistrationNumber = (e) => {
        this.setState({registrationNumber: e.target.value})
    };

    hideModalKidsToParent = () => {
        this.setState({modalKidsToParent: false, assignStudents: []})
    };

    showModalKidsToParent = () => {
        this.setState({modalKidsToParent: true})
    };

    setSemesterI = () => {
        this.setState({selectedSemester: 1});
        this.props.fetchDataForFinalGrade(this.props.location.state.id, this.state.selectedCoursGrades, 1);
        this.props.fetchStudentCoursMissings(this.props.location.state.id, this.state.selectedCoursAbsences, 1);
    };

    setSemesterII = () => {
        this.setState({selectedSemester: 2});
        this.props.fetchDataForFinalGrade(this.props.location.state.id, this.state.selectedCoursGrades, 2);
        this.props.fetchStudentCoursMissings(this.props.location.state.id, this.state.selectedCoursAbsences, 2);
    };

    hideModalClasses = () => {
        this.setState({showModalClasses: false})
    };

    hideModalCourses = () => {
      this.setState({showModalCourses: false})
    };

    showModalCourses = () => {
        this.setState({showModalCourses: true});
        this.props.getProfessorUnassignedCourses(this.props.location.state.id)
    };

    showModalClasses = () => {
        this.setState({showModalClasses: true});
        this.props.getProfessorUnassignedClasses(this.props.location.state.id);
    };

    removeClassFromSelectedMaster = () => {
        this.props.removeClassFromMaster(this.props.location.state.id);
    };

    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem('loggedUser')));
        this.props.getYearStructure();
        if(this.props.location.state.roles[0].id === 4)
        {
            //ID - ul user - ului
            this.setState({ selectedUserRoleId:{roleId: 4}});
            this.props.fetchStudentData(this.props.location.state.id);
        }
        if(this.props.location.state.roles[0].id === 3)
        {
            this.setState({ selectedUserRoleId:{roleId: 3}});
            this.props.findParentProfileData(this.props.location.state.id)
        }
        if(this.props.location.state.roles[0].id === 2)
        {
            this.setState({ selectedUserRoleId:{roleId: 2}});
            this.props.fetchProfessorData(this.props.location.state.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.goBackToUsersPage === true){
            this.props.history.push(
                {
                    pathname: '/adminUsers',
                    state:  this.state.selectedUserRoleId
                })
        }

        if(this.props.selectedUser !== prevProps.selectedUser){
            if(this.props.selectedUser.studentCourses && this.props.selectedUser.studentCourses.length > 0){
                this.props.fetchDataForFinalGrade(
                    this.props.location.state.id,
                    this.props.selectedUser.studentCourses[0].id,
                    this.state.selectedSemester);
                this.props.fetchStudentCoursMissings(
                    this.props.location.state.id,
                    this.props.selectedUser.studentCourses[0].id,
                    this.state.selectedSemester);
            }
        }
    }

    removeCoursFromProfessorFormat=(cell, row)=>{
        return(
            <Button onClick={(e)=>{this.props.removeCoursFromProfessor(row.id, this.props.location.state.id);}}>
                Elimina Curs
            </Button>
        )
    };

    removeKidFromParentFormat=(cell, row)=>{
        return(
            <Button onClick={(e)=>{this.props.removeKidFromParent( this.props.location.state.id, row.id);}}>
                Elimina
            </Button>
        )
    };

    assignCoursToProfessorFormat=(cell, row)=>{
        return(<Button onClick={(e)=>{
            this.props.assignCoursToProfessor(row.id, this.props.location.state.id);
            this.hideModalCourses();
        }}>
            Atribue
        </Button>);
    };

    assignClassToProfessorFormat=(cell, row)=>{
        return(
            <Button onClick={(e)=>{
                this.props.assignProfessorToClass(row.id, this.props.location.state.id)
            }}>
                Atribue
            </Button>
        )
    };

    handleSelectedCourses = (e) => {
        this.setState({selectedCoursGrades: e.target.value});
        this.props.fetchDataForFinalGrade(this.props.location.state.id, e.target.value, this.state.selectedSemester);
    };

    assignStudentToParent = (studentId, isSelect) => {
        let assignStudents = this.state.assignStudents;
        if(isSelect) {
            assignStudents.push(studentId);
        }else{
            assignStudents.map((item, index) => {
                if(item === studentId){
                    assignStudents.splice(index,1);
                }
            })
        }
        this.setState({assignStudents: assignStudents});
    };

    addStudentsToParent = () => {
        let studentsClass = {classId: null, students: null};
        studentsClass.classId = this.props.location.state.id;
        studentsClass.students = this.state.assignStudents;
        this.hideModalKidsToParent();
        this.props.addKidsToParent(studentsClass)
    };

    handleSelectedCoursForMissings = (e) => {
        this.setState({selectedCoursAbsences: e.target.value});
        this.props.fetchStudentCoursMissings(this.props.location.state.id, e.target.value, this.state.selectedSemester);
        //user, curs, semestru
    };

    changeUserD = () => {
      let user =
          {
        id: this.props.location.state.id,
        name: this.state.name,
        address: this.state.address,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        registrationNumber: this.state.registrationNumber
          };

      this.props.changeUserData(user);
      this.hideModalChangeUser();
    };

    deleteUserDataOK = () => {
        this.props.deleteUser(this.props.location.state.id, this.state.selectedUserRoleId);
        this.hideDeleteUserModal()
    };

    componentWillUnmount() {
        this.props.setNULLSelectedUser();
        this.props.setNULLStudentGrades();
        this.props.setNULLStudentMissing();
    }

    render(){
        let columnsClasses = [
            {
                text: 'Numele Clasei',
                dataField: 'clasa.name',
                sort: true
            },
            {
                text: 'Anul',
                dataField: 'clasa.year',
                sort: true
            },
            {
                text: 'Cursul Preadat',
                dataField: 'cours.coursName',
                sort: true
            }
        ];

        let columnsCourses = [
            {
                text: 'Numele Cursului',
                dataField: 'coursName',
                sort: true
            },
            {
                text:'',
                formatter: this.removeCoursFromProfessorFormat
            }
        ];

        let columnss = [
            {
                text: 'Materie',
                dataField: 'cours.coursName',
                sort: true
            },
            {
                text: 'Nota',
                dataField: 'grade',
                sort: true,
            },
            {
                text: 'Profesor',
                dataField: 'professorName',
                sort: true,
            },
            {
                text: "Data",
                dataField: 'date',
                sort: true,
            }
        ];

        let columns = [
            {
                text: 'Materie',
                dataField: 'coursName',
                sort: true
            },
            {
                text: "Data",
                dataField: 'date',
                sort: true
            },
            {
                text: "Profesor",
                dataField: "professorName",
                sort: true
            }
        ];

        let columnsKid = [
            {
                text: 'Nume',
                dataField: 'name',
                sort: true
            },
            {
                text: 'Username',
                dataField: 'userName',
                sort: true,
            },
            {
                text: 'Adresa',
                dataField: 'address',
                sort: true,
            },
            {
                text: 'Numar Tel.',
                dataField: 'phoneNumber',
                sort: true,
            },
            {
                text: 'Email',
                dataField: 'email',
                sort: true,
            },{
                text: 'Numarul Matricol',
                dataField: 'registrationNumber',
                sort: true,
            },{
                text: 'Elimina',
                formatter: this.removeKidFromParentFormat
            }
        ];
        return(
            <Row className={"admin-user-profile-main-row"}>
                <ModalAssignCoursToProfessor
                    unassignedCourses={this.props.unassignedCoursesToProfessor}
                    showModalCoursesState={this.state.showModalCourses}

                    assignCoursToProfessorFormat={this.assignCoursToProfessorFormat}
                    hideModalCourses={this.hideModalCourses}
                    showModalCourses={this.showModalCourses}
                />

                <ModalAssignKidsToParent
                    modalKidsToParent = {this.state.modalKidsToParent}
                    freeStudents = {this.props.studentsThatAreNotKids}

                    addStudentsToParent = {this.addStudentsToParent}
                    assignStudentToParent = {this.assignStudentToParent}
                    hideModalKidsToParent = {this.hideModalKidsToParent}
                    />

                <ModalAssignClassToProfessor
                    showModalClassesState={this.state.showModalClasses}
                    unassignedClassesToProfessor = {this.props.unassignedClassesToProfessor}

                    assignClassToProfessorFormat={this.assignClassToProfessorFormat}
                    hideModalClasses={this.hideModalClasses}
                    showModalClasses={this.showModalClasses}
                />

                <ModalChangeUserData
                    changeUserModal = {this.state.changeUserModal}
                    selectedUser = {this.props.selectedUser}
                    name = {this.state.name}
                    address = {this.state.address}
                    email = {this.state.email}
                    phoneNumber = {this.state.phoneNumber}
                    registrationNumber = {this.state.registrationNumber}

                    changeUserD = {this.changeUserD}
                    hideModalChangeUser = {this.hideModalChangeUser}
                    handleName = {this.handleName}
                    handleAddress = {this.handleAddress}
                    handleEmail = {this.handleEmail}
                    handlePhoneNumber = {this.handlePhoneNumber}
                    handleRegistrationNumber = {this.handleRegistrationNumber}
                    hideChangeUserModal = {this.hideModalChangeUser}
                />

                <ModalDeleteUser
                    deleteUserModal = {this.state.deleteUserModal}

                    deleteUserDataOK = {this.deleteUserDataOK}
                    hideDeleteUserModal = {this.hideDeleteUserModal}
                    />

               <Col className={"admin-user-profile-col1"} sm={4} md={4} lg={4}>
                   {
                       localStorage.getItem('loggedUser') &&
                       JSON.parse(localStorage.getItem('loggedUser')).roles[0].id == 1 &&
                       <Row className={"buttons-bloc-profile-users"}>
                           <Col>
                           <Button onClick={this.showModalChangeUser}>
                               Datele Utilizatorului
                           </Button>
                           </Col>
                           <Col>
                               {
                                   this.props.yearStructure && this.props.yearStructure.scolarYearStructure.yearIsStarting &&
                                   localStorage.getItem('loggedUser') &&
                                   JSON.parse(localStorage.getItem('loggedUser')).roles[0].id == 1 &&
                                   <Button variant="danger" onClick={this.showDeleteUserModal}>
                                       Sterge Acest Utilizator
                                   </Button>
                               }
                           </Col>
                       </Row>
                   }

                   {
                       this.props.selectedUser && this.props.selectedUser.user &&
                           <div className={"admin-user-profile-div1"}>
                               <Row> NUME: {this.props.selectedUser.user.name} </Row>
                               <Row> ADRESA: {this.props.selectedUser.user.address} </Row>
                               <Row> TELEFON: {this.props.selectedUser.user.phoneNumber} </Row>
                               <Row> EMAIL: {this.props.selectedUser.user.email}</Row>
                               {
                                   this.props.selectedUser.user.roles[0].id == 2 &&
                                   <Row>Este Profesor!</Row>
                               }
                               {
                                   this.props.selectedUser.user.roles[0].id == 3 &&
                                   <Row>Este Parinte!</Row>
                               }
                               {
                                   this.props.selectedUser.user.roles[0].id == 4 &&
                                   <Row>Este Student!</Row>
                               }
                           </div>
                   }
                   {this.props.selectedUser && this.props.selectedUser.user.roles[0].id === 4 &&
                       <div className={"admin-user-profile-student"}>
                           {
                               <Row className={"admin-user-profile-div2"}>
                                   NUMAR MATRICOL: {this.props.selectedUser.user.registrationNumber}
                               </Row>
                           }
                           {
                               this.props.selectedUser.clasa ?
                                   <Row className={"admin-user-profile-div3"}>
                                       <h5>Clasa: {this.props.selectedUser.clasa.year}-{this.props.selectedUser.clasa.name}</h5>
                                   </Row>
                                   :
                                   <Row className={"admin-user-profile-div3"}>
                                       Nu face parte dintr-o clasa
                                   </Row>
                           }
                           <Row className={"student-profile-semester"}>
                               <Col sm={6} md={6} lg={6}>
                               Situatia pe semestrul:
                               </Col>
                               <Col sm={1} md={1} lg={1}>
                                   <Form.Check
                                       checked = {this.state.selectedSemester === 1}
                                       onClick={this.setSemesterI}
                                       type={'radio'}
                                       label={`I`}
                                   />
                               </Col>
                               <Col sm={1} md={1} lg={1}>
                                   <Form.Check
                                       checked = {this.state.selectedSemester === 2}
                                       onClick={this.setSemesterII}
                                       type={'radio'}
                                       label={`II`}
                                   />
                               </Col>
                           </Row>
                       </div>
                   }

               </Col>

                <Col className={"admin-user-profile-col2"} sm={8} md={8} lg={8}>
                    {
                       ////////////PROFIL STUDENT
                        this.props.selectedUser &&
                        this.props.selectedUser.user.roles[0].id === 4 &&
                      <div>
                          <Tabs defaultActiveKey="Note" transition={false} id="noanim-tab-example">
                              <Tab eventKey="Note" title="Note">
                                  {
                                      this.props.selectedUser && this.props.selectedUser.studentCourses &&
                                      <Form.Control
                                          onChange={this.handleSelectedCourses}
                                          defaultValue = {this.state.selectedCoursGrades}
                                          as="select">
                                          {
                                              this.props.selectedUser.studentCourses.map((item) => {
                                                  return (
                                                      <option value={item.id}>
                                                          {item.coursName}
                                                      </option>
                                                  )
                                              })
                                          }
                                      </Form.Control>
                                  }
                                  {
                                      this.props.finalGradeForStudentData && this.props.finalGradeForStudentData.finalGradeCours
                                          ?
                                          <div className={"final-grade-for-student-profile"}>
                                              <br/>
                                              <h6>
                                                  Media la materia aceasta este incheiata cu nota:
                                              </h6>
                                              <h6>
                                                  {this.props.finalGradeForStudentData.finalGradeCours.grade}
                                              </h6>
                                              <br/>
                                          </div>
                                          :
                                          <h6>
                                              <br/>
                                              Studentul nu are situatia incheiata la materia aceasta!
                                              <br/>
                                          </h6>
                                  }

                                  {
                                      this.props.finalGradeForStudentData &&
                                      <ToolkitProvider
                                          keyField="id"
                                          data={this.props.finalGradeForStudentData.studentGradesResponse}
                                          columns={columnss}
                                      >
                                          {
                                              proprieties => (
                                                  <div>
                                                      <BootstrapTable
                                                          {...proprieties.baseProps}
                                                          pagination={paginationFactory()}
                                                      />
                                                  </div>
                                              )
                                          }
                                      </ToolkitProvider>
                                  }
                                  {
                                      this.props.finalGradeForStudentData && this.props.finalGradeForStudentData.thesis
                                          ?
                                          <div>
                                              <br/>
                                              <h6>
                                                  TEZA
                                              </h6>
                                              <ToolkitProvider
                                                  keyField="id"
                                                  data={this.props.finalGradeForStudentData
                                                      ? this.props.finalGradeForStudentData.thesis : []}
                                                  columns={columnss}>
                                                  {
                                                      proprieties => (
                                                          <div>
                                                              <BootstrapTable
                                                                  {...proprieties.baseProps}
                                                              />
                                                          </div>
                                                      )
                                                  }
                                              </ToolkitProvider>
                                          </div>
                                          :
                                          <h6>
                                              <br/>
                                              Nu are teza!
                                          </h6>
                                  }
                              </Tab>
                              <Tab eventKey="Absente" title="Absente">
                                  {
                                      this.props.selectedUser && this.props.selectedUser.studentCourses &&
                                      <Form.Control
                                          onChange={this.handleSelectedCoursForMissings}
                                          defaultValue = {this.state.selectedCoursAbsences}
                                          as="select">
                                          {
                                              this.props.selectedUser.studentCourses.map((item) => {
                                                  return(
                                                      <option value={item.id}>
                                                          {item.coursName}
                                                      </option>
                                                  )
                                              })
                                          }
                                      </Form.Control>
                                  }
                                  {
                                      <ToolkitProvider
                                          keyField="id"
                                          data={ this.props.selectedStudentMissings }
                                          columns={ columns }>
                                          {
                                              proprieties => (
                                                  <div>
                                                      <BootstrapTable
                                                          { ...proprieties.baseProps }
                                                          pagination={ paginationFactory() }
                                                      />
                                                  </div>
                                              )
                                          }
                                      </ToolkitProvider>
                                  }
                              </Tab>
                              <Tab eventKey="Medii" title="Medii">
                                  {
                                      this.props.selectedUser && this.props.selectedUser.averages &&
                                      <FinalGradesForStudent
                                          studentAllFinalGrades = {this.props.selectedUser.averages}
                                      />
                                  }
                              </Tab>
                          </Tabs>
                      </div>
                    }
                    {
                        ///////////PROFIL PARINTE
                        this.props.selectedUser &&
                        this.props.selectedUser.user.roles[0].id === 3 &&
                        <div>
                            <h6>Copiii</h6>
                            <ToolkitProvider
                                keyField="id"
                                data={this.props.selectedUser && this.props.selectedUser.kids ? this.props.selectedUser.kids : [] }
                                columns={columnsKid}
                            >
                                {
                                    proprieties => (
                                        <div>
                                            <BootstrapTable
                                                {...proprieties.baseProps}
                                                pagination={paginationFactory()}
                                            />
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                            <Button onClick={(e)=>{
                                this.showModalKidsToParent();
                                this.props.findStudentThatAreNotKids(this.props.location.state.id)}}>
                                Adauga copii
                            </Button>
                        </div>
                    }
                    {
                        ///////////////PROFIL PROFESOR
                        this.props.selectedUser &&
                        this.props.selectedUser.user.roles[0].id === 2 &&
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                       Clasele la care preda
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={ this.props.selectedUser ? this.props.selectedUser.classes : [] }
                                        columns={ columnsClasses }
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <SearchBar { ...props.searchProps } />
                                                    <BootstrapTable
                                                        { ...props.baseProps }
                                                        pagination={ paginationFactory() }
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                       {/*{ <Button onClick={()=>{this.showModalClasses()}}>Atribuie Clase</Button>}*/}
                                    </div>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Cursurile Predate
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <div>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={ this.props.selectedUser ? this.props.selectedUser.courses : [] }
                                        columns={ columnsCourses }
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <SearchBar { ...props.searchProps } />
                                                    <BootstrapTable
                                                        { ...props.baseProps }
                                                        pagination={ paginationFactory() }
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                    <Button onClick={this.showModalCourses}>Atribue Curs</Button>
                                    </div>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Diriginte
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <div>
                                        {
                                            this.props.selectedUser &&
                                                <div>
                                                    {
                                                        this.props.selectedUser.masterOfClass ?
                                                            <div>
                                                                Este dirigintele clasei:
                                                            <h4>
                                                                {this.props.selectedUser.masterOfClass.year
                                                                +
                                                                "-"
                                                                +
                                                                this.props.selectedUser.masterOfClass.name}
                                                            </h4>
                                                                <Button onClick={this.removeClassFromSelectedMaster}>
                                                                    Renunta la clasa
                                                                </Button>
                                                            </div>
                                                            :
                                                            <div>
                                                                Nu este diriginte
                                                            </div>
                                                    }
                                                </div>
                                        }
                                    </div>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    }
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = (state) => {
    const {finalGradeForStudentData, selectedStudentMissings} = state.professorSelectedClassReducer;
    const {selectedUser, unassignedCoursesToProfessor, unassignedClassesToProfessor,
        classesWithoutMaster, studentsThatAreNotKids, goBackToUsersPage} = state.adminUserReducer;
    const {yearStructure} = state.yearStructureReducer;

    return {selectedUser, unassignedCoursesToProfessor,
        unassignedClassesToProfessor, classesWithoutMaster,
        finalGradeForStudentData, selectedStudentMissings,
        studentsThatAreNotKids, goBackToUsersPage, yearStructure};
};

const mapDispatchToProps = (dispatch) => ({
    fetchStudentData: (studentId) => {dispatch(fetchStudentData(studentId))},
    fetchProfessorData: (studentId) => {dispatch(fetchProfessorData(studentId))},
    getProfessorUnassignedCourses: (professorID) => {dispatch(getProfessorUnassignedCourses(professorID))},
    assignCoursToProfessor: (coursId, professorId) => {dispatch(assignCoursToProfessor(coursId, professorId))},
    removeCoursFromProfessor: (coursId, professorId) => {dispatch(removeCoursFromProfessor(coursId, professorId))},
    removeClassFromMaster: (professorId) => {dispatch(removeClassFromMaster(professorId))},
    setNULLSelectedUser: () => {dispatch(setNULLSelectedUser())},
    fetchDataForFinalGrade:(studentId, coursId, semester) => {dispatch(fetchDataForFinalGrade(studentId, coursId, semester))},
    fetchStudentCoursMissings: (studentId, coursId, semester) => {dispatch(fetchStudentCoursMissings(studentId, coursId, semester))},
    setNULLStudentGrades:() => {dispatch(setNULLStudentGrades())},
    setNULLStudentMissing:() => {dispatch(setNULLStudentMissing())},
    findParentProfileData:(parentID) => {dispatch(findParentProfileData(parentID))},
    removeKidFromParent:(parentId, kidId) => {dispatch(removeKidFromParent(parentId, kidId))},
    findStudentThatAreNotKids:(parentId) => {dispatch(findStudentThatAreNotKids(parentId))},
    addKidsToParent:(data) => {dispatch(addKidsToParent(data))},
    changeUserData: (data) => {dispatch(changeUserData(data))},
    deleteUser: (userId, roleId) => {dispatch(deleteUser(userId, roleId))},
   // goBackToUsersPage: (bool) => {dispatch(goBackToUsersPage(bool))},
    getYearStructure:() => {dispatch(getYearStructure())},
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserProfile);
