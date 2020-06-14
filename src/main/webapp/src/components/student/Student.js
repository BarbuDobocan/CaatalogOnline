import React from 'react';
import { Button } from 'react-bootstrap';
import auth from "../../authentication/auth";
import "../../../logo.svg";
import {getYearStructure} from "../../redux/actions/yearStuctureAction";
import {connect} from "react-redux";
import BasicStepper from "../basicStepper/BasicStepper";
class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authUser: null,
        }
    }

    componentDidMount() {
        this.props.getYearStructure();
    }

    render()
    {
        return(
            <div>
                <BasicStepper
                    yearStructure = {this.props.yearStructure && this.props.yearStructure.nrStep}
                />
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    const {yearStructure} = state.yearStructureReducer;
    return {yearStructure};
};

const mapDispatchToProps = (dispatch) => ({
    getYearStructure:() => {dispatch(getYearStructure())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Student);
