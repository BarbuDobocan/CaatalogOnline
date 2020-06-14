import React from "react";
import {Button, Table} from "react-bootstrap";
import {fetchClasses,
    createNewClass,
    deleteClass,
} from "../../../redux/actions/adminClasses";
import {connect} from "react-redux";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalForNewClass from "./ModalForNewClass.js";
import {getYearStructure} from "../../../redux/actions/yearStuctureAction";
import "./AdminClasses.scss";

const { SearchBar } = Search;
class AdminClasses extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newClassModal: false,
            newClass:{
                year: null,
                name: null
            }
        }
    }

    handleNewClassYear = (e) => {
        this.setState({newClass: {name: this.state.newClass.name, year: e.target.value}})
    };

    handleNewClassName = (e) => {
        this.setState({newClass: {name: e.target.value, year: this.state.newClass.year}})
    };

    addNewClass = () => {
        this.props.createNewClass(this.state.newClass);
        this.hideNewClassModal();
    };

    showNewClassModal=()=>{
        this.setState({newClassModal: true});
    };

    hideNewClassModal=()=>{
        this.setState({newClassModal: false});
    };


    deleteClassFormat=(cell,row)=>{
        return(<Button onClick={(e)=>{
            e.stopPropagation();
            this.props.deleteClass(row.id);
        }}> Sterge Clasa </Button>)
    };

    componentDidMount() {
        this.props.fetchClasses();
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

    render() {
        const expandRow = {
            renderer: row => (
                <Button
                    onClick={()=>{
                        this.props.history.push({
                            pathname: '/adminClassProfile',
                            state: row
                        })}}
                >
                    Profilul Clasei
                </Button>
            )
        };

        let columnss = [
            {
                text: this.textCanBeSorted('Nume'),
                dataField: 'name',
                sort: true
            },
            {
                text: this.textCanBeSorted('An'),
                dataField: 'year',
                sort: true
            }
        ];

        if(this.props.yearStructure && this.props.yearStructure.scolarYearStructure.yearIsStarting)
        {
            columnss.push(   {
                width: '10%',
                text: '',
                formatter: this.deleteClassFormat,
                headerStyle: () => {
                    return { width: "10%" };
                }
            })
        }

        let classes = [];
        if(this.props.classes){
            classes = [...this.props.classes];
        }

        return(<div className={"admin-classes-name"}>
            <ModalForNewClass
                modalForNewClass = {this.state.newClassModal}

                addNewClass={this.addNewClass}
                handleNewClassYear = {this.handleNewClassYear}
                handleNewClassName = {this.handleNewClassName}
                hideNewClassModal = {this.hideNewClassModal}
                />

            <h4>Clase</h4>
            <ToolkitProvider
                keyField="id"
                data={ classes }
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
            {
                this.props.yearStructure && this.props.yearStructure.scolarYearStructure.yearIsStarting &&
                <Button onClick={this.showNewClassModal}>
                    ADAUGATI O CLASA NOUA
                </Button>
            }

        </div>)
    }
}

const mapStateToProps = (state) => {
    const {yearStructure} = state.yearStructureReducer;
    const {classes, selectedClass, waitFlagClass} = state.adminClassesReducer;
    return {classes, selectedClass, waitFlagClass, yearStructure};
};

const mapDispatchToProps = (dispatch) => ({
    fetchClasses: () => {dispatch(fetchClasses())},
    createNewClass: (newClass) => {dispatch(createNewClass(newClass))},
    deleteClass: (classID) => {dispatch(deleteClass(classID))},
    getYearStructure:() => {dispatch(getYearStructure())},
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminClasses);
