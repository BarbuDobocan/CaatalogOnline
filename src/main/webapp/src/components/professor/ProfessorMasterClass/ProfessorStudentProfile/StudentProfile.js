import React from 'react';
import {Row, Col, Form, Modal, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import './StudentProfile.scss';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {getYearStructure} from "../../../../redux/actions/yearStuctureAction";
import {fetchDataForFinalGrade, fetchStudentCoursMissings} from "../../../../redux/actions/professorClasses";
import {
    fetchMasterAssignedClass,
    motivateAbsence,
    fetchStudentAllTypeFinalGrades,
    setStudentFinalGradeBehavior,
    deleteStudentFinalBehaviorGrade,
    assignStudentTotalGrade,
    deleteStudentTotalGrade} from "../../../../redux/actions/professorMasterClass";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import auth from "../../../../authentication/auth";
import StudentFinalGrades from "./StudentFinalGrades";
import AssignBehaviorModal from "./AssignBehaviorModal";
import StudentTotalGradeModal from "./StudentTotalGradeModal";

class StudentProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedCours: -2,
            selectedStudent: this.props.location.state ? this.props.location.state.student.id : 0,

            finaGradeBehaviorModal: false,
            finalGradeBehaviorGrade: 1,
            finalGradeBehaviorCours: 10,

            totalGradeModal: false,
            totalGrade: null,

            behaviorGradeId: null,

            //new try
            selectedSemester: null,
            selectedCoursForGrades: 0
        }
    }

    hideTotalGradeModal = () =>{
        this.setState({totalGradeModal: false})
    };

    showTotalGradeModal = () =>{
        this.setState({totalGradeModal: true})
    };

    setSemesterI = () => {
        this.setState({selectedSemester: 1});
        this.props.fetchDataForFinalGrade(this.props.location.state.student.id, this.state.selectedCoursForGrades, 1);
        this.props.fetchStudentCoursMissings(this.props.location.state.student.id, this.state.selectedCours, 1);
    };

    setSemesterII = () => {
        this.setState({selectedSemester: 2});
        this.props.fetchDataForFinalGrade(this.props.location.state.student.id, this.state.selectedCoursForGrades, 2);
        this.props.fetchStudentCoursMissings(this.props.location.state.student.id, this.state.selectedCours, 2);
    };

    handleBehaviorGradeId = (e) => {
      this.setState({behaviorGradeId: e})
    };

    showFinalGradeBehaviorModal = () => {
      this.setState({finaGradeBehaviorModal: true})
    };

    hideFinalGradeBehaviorModal = () => {
        this.setState({finaGradeBehaviorModal: false})
    };

    handleSelectFinalGradeBehaviorGrade = (event) => {
      this.setState({finalGradeBehaviorGrade: event.target.value})
    };

    whatSemesterIs(){
        let semester = 0;
        if(this.props.location.state.yearStructure.scolarYearStructure.semIstart)
        {
            semester = 1;
        }
        if(this.props.location.state.yearStructure.scolarYearStructure.semIIstart)
        {
            semester = 2;
        }
        return semester;
    }

    assignBehaviorGrade = () => {
        let newGrade = {
             studentId: this.state.selectedStudent,
             coursId: this.state.finalGradeBehaviorCours,
             grade: this.state.finalGradeBehaviorGrade,
             semester: this.whatSemesterIs()
        };
        this.props.setStudentFinalGradeBehavior(newGrade);
        this.hideFinalGradeBehaviorModal();
    };

    deleteBehaviorGrade = () => {
        this.props.deleteStudentFinalBehaviorGrade(this.state.selectedStudent);
    };

    componentDidMount() {
        debugger;
        if(this.props.location.state){
         let semester = this.whatSemesterIs();
         this.setState({selectedSemester:semester});
          this.props.fetchStudentCoursMissings(this.state.selectedStudent, -2, semester);//toate materiile
            if(this.props.location.state.courses.length > 0)
            {
                this.setState({selectedCoursForGrades: this.props.location.state.courses[0].cours.id})
                this.props.fetchDataForFinalGrade(this.state.selectedStudent, this.props.location.state.courses[0].cours.id, semester);
            }
          this.props.fetchStudentAllTypeFinalGrades(this.state.selectedStudent);
          this.props.fetchProfessorMasterClass();
        }else{
            auth.logout(() => {this.props.history.push("/")});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    fetchStudentGradesData = (e) => {
        let studentId = this.props.location.state.student.id;
        let coursId = e.target.value;
        this.setState({selectedCoursForGrades: e.target.value});
        //let semester = this.whatSemesterIs();
        let semester = this.state.selectedSemester;
        this.props.fetchDataForFinalGrade(studentId, coursId, semester);
       // this.props.fetchStudentCoursMissings(studentId, coursId, semester);
    };

    fetchStudentMissingsData = (e) => {
        let studentId = this.props.location.state.student.id;
        let coursId = e.target.value;
        this.setState({selectedCours: e.target.value});
        //let semester = this.whatSemesterIs();
        let semester = this.state.selectedSemester;
        this.props.fetchStudentCoursMissings(studentId, coursId, semester);
    };

    missingsTableSmallFormatter = (cell,row) => {
        if(row.motivated){
            return(<div>MOTIVATA</div>)
        }
        else
        {
            return(<div>NEMOTIVATA</div>)
        }
    };

    motivateStudentAbsenceFormatter = (cell, row) => {
        if(!row.motivated && row.semester === this.whatSemesterIs()){
            return(
                <Button onClick={()=> {this.props.motivateAbsence(row.id, this.state.selectedCours)}}>
                    Motiveaza Absenta
                </Button>
            )
        }
    };

    showAverageButtonSem(){
        let showButtons = {
            semI: true,
            semII: true,
        };
        this.props.studentAllFinalGrades && this.props.studentAllFinalGrades.listGrades.map((item) => {
            if(item.semI === null){
                showButtons.semI = false;
            }
            if(item.semII === null){
                showButtons.semII = false;
            }
        });
        if(this.props.studentAllFinalGrades && this.props.studentAllFinalGrades.averages.semI !== null){
            showButtons.semI = false;
        }
        if(this.props.studentAllFinalGrades && this.props.studentAllFinalGrades.averages.semII !== null){
            showButtons.semII = false;
        }
        return showButtons;
    }

    setTotalGradeForStudent = () => {
        let newTotalGrade = {
            studentId: this.state.selectedStudent,
            finalGrade: this.state.totalGrade
        };
        this.props.assignStudentTotalGrade(newTotalGrade);
        this.hideTotalGradeModal();
    };

    makeTotalAverage = () => {
        let sem = this.whatSemesterIs();
        let list = this.props.studentAllFinalGrades.listGrades;
        let average = 0;
        if(sem == 1){
            list.map((item) => {
                average = average + item.semI.grade;
            });
            average = average / list.length;
        }

        if(sem == 2){
            list.map((item) => {
                average = average + item.semII.grade;
            });
            average = average / list.length;
        }

        this.setState({totalGrade: average});
    };

    deleteStudentTG = () => {
        let semester = this.whatSemesterIs();
        if(semester === 1){
            this.props.deleteStudentTotalGrade(this.props.studentAllFinalGrades.averages.semI.id);
           // this.props.deleteStudentTotalGrade(this.state.totalGradeSemI.id);
        }
        if(semester === 2){
            this.props.deleteStudentTotalGrade(this.props.studentAllFinalGrades.averages.semII.id);
            //this.props.deleteStudentTotalGrade(this.state.totalGradeSemII.id);
        }
    };

    render() {
        const {name, address, phoneNumber, email, userName, registrationNumber} = this.props.location.state.student;
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
            },
            {
                text: 'Motivata',
                dataField: 'motivated',
                formatter: this.missingsTableSmallFormatter
            },
            {
                text: 'Motiveaza',
                formatter: this.motivateStudentAbsenceFormatter
            }
        ];

        return(
            <div>
                <AssignBehaviorModal
                    finaGradeBehaviorModal = {this.state.finaGradeBehaviorModal}

                    assignBehaviorGrade = {this.assignBehaviorGrade}
                    handleSelectFinalGradeBehaviorGrade = {this.handleSelectFinalGradeBehaviorGrade}
                    hideFinalGradeBehaviorModal = {this.hideFinalGradeBehaviorModal}
                />
                <StudentTotalGradeModal
                    totalGradeModal = {this.state.totalGradeModal}
                    studentAllFinalGrades = {this.props.studentAllFinalGrades}
                    scolarYearStructure = {this.props.location.state.yearStructure.scolarYearStructure}
                    totalGrade = {this.state.totalGrade}

                    setTotalGradeForStudent = {this.setTotalGradeForStudent}
                    makeTotalAverage = {this.makeTotalAverage}
                    showTotalGradeModal = {this.showTotalGradeModal}
                    hideTotalGradeModal = {this.hideTotalGradeModal}
                    />
          <Row className={"professor-student-profile-mai-row"}>
              <Col className={"professor-student-profile-col1"} sm={3} md={3} lg={3}>
                  {/*<h4> {roles[0].role} </h4>*/}
                  <Row> NUME: {name} </Row>
                  <Row> USERNAME: {userName}</Row>
                  <Row> ADRESA: {address} </Row>
                  <Row> TELEFON: {phoneNumber} </Row>
                  <Row> EMAIL: {email} </Row>
                  <Row> NUMAR MATRICOL: {registrationNumber} </Row>
                  <Row className={"student-profile-semester"}>
                      <Col sm={6} md={6} lg={6}>
                          Semestrul:
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
              </Col>
              <Col className={"professor-student-profile-col2"} sm={9} md={9} lg={9}>
                  <Tabs defaultActiveKey="Note" transition={false} id="noanim-tab-example">
                      <Tab eventKey="Note" title="Note">
                          <Form.Control onChange={this.fetchStudentGradesData} as="select">
                              {/*<option value={-1}>Toate Materile</option>*/}
                              {
                                  this.props.professorMasterClass && this.props.professorMasterClass.courses.map((item)=> {
                                      return(<option value={item.cours.id}>{item.cours.coursName}</option>)
                                  })
                              }
                          </Form.Control>

                          {this.props.finalGradeForStudentData && this.props.finalGradeForStudentData.finalGradeCours
                              ?
                              <div>
                                  <h5>
                                      Media la materia aceasta este incheiata cu nota:
                                  </h5>
                                  <h4>
                                      {this.props.finalGradeForStudentData.finalGradeCours.grade}
                                  </h4>
                              </div>
                              :
                              <h4>
                                  Studentul nu are situatia incheiata la materia aceasta!
                              </h4>
                          }

                          {
                              this.props.finalGradeForStudentData &&
                              <div>
                                  <ToolkitProvider
                                      keyField="id"
                                      data={ this.props.finalGradeForStudentData.studentGradesResponse }
                                      columns={ columnss }
                                  >
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

                                  <div>
                                      {
                                          this.props.finalGradeForStudentData && this.props.finalGradeForStudentData.thesis
                                              ?
                                              <div>
                                                  <h5>
                                                      TEZA
                                                  </h5>
                                                  <ToolkitProvider
                                                      keyField="id"
                                                      data={ this.props.finalGradeForStudentData
                                                          ? this.props.finalGradeForStudentData.thesis : [] }
                                                      columns={ columnss }>
                                                      {
                                                          proprieties => (
                                                              <div>
                                                                  <BootstrapTable
                                                                      { ...proprieties.baseProps }
                                                                  />
                                                              </div>
                                                          )
                                                      }
                                                  </ToolkitProvider>
                                              </div>
                                              :
                                              <h6>
                                                  NU ARE TEZA!
                                              </h6>
                                      }
                                  </div>

                              </div>
                          }
                      </Tab>
                      <Tab eventKey="Absente" title="Absente">
                          <Form.Control onClick={this.fetchStudentMissingsData} as="select">
                              <option value={-2}>Toate Materiile</option>
                              {
                                  this.props.professorMasterClass && this.props.professorMasterClass.courses.map((item)=> {
                                      return(<option value={item.cours.id}>{item.cours.coursName}</option>)
                                  })
                              }
                          </Form.Control>
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
                      </Tab>
                      <Tab eventKey="Medii" title="Medii">
                        <StudentFinalGrades
                            studentAllFinalGrades = {this.props.studentAllFinalGrades}
                            behaviorGradeId = {this.state.behaviorGradeId}

                            deleteStudentTG = {this.deleteStudentTG}
                            showTotalGradeModal = {this.showTotalGradeModal}
                            showAverageButtonSem = {this.showAverageButtonSem()}
                            handleBehaviorGradeId = {this.handleBehaviorGradeId}
                            semester = {this.whatSemesterIs()}
                            showFinalGradeBehaviorModal = {this.showFinalGradeBehaviorModal}
                            deleteBehaviorGrade = {this.deleteBehaviorGrade}
                        />
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
    const {professorMasterClass, studentAllFinalGrades} = state.professorMasterClassReducer;
    const {finalGradeForStudentData, selectedStudentMissings} = state.professorSelectedClassReducer;
    return {yearStructure, professorMasterClass, finalGradeForStudentData, selectedStudentMissings, studentAllFinalGrades};
};

const mapDispatchToProps = (dispatch) => ({
    getYearStructure:() => {dispatch(getYearStructure())},
    fetchProfessorMasterClass: () => {dispatch(fetchMasterAssignedClass())},
    fetchDataForFinalGrade:(studentId, coursId, semester) => {dispatch(fetchDataForFinalGrade(studentId, coursId, semester))},
    fetchStudentCoursMissings: (studentId, coursId, semester) => {dispatch(fetchStudentCoursMissings(studentId, coursId, semester))},
    motivateAbsence: (absenceId, coursId) => {dispatch(motivateAbsence(absenceId, coursId))},
    fetchStudentAllTypeFinalGrades: (studentId) => {dispatch(fetchStudentAllTypeFinalGrades(studentId))},
    setStudentFinalGradeBehavior: (newGrade) => {dispatch(setStudentFinalGradeBehavior(newGrade))},
    deleteStudentFinalBehaviorGrade: (studentId) => {dispatch(deleteStudentFinalBehaviorGrade(studentId))},
    assignStudentTotalGrade: (totalGradeDTO) => {dispatch(assignStudentTotalGrade(totalGradeDTO))},
    deleteStudentTotalGrade: (totalGradeId) => {dispatch(deleteStudentTotalGrade(totalGradeId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
