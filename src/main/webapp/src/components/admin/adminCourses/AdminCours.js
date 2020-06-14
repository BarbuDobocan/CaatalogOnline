import React from 'react';
import {connect} from "react-redux";
import {fetchCourses, addNewCours, deleteSelectedCours} from "../../../redux/actions/adminCours";
import { Button, Table } from 'react-bootstrap';
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalForNewCours from './ModalForNewCours.js';
import {getYearStructure} from "../../../redux/actions/yearStuctureAction";
import "./AdmminCours.scss";

const { SearchBar } = Search;
class AdminCours extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newCoursModal:false,
            newCours:{ coursName: null }
        }
    }

    showNewCoursModal=()=>{
        this.setState({newCoursModal: true});
    };

    hideNewCoursModal=()=>{
        this.setState({newCoursModal: false});
    };

    handleNewCoursName=(e)=>{
       this.setState({newCours: { coursName: e.target.value }})
    };

    createNewCours=(e)=>{
        console.log(this.state.newCours);
        this.props.addNewCours(this.state.newCours);
        this.hideNewCoursModal();
    };

    componentDidMount() {
        this.props.fetchCourses();
        this.props.getYearStructure();
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

    deleteSelectedCoursFormat=(cell,row)=>{
        if(row.coursName !== "PURTARE")
        {
            return(<Button onClick={(e)=>{
                e.stopPropagation();
                this.props.deleteSelectedCours(row.id);
            }}> Sterge Materia </Button>)
        }
    };

    render() {

        let columnss = [
            {
                text: this.textCanBeSorted('Numele Cursului'),
                dataField: 'coursName',
                sort: true
            }
        ];
        if(this.props.yearStructure && this.props.yearStructure.scolarYearStructure.yearIsStarting)
        {
            columnss.push({
                text: '',
                formatter: this.deleteSelectedCoursFormat,
                headerStyle: () => {
                    return { width: "10%" };
                }

            })
        }

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(e.target.value, row, rowIndex)
            }
        };

        return(<div className={"admin-courses-main"}>

            <ModalForNewCours
                newCoursModal={this.state.newCoursModal}

                handleNewCoursName={this.handleNewCoursName}
                hideNewCoursModal={this.hideNewCoursModal}
                createNewCours={this.createNewCours}
                />
            <h4>Cursuri</h4>

            <ToolkitProvider
                keyField="id"
                data={ this.props.courses ? this.props.courses : [] }
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
                           //     expandRow={ expandRow }
                                rowEvents={ rowEvents }
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            {
                this.props.yearStructure && this.props.yearStructure.scolarYearStructure.yearIsStarting &&
                <Button onClick={this.showNewCoursModal}>
                    ADAUGATI UN CURS NOU
                </Button>
            }

        </div>)
    }
}

const mapStateToProps = (state) => {
    const {yearStructure} = state.yearStructureReducer;
    const {courses} = state.adminCoursReducer;
    return {courses, yearStructure};
};

const mapDispatchToProps = (dispatch) => ({
    fetchCourses: () => {dispatch(fetchCourses())},
    addNewCours: (newCours) => {dispatch(addNewCours(newCours))},
    getYearStructure:() => {dispatch(getYearStructure())},
    deleteSelectedCours: (coursId) => {dispatch(deleteSelectedCours(coursId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCours);
