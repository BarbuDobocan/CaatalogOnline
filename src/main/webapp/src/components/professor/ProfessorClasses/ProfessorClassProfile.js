import React from "react";
import {
    assignGradeToStudent,
    fetchStudentsFromSelectedClass,
    assignMissingToStudent,
    fetchDataForFinalGrade,
    newFinalGradeForStudent, fetchStudentCoursMissings
} from "../../../redux/actions/professorClasses";
import {connect} from "react-redux";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Button, Col, Row} from "react-bootstrap";
import AssignGradeModal from "./AssignGradeModal";
import AssignMissingModal from "./AssignMissingModal";
import AssignFinalGradeModal from "./AssignFinalGradeModal";
import {getYearStructure} from "../../../redux/actions/yearStuctureAction";
import "../ProfessorMasterClass/ProfessorMasterClass.scss";
import "./ProfessorClassProfile.scss";


class ProfessorClassProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newGradeModal: false,
            newMissingModal: false,
            finalGradeModal: false,
            newGrade:{
                nota: null,
                coursId: null,
                studentId: null,
                professorId: 0,
                date: new Date(),
            },
            newMissing:{
                date: new Date(),
                professorId: 0,
                studentId: null,
                coursId: null
            },
            newFinalGrade:{
                studentId: null,
                semester: 0,
                coursId: null,
                grade: null,
            }
        }
    }

    whatSemesterIs(){
        let semester = 0;
        if(this.props.yearStructure.scolarYearStructure && this.props.yearStructure.scolarYearStructure.semIstart)
        {
            semester = 1;
        }
        if(this.props.yearStructure.scolarYearStructure && this.props.yearStructure.scolarYearStructure.semIIstart)
        {
            semester = 2;
        }
        return semester;
    }

    finalGrade(){
        let grade = null;
        if(this.props.finalGradeForStudentData) {
            if(this.props.finalGradeForStudentData.studentGradesResponse.length > 0){
                grade = 0;
                this.props.finalGradeForStudentData.studentGradesResponse.map((item) => {
                    grade = grade + item.grade;
                });
                grade = grade / this.props.finalGradeForStudentData.studentGradesResponse.length;
            }
        }
        return grade;
    }

    showFinalGradeModal = (student) => {
        let semester = this.whatSemesterIs();
        this.setState({
            finalGradeModal: true,
            newFinalGrade:{
                studentId: student,
                semester: semester,
                coursId: this.state.newFinalGrade.coursId,
                grade: this.state.newFinalGrade.grade,
            }
        });
        if(this.props.professorClassCommonCourses && this.props.professorClassCommonCourses.length > 0)
        {
            let cours = this.props.professorClassCommonCourses[0];
            this.props.fetchDataForFinalGrade(
                student,
                cours.id,
                semester
            )
        }
    };

    handleNewFinalGradeCours = (e) => {
        let semester = this.whatSemesterIs();
        this.setState({
            finalGradeModal: true,
            newFinalGrade:{
                studentId: this.state.newFinalGrade.studentId,
                semester: semester,
                coursId: e.target.value,
                grade: this.state.newFinalGrade.grade
            }
        });
            this.props.fetchDataForFinalGrade(
                this.state.newFinalGrade.studentId,
                e.target.value,
                semester
            );
    };

    handleNewFinalGradeGrade = () => {
        let semester = this.whatSemesterIs();
        let grade = this.finalGrade();
      this.setState({
          newFinalGrade:{
              studentId: this.state.newFinalGrade.studentId,
              semester: semester,
              coursId: this.state.newFinalGrade.coursId,
              grade: grade
          }
      })
    };

    hideFinalGradeModal = () => {
        this.setState({
            finalGradeModal: false,
            newFinalGrade:{
                studentId: this.state.newFinalGrade.studentId,
                semester: this.state.newFinalGrade.semester,
                coursId: this.state.newFinalGrade.coursId,
                grade: null
           }});
    };

    handleSelectNewMissingDate = (date) => {
        this.setState({newMissing:{
                date: date,
                professorId: 0,
                studentId: this.state.newMissing.studentId,
                coursId: this.state.newMissing.coursId
            }});
    };

    handleSelectDateForNewGrade = (date) => {
      this.setState({newGrade: {
          nota: this.state.newGrade.nota,
          coursId: this.state.newGrade.coursId,
          studentId: this.state.newGrade.studentId,
          professorId: 0,
          date: date
      }})
    };


    handleSelectNewMissingCoursId = (e) => {
        let semester = this.whatSemesterIs();
        this.setState({newMissing:{
                date: this.state.newMissing.date,
                professorId: 0,
                studentId: this.state.newMissing.studentId,
                coursId: e.target.value
            }});
        this.props.fetchStudentCoursMissings(this.state.newMissing.studentId, e.target.value, semester);
    };

    handleSelectedGrade = (e) => {
        this.setState({newGrade:{
            nota: parseInt(e.target.value, 10),
            coursId: this.state.newGrade.coursId,
            studentId: this.state.newGrade.studentId,
            professorId: 0,
            date: this.state.newGrade.date
        }});
    };

    handleSelectedCours = (e) => {
        let semester = this.whatSemesterIs();
        this.setState({newGrade:{
            nota: this.state.newGrade.nota,
            coursId: e.target.value,
            studentId: this.state.newGrade.studentId,
            professorId: 0,
            date: this.state.newGrade.date
            }});
        this.props.fetchDataForFinalGrade(
            this.state.newGrade.studentId,
            e.target.value,
            semester
        );
    };

    hideNewGradeModal = () =>{
        this.setState({newGradeModal: false})
    };

    showNewGradeModal = (selectedStudent) =>{
        let semester = this.whatSemesterIs();
         if(this.props.professorClassCommonCourses.length > 0)
         {
             this.setState({
                 newGradeModal: true,
                 newGrade:{
                     nota:1,
                     coursId: this.props.professorClassCommonCourses[0].id,
                     studentId: selectedStudent,
                     professorId: 0,
                     date: this.state.newGrade.date
                 }
             });
             let cours = this.props.professorClassCommonCourses[0];
             this.props.fetchDataForFinalGrade(selectedStudent, cours.id, semester);
         }
        else
            this.setState({newGradeModal: true});
    };

    hideNewMissingModal = () => {
        this.setState({newMissingModal: false})
    };

    showNewMissingModal = (selectedStudent) => {
        let semester = this.whatSemesterIs();
         if(this.props.professorClassCommonCourses.length > 0)
         {
             this.setState({
                 newMissingModal: true,
                 newMissing:{
                     date: this.state.newMissing.date,
                     professorId: 0,
                     studentId: selectedStudent,
                     coursId: this.props.professorClassCommonCourses[0].id,
                 }
             });
             this.props.fetchStudentCoursMissings(selectedStudent, this.props.professorClassCommonCourses[0].id, semester)
         }

        else
            this.setState({newMissingModal: true})
    };

    assignNewGradeToStudent = () => {
        this.props.assignGradeToStudent(this.state.newGrade);
        this.setState({newGradeModal: false})
    };

    assignNewMissingToStudent = () => {
      this.props.assignMissingToStudent(this.state.newMissing);
      this.setState({newMissingModal: false});
    };

    assignNewFinalGradeToStudent = () => {
        let newFinalGrade = this.state.newFinalGrade;
        newFinalGrade.grade = Math.round(this.state.newFinalGrade.grade);
        this.props.newFinalGradeForStudent(newFinalGrade);
    };

    componentDidMount() {
        this.props.getYearStructure();
        if(this.props.location.state && this.props.location.state.row.id)
        {
            this.props.fetchStudentsFromSelectedClass(this.props.location.state.row.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    textCanBeSorted = (text) => {
        return(
            <div>
                {text + " "}
                <i className="fa fa-sort" aria-hidden="true"/>
            </div>
        )
    };

    render() {
        let columnss = [
            {
                text: this.textCanBeSorted('Nume'),
                dataField: 'name',
                sort: true
            },
            {
                text: this.textCanBeSorted('Username'),
                dataField: 'userName',
                sort: true
            },
            {
              text: this.textCanBeSorted('Telefon'),
              dataField: 'phoneNumber',
                sort: true
            },
            {
              text: this.textCanBeSorted("Email"),
              dataField: 'email',
              sort: true
            },
            {
                text: this.textCanBeSorted('Numar matricol'),
                dataField: 'registrationNumber',
                sort: true,
            }
        ];

        const expandRow = {
            renderer: row => (
                <div className={"expanted-row-buttons"}>
                <Button
                    onClick={() => {this.showNewGradeModal(row.id)}}
                >Adauga Nota</Button>

                <Button
                    onClick={()=>{
                        this.showNewMissingModal(row.id);
                    }}
                >Adauga Absenta</Button>


                    <Button
                    onClick = {()=>{
                        this.props.history.push({
                            pathname: '/professorStudentProfile',
                            state:{ student:row, courses:this.props.professorClassCommonCourses, yearStructure:this.props.yearStructure }
                        })
                    }}>
                    Profilul Studentului
                    </Button>
                    {/*<Button*/}
                    {/*    onClick={()=>{*/}
                    {/*       this.showFinalGradeModal(row.id);*/}
                    {/*    }}*/}
                    {/*>Incheie media</Button>*/}
                </div>
            ),
            onlyOneExpanding: true
        };

        return(
            <div className={"professor-class-profile-main-row"}>
                {/*<AssignFinalGradeModal*/}
                {/*    finalGradeModal = {this.state.finalGradeModal}*/}
                {/*    professorClassCommonCourses = {this.props.professorClassCommonCourses}*/}
                {/*    yearStructure = {this.props.yearStructure}*/}
                {/*    finalGradeForStudentData = {this.props.finalGradeForStudentData}*/}
                {/*    newFinalGrade = {this.state.newFinalGrade}*/}

                {/*    assignNewFinalGradeToStudent = {this.assignNewFinalGradeToStudent}*/}
                {/*    handleNewFinalGradeGrade = {this.handleNewFinalGradeGrade}*/}
                {/*    handleNewFinalGradeCours = {this.handleNewFinalGradeCours}*/}
                {/*    hideFinalGradeModal = {this.hideFinalGradeModal}*/}
                {/*    />*/}

                <AssignMissingModal
                    newMissingModal = {this.state.newMissingModal}
                    yearStructure = {this.props.yearStructure}
                    professorClassCourses = {this.props.professorClassCommonCourses}
                    startDate = {this.state.newMissing.date}
                    selectedStudentMissings = {this.props.selectedStudentMissings}

                    handleSelectNewMissingCoursId={this.handleSelectNewMissingCoursId}
                    hideNewMissingeModal = {this.hideNewMissingModal}
                    assignNewMissingToStudent = {this.assignNewMissingToStudent}
                    handleSelectNewMissingDate = {this.handleSelectNewMissingDate}
                />

                <AssignGradeModal
                    newGradeModal = {this.state.newGradeModal}
                    professorClassCourses = {this.props.professorClassCommonCourses}
                    selectedGrade = {this.state.newGrade.nota}
                    selectedCours = {this.state.newGrade.coursId}
                    yearStructure = {this.props.yearStructure}
                    startDate = {this.state.newGrade.date}
                    finalGradeForStudentData = {this.props.finalGradeForStudentData}

                    handleSelectDateForNewGrade = {this.handleSelectDateForNewGrade}
                    assignNewGradeToStudent = {this.assignNewGradeToStudent}
                    handleSelectedGrade = {this.handleSelectedGrade}
                    handleSelectedCours = {this.handleSelectedCours}
                    hideNewGradeModal = {this.hideNewGradeModal}
                    />
                <div>
                    <Row className={"professor-class-profile-main-row"}>
                        <Col className={"professor-class-profile-col1"} sm={2} md={2} lg={2}>
                            <h4>Datele clasei</h4>
                            <Row><h6>Numele Clasei: </h6><h6>{this.props.location.state.row.name}</h6></Row>
                            <Row><h6>Anul Clasei: </h6><h6>{this.props.location.state.row.year}</h6></Row>
                            <Row><h6>Numarul de elevi: </h6><h6>{this.props.professorSelectedClass.length}</h6></Row>
                        </Col>
                        <Col className={"professor-class-profile-col2"} sm={9} md={9} lg={9}>
                <ToolkitProvider
                    keyField="id"
                    data={ this.props.professorSelectedClass }//studentii clasei
                    columns={ columnss }
                >
                    {
                        proprieties => (
                            <div>
                                <BootstrapTable
                                    { ...proprieties.baseProps }
                                    pagination={ paginationFactory() }
                                    expandRow={ expandRow }
                                   // rowEvents={ rowEventsS }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
//fetchStudentsFromSelectedClass
const mapStateToProps = (state) => {
    const {yearStructure} = state.yearStructureReducer;
    const {professorSelectedClass, professorClassCommonCourses, finalGradeForStudentData, selectedStudentMissings} = state.professorSelectedClassReducer;
    return {professorSelectedClass, professorClassCommonCourses, finalGradeForStudentData, yearStructure, selectedStudentMissings};
};

const mapDispatchToProps = (dispatch) => ({
    // datele studentilor si cursurile comune dintre profesor si clasa
    fetchStudentsFromSelectedClass:(classId) => {dispatch(fetchStudentsFromSelectedClass(classId))},
    assignGradeToStudent:(newGrade) => {dispatch(assignGradeToStudent(newGrade))},
    assignMissingToStudent:(newMissing) => {dispatch(assignMissingToStudent(newMissing))},
    getYearStructure:() => {dispatch(getYearStructure())},
    fetchDataForFinalGrade:(studentId, coursId, semester) => {dispatch(fetchDataForFinalGrade(studentId, coursId, semester))},
    newFinalGradeForStudent:(newFinalGrade) => {dispatch(newFinalGradeForStudent(newFinalGrade))},
    fetchStudentCoursMissings: (studentId, coursId, semester) => {dispatch(fetchStudentCoursMissings(studentId, coursId, semester))}
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorClassProfile);
