import React from "react";
import {fetchProfessorsClasses, fetchDataForFinalGrade} from "../../../redux/actions/professorClasses";
import {connect} from "react-redux";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Button} from "react-bootstrap";
import "./ProfessorClasses.scss";

const { SearchBar } = Search;
let selectedClass;
class ProfessorClasses extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.fetchProfessorsClasses();
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
        let classes = [];
        if(this.props.classes){
            classes = [...this.props.classes];
        }

        const expandRow = {
            renderer: row => (
                <Button
                 onClick={()=>{
                this.props.history.push({
                    pathname: '/professorSelectedClass',
                    state:{ row }
                })}}
                >Studentii Clasei</Button>
            ),
            onlyOneExpanding: true
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(row);
                selectedClass = row.id;
            }
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
        return (
            <div className={"professor-classes-main"}>
                <h4>Clasele mele</h4>
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
                                    pagination = { paginationFactory() }
                                    rowEvents = { rowEvents }
                                    expandRow = {expandRow}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {classes, selectedClass, waitFlagClass} = state.adminClassesReducer;
    return {classes, selectedClass, waitFlagClass};
};

const mapDispatchToProps = (dispatch) => ({
    fetchProfessorsClasses:() => {dispatch(fetchProfessorsClasses())},
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorClasses);
