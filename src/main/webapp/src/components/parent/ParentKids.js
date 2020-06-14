import React from 'react';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Button, Col} from "react-bootstrap";
import {findMyKids} from "./../../redux/actions/parent";
import {connect} from "react-redux";
import "./ParentKids.scss";

class ParentKids extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.findMyKids();
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
                sort: true,
            },
            {
                text: this.textCanBeSorted("Email"),
                dataField: 'email',
                sort: true,
            },
            {
                text: this.textCanBeSorted('Numar matricol'),
                dataField: 'registrationNumber',
                sort: true,
            }
        ];
        const expandRow = {
            renderer: row => (
                <Button
                    onClick={()=>{
                        this.props.history.push({
                            pathname: '/parentUserProfile',
                            state: row
                        })}}
                >Vezi Profilul</Button>
            )
        };
        return(
            <div className={"parent-kids-main-row"}>
            <ToolkitProvider
                keyField="id"
                data={ this.props.myKids }//copii parintelui
                columns={ columnss }
            >
                {
                    proprieties => (
                        <div>
                            <BootstrapTable
                                { ...proprieties.baseProps }
                                pagination={ paginationFactory() }
                                expandRow={ expandRow }
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {myKids} = state.parentReducer;
    return {myKids};
};

const mapDispatchToProps = (dispatch) => ({
    findMyKids: () => {dispatch(findMyKids())}
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentKids);
