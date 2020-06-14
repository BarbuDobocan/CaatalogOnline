import React from "react";
import {fetchProfessorsCourses} from "../../../redux/actions/professorCourses";
import {connect} from "react-redux";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./ProfessorCourses.scss";

const { SearchBar } = Search;
class ProfessorCourses extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.fetchProfessorsCourses();
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
                text: this.textCanBeSorted('Numele Cursului'),
                dataField: 'coursName',
                sort: true
            }
        ];

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(e.target.value, row, rowIndex)
            }
        };

        return (
            <div className={"professor-courses-main-row"}>
                <h4>Cursurile mele</h4>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {courses} = state.adminCoursReducer;
    return {courses};
};

const mapDispatchToProps = (dispatch) => ({
    fetchProfessorsCourses:() => {dispatch(fetchProfessorsCourses())}
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorCourses);
