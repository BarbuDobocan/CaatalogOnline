import React from 'react';
import {fetchProfileClassData,
    fetchFreeStudents,
    assignManyStudentsToClass,
    removeSelectedStudentFromClass,
    fetchFreeCoursesClass,
    assignManyCoursesToClass,
    removeCoursAndProfessorFromClass,
    getAllProfessorsThatAreNotMasters,
    assignStudentToClassSemI,
    modalForTransfStudent,
    assignTransferredStudentToClass,
    changeProfileClassData,

} from "../../../../redux/actions/adminProfileClass"
import {assignMasterToClass, removeMasterOfClass} from '../../../../redux/actions/adminClasses';
import {connect} from "react-redux";
import {Row, Col, Tabs, Tab, Button, Form} from "react-bootstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalForNewStudents from "./ModalForNewStudents";
import ModalForNewCourses from "./ModalForNewCourses";
import ModalForNewMaster from "./ModalForNewMaster";
import ModalForNewStudents2 from "./ModalForNewStudent2";
import ModalForNewStudentGradesDiference from "./ModalForNewStudentGradesDiference";
import ModalChangeClassData from "./ModalChangeClassData";
import "./AdminClassProfile.scss";
import {getYearStructure} from "../../../../redux/actions/yearStuctureAction";

const { SearchBar } = Search;
class AdminClassProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalAssignStudents: false,
            modalAssignCourses: false,
            modalForNewMaster: false,

            assignStudents: [],
            classCourses: [],
            newSelectedMaster: null,

            modalForNewStudents2: false,

            coursGradeForNewStudent: [],
            selectedStudent: null,

            modalChangeClass: false,
            newClassName: null,
            newClassYear: null,
        }
    }

    showModalChangeClass = () => {
        debugger;
        this.setState({modalChangeClass: true})
    };

    hideModalChangeClass = () => {
        this.setState({modalChangeClass: false})
    };

    handleNewClassName = (e) => {
        this.setState({newClassName: e.target.value})
    };

    handleNewClassYear = (e) => {
        this.setState({newClassYear: e.target.value})
    };

    hideModalForTransfStudents = () => {
        this.props.modalForTransfStudent(false);
    };

    hideModalAssignStudents2 = () => {
        this.setState({modalForNewStudents2: false})
    };

    showModalAssignStudents2 = () => {
        this.setState({modalForNewStudents2: true})
        this.props.fetchFreeStudents();
    };

    showModalForNewMaster = () => {
        this.props.getAllProfessorsThatAreNotMasters();
        this.setState({modalForNewMaster: true})
    };

    hideModalForNewMaster = () => {
        this.setState({modalForNewMaster: false})
        this.setState({newSelectedMaster: null})
    };

    showModalAssignCourses = () => {
      this.setState({modalAssignCourses: true});
      this.props.fetchFreeCoursesClass(this.props.location.state.id);
    };

    hideModalAssignCourses = () => {
        this.setState({modalAssignCourses: false})
    };

    showModalAssigStudents = () => {
      this.setState({modalAssignStudents: true});
      this.props.fetchFreeStudents();
    };

    hideModalAssignStudents = () => {
      this.setState({modalAssignStudents: false, assignStudents: []})
    };

    handleClassCourses = (data) => {
        let classCourses = [];
      data.map((item, index) => {
          let classCours = {checked: null, coursId: null, professorId: null};
          classCours.checked = item.checked;
          classCours.coursId = item.cours.id;
          if(item.professors.length > 0){
              classCours.professorId = item.professors[0].id;
          }else{
              classCours.professorId = null;
          }
          classCourses.push(classCours);
      });

        this.setState({classCourses: classCourses})
    };

    checkCoursToClassCourses = (coursId, isSelect) => {
        let classCourses = this.state.classCourses;
        classCourses.map((item, index) => {
            if(item.coursId === coursId){
                item.checked = isSelect;
            }
        });
        this.setState({classCourses: classCourses});
    };

    changeAssignedProfessorToCours = (row, professorId) => {
        let classCourses = this.state.classCourses;
        classCourses.map((item, index) => {
            if(item.coursId === row.cours.id){
                item.professorId = parseInt(professorId, 10);
            }
        });
        console.log(this.state.classCourses);
        this.setState({classCourses: classCourses});
    };

    addCoursToClass = () => {
        let response = [];
        this.state.classCourses.map((item, index) => {
            if(item.checked){
                let cours = {coursId: null, professorId:-1, classId: null};
                cours.coursId = item.coursId;
                if(item.professorId !== null){ cours.professorId = item.professorId; }
                cours.classId = item.classId;
                response.push(cours);
            }
        });

        this.props.assignManyCoursesToClass(this.props.location.state.id, response);
        this.hideModalAssignCourses();
    };

    componentDidMount() {
        this.props.fetchProfileClassData(this.props.location.state.id);
        this.props.getYearStructure();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allFreeUnassignedCourses !== this.props.allFreeUnassignedCourses){
            this.handleClassCourses(this.props.allFreeUnassignedCourses);
        }
        if(this.props.differenceCourses !== prevProps.differenceCourses){
            this.setState({ coursGradeForNewStudent: this.props.differenceCourses})
        }
        if(!prevProps.clasa && this.props.clasa){
           this.setState({
               newClassName: this.props.clasa.name,
               newClassYear: this.props.clasa.year,
           })
        }
    }

    handleGradesFowNewStudent = (coursId, grade) => {
      let coursGradeForNewStudent = this.state.coursGradeForNewStudent;
        coursGradeForNewStudent.map((item) => {
            if(item.id === coursId){
                item.grade = grade;
            }
        });
        this.setState({coursGradeForNewStudent: coursGradeForNewStudent})
    };

    assignTransferredStudentToClass = () => {
        let data = {
            studentId: this.state.selectedStudent,
            classId: this.props.location.state.id,
            finals: []
        };
        this.state.coursGradeForNewStudent.map((item) => {
            let newFinal = {
                coursId: item.id,
                grade: item.grade
            };
            data.finals.push(newFinal)
        });
        this.props.assignTStudentToClass(data);
        this.hideModalForTransfStudents()
    };

    textCanBeSorted = (text) => {
        return(
            <div>
                {text + " "}
                <i className="fa fa-sort" aria-hidden="true"/>
            </div>
        )
    };

    assignStudentToClass = (studentId, isSelect) => {
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

    handleSelectNewMaster = (professorId) => {
      this.setState({newSelectedMaster: professorId})
    };

    addStudentsToClass = () => {
      let studentsClass = {classId: null, students: null};
      studentsClass.classId = this.props.location.state.id;
      studentsClass.students = this.state.assignStudents;
        this.hideModalAssignStudents();
        this.props.assignManyStudentsToClass(studentsClass);
    };

    assignMaster = () => {
        this.hideModalForNewMaster();
        if(this.state.newSelectedMaster)
        {
            this.props.assignMasterToClass(this.props.location.state.id, this.state.newSelectedMaster)
        }
    };

    removeMaster = () => {
        this.props.removeMasterOfClass(this.props.location.state.id);
    };

    changeClassData = () => {
        let clasa = {
            id: this.props.location.state.id,
            name: this.state.newClassName,
            year: this.state.newClassYear
        };
        debugger;
        this.props.changeProfileClassData(clasa);
        this.hideModalChangeClass();
    };

    removeStudentFromClassFormat=(cell, row)=>{
        return(<Button onClick={(e)=>{
            e.stopPropagation();
            this.props.removeSelectedStudentFromClass(this.props.location.state.id, row.id)
        }}>
            Sterge
        </Button>);
    };

    assignStudentButtonFormat=(cell, row)=>{
        return(
            <Button
                onClick={
                    (e)=>{e.stopPropagation();
                    this.props.assignStudentToClassSemI(row.id, this.props.location.state.id);
                    this.hideModalAssignStudents2();
                    this.setState({selectedStudent: row.id})
                    }}>
                Adauga
            </Button>
        )
    };

    changeAssignedProfessorToCoursFormat=(cell, row)=>{
      return(
          <Form.Control onChange={(e)=>{this.changeAssignedProfessorToCours(row, e.target.value)}} as="select">
              {
                  row.professors.map((item) => {
                     return(<option value={item.id}>{item.name}</option> );
                  })
              }
          </Form.Control>
      )
    };

    removeCoursFromClassFormat=(cell, row)=>{
        if(row.cours.id !== 10)
        {
            return(
                <Button
                    onClick={(e)=>{
                        e.stopPropagation();
                        this.props.removeCoursAndProfessorFromClass(this.props.location.state.id, row.cours.id)}}>
                    Elimina
                </Button>
            )
        }else{
            return(<div>
                Dirigintele Clasei
            </div>)
        }
    };

    render(){
        let columns = [
            {
                text: this.textCanBeSorted('Nume'),
                dataField: 'name',
                sort: true
            },
            {
                text: this.textCanBeSorted('Email'),
                dataField: 'email',
                sort: true
            },
            {
                text: this.textCanBeSorted('Username'),
                dataField: 'userName',
                sort: true
            },
            {
                text: this.textCanBeSorted('Numar Matricol'),
                dataField: 'registrationNumber',
                sort: true
            },
            {
                text: 'STERGE',
                dataField: '',
                formatter:  this.removeStudentFromClassFormat
            }
        ];

        let columnsCourses = [
            {
                text: this.textCanBeSorted('Numele Materiei'),
                dataField: 'cours.coursName',
                sort: true
            },
            {
                text: this.textCanBeSorted('Predate De Profesorul'),
                dataField: 'professor.name',
                sort: true
            },
            {
                text: 'STERGE',
                dataField: '',
                formatter: this.removeCoursFromClassFormat
            }
            ];

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

        // const options = {
        //    background-color: red;
        // };

        return(
            <div>
                <ModalChangeClassData
                    modalChangeClass = {this.state.modalChangeClass}

                    changeClassData = {this.changeClassData}
                    handleNewClassYear = {this.handleNewClassYear}
                    handleNewClassName = {this.handleNewClassName}
                    hideModalChangeClass = {this.hideModalChangeClass}
                    />

                <ModalForNewStudentGradesDiference
                    showModalForTransfStudent = {this.props.showModalForTransfStudent}
                    differenceCourses = {this.props.differenceCourses ? this.props.differenceCourses : []}

                    assignTransferredStudentToClass = {this.assignTransferredStudentToClass}
                    handleGradesFowNewStudent = {this.handleGradesFowNewStudent}
                    hideModalForTransfStudents = {this.hideModalForTransfStudents}
                    />

                <ModalForNewStudents2
                    modalForNewStudents2 = {this.state.modalForNewStudents2}
                    freeStudents = { this.props.allFreeStudents }

                    assignStudentButtonFormat = {this.assignStudentButtonFormat}
                    hideModalAssignStudents2 = {this.hideModalAssignStudents2}
                    />

                <ModalForNewStudents
                    modalAssignStudents = {this.state.modalAssignStudents}
                    freeStudents = { this.props.allFreeStudents }

                    hideModalAssignStudents = {this.hideModalAssignStudents}
                    assignStudentToClass = {this.assignStudentToClass}
                    addStudentsToClass = {this.addStudentsToClass}
                />

                <ModalForNewCourses
                    modalAssignCourses = {this.state.modalAssignCourses}
                    allFreeUnassignedCourses = {this.props.allFreeUnassignedCourses}

                    checkCoursToClassCourses = {this.checkCoursToClassCourses}
                    changeAssignedProfessorToCoursFormat = {this.changeAssignedProfessorToCoursFormat}
                    hideModalAssignCourses = {this.hideModalAssignCourses}
                    addCoursToClass = {this.addCoursToClass}
                />

                <ModalForNewMaster
                    modalForNewMaster = {this.state.modalForNewMaster}
                    simpleProfessors = {this.props.simpleProfessors}

                    hideModalForNewMaster = {this.hideModalForNewMaster}
                    handleSelectNewMaster = {this.handleSelectNewMaster}
                    assignMaster = {this.assignMaster}
                    />
                <Row className={"admin-class-profile-main-row"}>
                    <Col className={"admin-class-profile-col1"} sm={2} md={2} lg={2}>
                        <h4>Datele clasei</h4>
                        <Row><h6>Numele Clasei: </h6><h6>{this.props.clasa && this.props.clasa.name}</h6></Row>
                        <Row><h6>Anul Clasei: </h6><h6>{ this.props.clasa && this.props.clasa.year}</h6></Row>
                        {
                            this.props.masterOfClass ?
                                <div>
                                    <Row> <h6>Dirigintele Clasei: </h6> <h6>{ this.props.masterOfClass.name}</h6></Row>
                                </div>
                                :
                                <div>
                                    <h6>Nu are un diriginte!</h6>
                                </div>
                        }
                        <Row><h6>Numarul de elevi: </h6> <h6>{ this.props.students.length}</h6></Row>
                        {
                            this.props.yearStructure && this.props.yearStructure.scolarYearStructure.yearIsStarting &&
                            <Row>
                                <Button onClick={this.showModalChangeClass}>
                                    Schimba Datele Clasei
                                </Button>
                            </Row>
                        }

                    </Col>

                    <Col className={"admin-class-profile-col2"} sm={9} md={9} lg={9}>
                    <Tabs defaultActiveKey="students" transition={false} id="noanim-tab-example">
                        <Tab eventKey="students" title="Elevi">
                                    <ToolkitProvider
                                        className={"table-pagination-details"}
                                        keyField="id"
                                        data={ this.props.students ? this.props.students : []}
                                        columns={ columns }
                                        search
                                    >
                                        {
                                            proprieties => (
                                                <div>
                                                    <SearchBar { ...proprieties.searchProps } />
                                                    <BootstrapTable
                                                        { ...proprieties.baseProps }
                                                        pagination={ paginationFactory() }
                                                        expandRow={ expandRow }
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                            {
                                //la incepultul anului
                                this.props.yearStructure &&
                                this.props.yearStructure.scolarYearStructure.yearIsStarting &&
                                <Button onClick={this.showModalAssigStudents}>Adauga Elevi</Button>
                            }
                            {
                                //intre semestre
                                this.props.yearStructure &&
                                this.props.yearStructure.scolarYearStructure.semIstop &&
                                <Button onClick={this.showModalAssignStudents2}>Adauga Elevi</Button>
                            }
                        </Tab>
                        <Tab eventKey="classes" title="Materii">
                            <ToolkitProvider
                                keyField="id"
                                data={ this.props.courses }
                                columns={ columnsCourses }
                                search
                            >
                                {
                                    proprieties => (
                                        <div>
                                            <SearchBar { ...proprieties.searchProps } />
                                            <BootstrapTable
                                                { ...proprieties.baseProps }
                                                pagination={ paginationFactory() }
                                            />
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                            {
                                <Button onClick={this.showModalAssignCourses}>Adauga Materii</Button>
                            }
                        </Tab>
                        <Tab eventKey="master" title="Diriginte">
                            {
                                this.props.masterOfClass ?
                                    <div>
                                        <h5>Datele dirigintelui:</h5>
                                        <div>Nume: {this.props.masterOfClass.name}</div>
                                        <div>Email: {this.props.masterOfClass.email}</div>
                                        <div>Numar de telefon: {this.props.masterOfClass.phoneNumber}</div>
                                        <div>Username: {this.props.masterOfClass.userName}</div>
                                     <br/>
                                     <Button onClick = {this.removeMaster}>
                                         Renunta la diriginte
                                     </Button>
                                    </div>
                                    :
                                    <div>
                                        <h6>Aceasta clasa nu are un diriginte!</h6>
                                        <Button onClick={this.showModalForNewMaster}>
                                            Adauga Diriginte
                                        </Button>
                                    </div>
                            }
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {yearStructure} = state.yearStructureReducer;
    const {students , courses,
    masterOfClass, allFreeStudents,
    allFreeUnassignedCourses, simpleProfessors,
    showModalForTransfStudent, differenceCourses, clasa} = state.adminProfileClassReducer;

return {students, courses, masterOfClass,
    allFreeStudents, allFreeUnassignedCourses,
    simpleProfessors, showModalForTransfStudent, differenceCourses, yearStructure, clasa};
};

const mapDispatchToProps = (dispatch) => ({
    fetchProfileClassData: (classId) => {dispatch(fetchProfileClassData(classId))},
    fetchFreeStudents: () => {dispatch(fetchFreeStudents())},
    assignManyStudentsToClass: (classStudents) => {dispatch(assignManyStudentsToClass(classStudents))},
    removeSelectedStudentFromClass: (classId, studentId) => {dispatch(removeSelectedStudentFromClass(classId, studentId))},
    fetchFreeCoursesClass: (classId) => {dispatch(fetchFreeCoursesClass(classId))},
    assignManyCoursesToClass: (classId, courses) => {dispatch(assignManyCoursesToClass(classId, courses))},
    removeCoursAndProfessorFromClass: (classId, coursId) => {dispatch(removeCoursAndProfessorFromClass(classId, coursId))},
    getAllProfessorsThatAreNotMasters: () => {dispatch(getAllProfessorsThatAreNotMasters())},
    assignMasterToClass: (classID, professorID) => {dispatch(assignMasterToClass(classID, professorID))},
    removeMasterOfClass: (classID) => {dispatch(removeMasterOfClass(classID))},
    getYearStructure:() => {dispatch(getYearStructure())},
    assignStudentToClassSemI:(studentID, classID) => {dispatch(assignStudentToClassSemI(studentID, classID))},
    modalForTransfStudent:(show) => {dispatch(modalForTransfStudent(show))},
    assignTStudentToClass:(data) => {dispatch(assignTransferredStudentToClass(data))},
    changeProfileClassData:(data) => {dispatch(changeProfileClassData(data))}
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminClassProfile);
