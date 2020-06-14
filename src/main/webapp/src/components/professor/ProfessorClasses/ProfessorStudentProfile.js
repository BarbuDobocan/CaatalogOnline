import React from "react";
import {Row, Col, Form, Button} from 'react-bootstrap';
import {
    fetchDataForFinalGrade,
    fetchStudentCoursMissings,
    deleteGrade,
    deleteMissing,
    deleteThesis,
    assignGradeToStudent,
    assignMissingToStudent,
    newFinalGradeForStudent,
    deleteStudentFinalGrade,
    assignThesisToStudent, setStudentCoursMissings, setDataForFinalGrade
} from "../../../redux/actions/professorClasses";
import {connect} from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ProfileStudentAssignGradeModal from "./ProfileStudentAssignGradeModal";
import ProfileStudentAssignMissingModal from "./ProfileStudentAssingMissingModal";
import ProfileStudentAssignNewThesis from "./ProfileStudentAssignNewThesis";
import AssignFinalGradeModal from "./AssignFinalGradeModal";
import "./ProfessorStudentProfile.scss";

class ProfessorStudentProfile extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            selectedCoursGarde: this.props.location.state.courses[0].id,
            selectedCoursMissing: this.props.location.state.courses[0].id,
            selectedStudent: this.props.location.state.student.id,

            newGradeModal: false,
            newGrade: 1,
            newGradeDate: new Date(),

            newMissingModal: false,
            newMissingDate: new Date(),

            newTezaModal: false,
            newTezaGrade: 1,
            newTezaDate: new Date(),

            newFinalGradeModal: false,
            newFinalGrade: null,

            selectedSemester: null

        }
    }

    showNewGradeModal = () => {
        this.setState({newGradeModal: true})
    };
    hideNewGradeModal = () => {
        this.setState({newGradeModal: false})
    };
    handleNewGrade = (e) =>{
        debugger;
      this.setState({newGrade: e.target.value})
    };
    handleNewGradeDate = (date) => {
        this.setState({newGradeDate: date})
    };
    handleSelectNewMissingDate = (date) => {
      this.setState({newMissingDate: date})
    };


    showNewMissingModal = () => {
        this.setState({newMissingModal: true})
    };
    hideNewMissingModal = () => {
        this.setState({newMissingModal: false})
    };
    showNewTezaModal = () => {
        this.setState({newTezaModal: true})
    };
    hideNewTezaModal = () => {
        this.setState({
            newTezaModal: false,
            newTezaGrade: 1
        })
    };
    showNewFnalGradeModal = () => {
        this.setState({newFinalGradeModal: true, newFinalGrade: null})
    };
    hideNewFnalGradeModal = () => {
        this.setState({newFinalGradeModal: false})
    };


    componentDidMount() {
        let semester = this.whatSemesterIs();
        this.setState({selectedSemester: semester});
        if(this.props.location.state && this.props.location.state.courses > 0)
        // {
        //     this.setState({
        //         selectedCoursGarde: this.props.location.state.courses[0].id,
        //         selectedCoursMissing: this.props.location.state.courses[0].id,
        //     });
        //     this.props.fetchStudentCoursMissings(this.state.selectedStudent, this.props.location.state.courses[0].id, semester);
        //     this.props.fetchDataForFinalGrade(this.state.selectedStudent, this.props.location.state.courses[0].id, semester);
        // }

            this.props.fetchStudentCoursMissings(this.state.selectedStudent, this.state.selectedCoursMissing, semester);
            this.props.fetchDataForFinalGrade(this.state.selectedStudent, this.state.selectedCoursGarde, semester);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
        this.props.setStudentCoursMissings();
        this.props.setDataForFinalGrade();
        ///curata notele si absentele studentului din redux
    }

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

    handleSelectNewTezaGrade = (e) => {
        this.setState({newTezaGrade: e.target.value});
    };

    handleSelectNewTezaDate = (date) => {
        this.setState({newTezaDate: date});
    };

    handleSelectedCourses = (e) => {
        // let semester = this.whatSemesterIs();
        let semester = this.state.selectedSemester;
        this.setState({selectedCoursGarde: e.target.value});
        this.props.fetchDataForFinalGrade(this.state.selectedStudent, e.target.value, semester);
    };

    handleSelectedCoursForMissings = (e) => {
       // let semester = this.whatSemesterIs();
        let semester = this.state.selectedSemester;
        this.setState({selectedCoursMissing: e.target.value});
        this.props.fetchStudentCoursMissings(this.state.selectedStudent, e.target.value, semester);
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

     assignGradeToStudentA = () =>{
         let newGrade = {
        nota: this.state.newGrade,
        coursId: this.state.selectedCoursGarde,
        studentId: this.state.selectedStudent,
        professorId: 0,
        date: this.state.newGradeDate,
        };
        this.props.assignGradeToStudent(newGrade);
        this.hideNewGradeModal()
     };

     assignMissingToStudentA = () =>{
         let newMissing = {
             date: this.state.newMissingDate,
             professorId: 0,
             studentId: this.state.selectedStudent,
             coursId: this.state.selectedCoursMissing
         };
         this.props.assignMissingToStudent(newMissing);
         this.hideNewMissingModal()
     };

    assignNewFinalGradeToStudentA = () => {
        let newFinalGrade = {
            studentId: this.state.selectedStudent,
            coursId: this.state.selectedCoursGarde,
            grade: Math.round(this.state.newFinalGrade),
            semester: this.whatSemesterIs()
        };
        console.log("New Final Grade ", newFinalGrade);
        debugger;
        this.props.newFinalGradeForStudent(newFinalGrade);
        this.hideNewFnalGradeModal();
    };

    deleteFinalGrade = () => {
      this.props.deleteStudentFinalGrade(this.props.finalGradeForStudentData.finalGradeCours.id);
    };

    assignNewThesis = () => {
        let newThesis = {
            nota: this.state.newTezaGrade,
            coursId: this.state.selectedCoursGarde,
            studentId: this.state.selectedStudent,
            professorId: 0,
            date: this.state.newTezaDate
        };
        debugger;
        this.props.assignThesisToStudent(newThesis);
        this.hideNewTezaModal();
    };

    makeAverage = () => {
        let sum = 0;
        this.props.finalGradeForStudentData.studentGradesResponse.map((item)=>{
            sum = sum + item.grade;
        });
        let average = sum/this.props.finalGradeForStudentData.studentGradesResponse.length;
        if(this.props.finalGradeForStudentData.thesis && this.props.finalGradeForStudentData.thesis.length > 0){
            debugger;
            average = (average * 3 + this.props.finalGradeForStudentData.thesis[0].grade)/4;
        }
        this.setState({newFinalGrade: average})
    };

     deleteStudentGradeFormatter = (cell, row) => {
        if(this.state.selectedSemester === this.whatSemesterIs())
         return(
       <Button onClick={()=>{
           this.props.deleteGrade(row.id)
       }}>
           Sterge Nota
       </Button>);
     };

    // dateFormatter = (cell, row) => {
    //
    //   //let string = cell.getYear() + '/' + cell.getMonth() + '/' +cell.getData()
    //     return <div>cell</div>
    // };

    deleteStudentAbsenceFormatter = (cell, row) => {
        if(this.state.selectedSemester === this.whatSemesterIs())
        if(!row.motivated)
        return(
            <Button onClick={()=>{
                 this.props.deleteMissing(row.id);
            }}>
                Sterge Absenta
            </Button>);
    };

    deleteStudentThesisFormatter = (cell, row) => {
        if(this.state.selectedSemester === this.whatSemesterIs())
        return(
            <Button onClick={()=>{
                debugger;
                this.props.deleteThesis(row.id)
            }}>
                Sterge Teza
            </Button>
        )
    };

    textCanBeSorted = (text) => {
        return(
            <div>
                {text + " "}
                <i className="fa fa-sort" aria-hidden="true"/>
            </div>
        )
    };
    setSemesterI = () => {
        this.setState({selectedSemester: 1});
        this.props.fetchDataForFinalGrade(this.props.location.state.student.id, this.state.selectedCoursGarde, 1);
        this.props.fetchStudentCoursMissings(this.props.location.state.student.id, this.state.selectedCoursMissing, 1);
    };

    setSemesterII = () => {
        this.setState({selectedSemester: 2});
        this.props.fetchDataForFinalGrade(this.props.location.state.student.id, this.state.selectedCoursGarde, 2);
        this.props.fetchStudentCoursMissings(this.props.location.state.student.id, this.state.selectedCoursMissing, 2);
    };

    render() {
        let columns = [
            {
                text: this.textCanBeSorted('Materie'),
                dataField: 'coursName',
                sort: true
            },
            {
                text: this.textCanBeSorted("Data"),
                dataField: 'date',
                sort: true
            },
            {
                text: this.textCanBeSorted("Profesor"),
                dataField: "professorName",
                sort: true
            },
            {
                text: 'Motivata',
                dataField: 'motivated',
                formatter: this.missingsTableSmallFormatter
            }
        ];
        if(this.props.finalGradeForStudentData && !this.props.finalGradeForStudentData.finalGradeCours && this.whatSemesterIs() !== 0){
            columns.push({
                text: 'Sterge',
                formatter: this.deleteStudentAbsenceFormatter
            })
        }

        let columnss = [
            {
                text: this.textCanBeSorted('Materie'),
                dataField: 'cours.coursName',
                sort: true
            },
            {
                text: this.textCanBeSorted('Nota'),
                dataField: 'grade',
                sort: true,
            },
            {
                text: this.textCanBeSorted('Profesor'),
                dataField: 'professorName',
                sort: true,
            },
            {
                text: this.textCanBeSorted("Data"),
                dataField: 'date',
                sort: true
            }
        ];
        if(this.props.finalGradeForStudentData && !this.props.finalGradeForStudentData.finalGradeCours && this.whatSemesterIs() !== 0){
            columnss.push({
                text: 'Sterge',
                formatter: this.deleteStudentGradeFormatter
            })
        }

        let columnsThesis = [
            {
                text: 'Materie',
                dataField: 'cours.coursName',
            },
            {
                text: 'Nota',
                dataField: 'grade',
            },
            {
                text: 'Profesor',
                dataField: 'professorName',
            },
            {
                text: "Data",
                dataField: 'date',
               // formatter: this.dateFormatter
            }
        ];
        if(this.props.finalGradeForStudentData && !this.props.finalGradeForStudentData.finalGradeCours){
            columnsThesis.push({
                text: 'Sterge',
                formatter: this.deleteStudentThesisFormatter
            })
        }
        return (
            <div className={"professor-student-profile-mai-row"}>
                <AssignFinalGradeModal
                    newFinalGradeModal = {this.state.newFinalGradeModal}
                    grades = {this.props.finalGradeForStudentData ? this.props.finalGradeForStudentData.studentGradesResponse : []}
                    thesis = {this.props.finalGradeForStudentData ? this.props.finalGradeForStudentData.thesis : []}
                    newFinalGrade = {this.state.newFinalGrade}

                    assignNewFinalGradeToStudentA = {this.assignNewFinalGradeToStudentA}
                    hideNewFnalGradeModal = {this.hideNewFnalGradeModal}
                    makeAverage = {this.makeAverage}
                    />

                <ProfileStudentAssignMissingModal
                    newMissingModal = {this.state.newMissingModal}
                    newMissingDate = {this.state.newMissingDate}

                    hideNewMissingModal = {this.hideNewMissingModal}
                    handleSelectNewMissingDate = {this.handleSelectNewMissingDate}
                    assignMissingToStudentA = {this.assignMissingToStudentA}
                    />

                <ProfileStudentAssignGradeModal
                    newGradeModal = {this.state.newGradeModal}
                    newGradeDate = {this.state.newGradeDate}
                    finalGradeForStudentData = {this.props.finalGradeForStudentData}

                    assignGradeToStudent = {this.assignGradeToStudentA}
                    handleNewGrade = {this.handleNewGrade}
                    hideNewGradeModal = {this.hideNewGradeModal}
                    handleNewGradeDate = {this.handleNewGradeDate}
                />

                <ProfileStudentAssignNewThesis
                    newTezaModal = {this.state.newTezaModal}
                    newTezaDate = {this.state.newTezaDate}

                    assignNewThesis = {this.assignNewThesis}
                    handleSelectNewTezaDate = {this.handleSelectNewTezaDate}
                    handleSelectNewTezaGrade = {this.handleSelectNewTezaGrade}
                    hideNewTezaModal = {this.hideNewTezaModal}
                />

                <Row>
                    <Col className={"professor-student-profile-col1"} sm={3} md={3} lg={3}>
                        {
                            <div>
                            <h6>Nume: {this.props.location.state.student.name}</h6>
                            <h6>Email: {this.props.location.state.student.email}</h6>
                            <h6>Telefon: {this.props.location.state.student.phoneNumber}</h6>
                            <h6>Nr. Matricol: {this.props.location.state.student.registrationNumber}</h6>
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
                    <Col sm={8} md={8} lg={8}>
                        <Tabs defaultActiveKey="note" transition={false} id="noanim-tab-example">
                            <Tab eventKey="note" title="Note">
                            <Form.Group>
                                <Form.Control onChange={this.handleSelectedCourses} as="select">
                                    {
                                        this.props.location.state.courses.map((item)=> {
                                            return(<option value={item.id}>{item.coursName}</option>)
                                        })
                                    }
                                </Form.Control>
                                {
                                    this.props.finalGradeForStudentData && this.props.finalGradeForStudentData.finalGradeCours &&
                                   <Row>
                                       <Col sm={4} md={4} lg={4}>
                                        <h5>Media este incheiata cu nota:</h5>
                                       </Col>
                                       <Col sm={2} md={2} lg={2}>
                                        <h4>{this.props.finalGradeForStudentData.finalGradeCours.grade}</h4>
                                       </Col>
                                       <Col sm={4} md={4} lg={4}>
                                           {
                                               this.props.finalGradeForStudentData.canFinalGradeBeDeleted &&
                                               this.state.selectedSemester === this.whatSemesterIs() &&
                                               <Button onClick={this.deleteFinalGrade}>Sterge media</Button>
                                           }
                                       </Col>
                                   </Row>
                                }
                                <ToolkitProvider
                                    keyField="id"
                                    data={ this.props.finalGradeForStudentData
                                        ? this.props.finalGradeForStudentData.studentGradesResponse : [] }
                                    columns={ columnss }>
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
                            </Form.Group>
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
                                                    columns={ columnsThesis }>
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
                                                <hr/>
                                              NU ARE TEZA!
                                                {
                                                    this.props.location.state.yearStructure &&
                                                    (this.props.location.state.yearStructure.scolarYearStructure.semIstart ||
                                                        this.props.location.state.yearStructure.scolarYearStructure.semIIstart) &&
                                                    this.props.finalGradeForStudentData && !this.props.finalGradeForStudentData.finalGradeCours &&
                                                    this.state.selectedSemester === this.whatSemesterIs() &&
                                                    <Button onClick={this.showNewTezaModal}>
                                                        Adauga o teza
                                                    </Button>
                                                }
                                                <hr/>
                                            </h6>
                                    }
                                </div>
                                {
                                    this.props.location.state.yearStructure &&
                                    (this.props.location.state.yearStructure.scolarYearStructure.semIstart ||
                                        this.props.location.state.yearStructure.scolarYearStructure.semIIstart) &&
                                    this.props.finalGradeForStudentData && !this.props.finalGradeForStudentData.finalGradeCours &&
                                    this.state.selectedSemester === this.whatSemesterIs() &&
                                    <Button className={"adaugati-nota-button"} onClick={this.showNewGradeModal}>Adaugati nota</Button>
                                }

                                {
                                    this.props.location.state.yearStructure &&
                                    (this.props.location.state.yearStructure.scolarYearStructure.semIstart ||
                                    this.props.location.state.yearStructure.scolarYearStructure.semIIstart) &&
                                    this.props.finalGradeForStudentData && !this.props.finalGradeForStudentData.finalGradeCours &&
                                    this.state.selectedSemester === this.whatSemesterIs() &&
                                    <Button onClick={this.showNewFnalGradeModal}>Incheiati media</Button>
                                }

                            </Tab>
                            <Tab eventKey="absente" title="Absente">
                                <Form.Group>
                                    <Form.Control onChange={this.handleSelectedCoursForMissings} as="select">
                                        {
                                            this.props.location.state.courses.map((item)=> {
                                                return(<option value={item.id}>{item.coursName}</option>)
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
                                    {
                                        this.props.location.state.yearStructure &&
                                        (this.props.location.state.yearStructure.scolarYearStructure.semIstart ||
                                            this.props.location.state.yearStructure.scolarYearStructure.semIIstart) &&
                                            //this.state.selectedCoursMissing !== null &&
                                        this.state.selectedSemester === this.whatSemesterIs() &&
                                        <Button onClick={this.showNewMissingModal}>Adaugati absenta</Button>
                                    }
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {professorSelectedClass, professorClassCommonCourses, finalGradeForStudentData, selectedStudentMissings} = state.professorSelectedClassReducer;
    return {professorSelectedClass, professorClassCommonCourses, finalGradeForStudentData, selectedStudentMissings};
};

const mapDispatchToProps = (dispatch) => ({
    fetchStudentCoursMissings: (studentId, coursId, semester) => {dispatch(fetchStudentCoursMissings(studentId, coursId, semester))},
    fetchDataForFinalGrade: (studentId, coursId, semester) => {dispatch(fetchDataForFinalGrade(studentId, coursId, semester))},
    deleteGrade: (gradeId) => {dispatch(deleteGrade(gradeId))},
    deleteMissing: (absenceId) => {dispatch(deleteMissing(absenceId))},
    deleteThesis: (thesisId) => {dispatch(deleteThesis(thesisId))},
    assignGradeToStudent: (newGrade) => {dispatch(assignGradeToStudent(newGrade))},
    assignMissingToStudent:(newMissing) => {dispatch(assignMissingToStudent(newMissing))},
    newFinalGradeForStudent:(newFinalGrade) => {dispatch(newFinalGradeForStudent(newFinalGrade))},
    deleteStudentFinalGrade:(finalGradeId) => {dispatch(deleteStudentFinalGrade(finalGradeId))},
    assignThesisToStudent:(newThesis) => {dispatch(assignThesisToStudent(newThesis))},

    setStudentCoursMissings:() => {dispatch(setStudentCoursMissings([]))},
    setDataForFinalGrade:() => {dispatch(setDataForFinalGrade(null))}
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorStudentProfile);
