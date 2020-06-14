import React from 'react';
import {connect} from "react-redux";
import BasicStepper from "../basicStepper/BasicStepper";
import {getYearStructure} from "../../redux/actions/yearStuctureAction";



class Parent extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        this.props.getYearStructure();
    }

    render()
    {
        return(
          <BasicStepper
              yearStructure = {this.props.yearStructure && this.props.yearStructure.nrStep}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Parent);
