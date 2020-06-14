import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import {fetchMasterAssignedClass} from "../../../redux/actions/professorMasterClass";
import {connect} from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Button, Col, Row} from "react-bootstrap";
import {fetchDataForFinalGrade, fetchStudentCoursMissings} from "../../../redux/actions/professorClasses";
import "./ProfessorMasterClass.scss";
import {getYearStructure} from "../../../redux/actions/yearStuctureAction";

const { SearchBar } = Search;
class ProfessorMasterClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getYearStructure();
        this.props.fetchProfessorMasterClass();
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

    render(){
        const expandRowS = {
            renderer: row => (
                <Button
                    onClick={()=>{
                        this.props.history.push({
                            pathname: '/professorSelectedStudentProfile',
                            state:{student:row, courses:this.props.professorMasterClass.courses, yearStructure:this.props.yearStructure }
                            //BARBU
                        })}}
                >Vezi Profilul</Button>
            ),
            onlyOneExpanding: true
        };

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
            }
        ];

        return (
            <div>
                {
                    this.props.professorMasterClass ?
                        <div>
                            <Row className={"professor-class-profile-main-row"}>
                                <Col className={"professor-class-profile-col1"} sm={2} md={2} lg={2}>
                                    <h4>Datele clasei</h4>
                                    <Row><h6>Numele Clasei: </h6><h6>{ this.props.professorMasterClass.name}</h6></Row>
                                    <Row><h6>Anul Clasei: </h6><h6>{ this.props.professorMasterClass.year}</h6></Row>
                                    <Row><h6>Numarul de elevi: </h6> <h6>{ this.props.professorMasterClass.students.length}</h6></Row>
                                </Col>

                                <Col className={"professor-class-profile-col2"} sm={9} md={9} lg={9}>

                            <Tabs defaultActiveKey="students" transition={false} id="noanim-tab-example">
                                <Tab eventKey="students" title="Studenti">
                                        <div>
                                            <ToolkitProvider
                                                keyField="id"
                                                data={ this.props.professorMasterClass ? this.props.professorMasterClass.students : []}
                                                columns={ columnss }
                                                search
                                            >
                                                {
                                                    proprieties => (
                                                        <div>
                                                            <SearchBar { ...proprieties.searchProps } />
                                                            <BootstrapTable
                                                                { ...proprieties.baseProps }
                                                                pagination={ paginationFactory() }
                                                                expandRow={ expandRowS }
                                                                //rowEvents={ rowEventsS }
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </ToolkitProvider>
                                        </div>
                                </Tab>
                                <Tab eventKey="courses" title="Materii">
                                    <div>
                                        <ToolkitProvider
                                            keyField="id"
                                            data={ this.props.professorMasterClass ? this.props.professorMasterClass.courses : [] }
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
                                    </div>
                                </Tab>
                            </Tabs>
                                </Col>
                            </Row>
                        </div>
                        :
                        <h5>Nu sunteti diriginte!</h5>
                }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const {professorMasterClass} = state.professorMasterClassReducer;
    const {yearStructure} = state.yearStructureReducer;
    return {professorMasterClass, yearStructure};
};

const mapDispatchToProps = (dispatch) => ({
    fetchProfessorMasterClass:() => {dispatch(fetchMasterAssignedClass())},
    fetchStudentGrades:(studentId, coursId, semester) => {dispatch(fetchDataForFinalGrade(studentId, coursId, semester))},
    getYearStructure:() => {dispatch(getYearStructure())},
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorMasterClass);
