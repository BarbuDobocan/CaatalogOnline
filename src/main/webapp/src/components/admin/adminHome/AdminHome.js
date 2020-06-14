import React from 'react';
import {
    startNewYear,
    startSemI,
    stopSemI,
    startSemII,
    stopSemII,
    finishTheYear,
    getYearStructure
} from "../../../redux/actions/yearStuctureAction"
import {connect} from "react-redux";
import AdminStepper from "./AdminStepper";
import NewYearIsStartingModal from "./NewYearIsStratingModal";
class AdminHome extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            yearStep: 0,
            newYearModal: false
        }
    }

    showNewYearModal = () => {
      this.setState({newYearModal: true})
    };

    hideNewYearModal = () => {
      this.setState({newYearModal: false})
    };

    startYear = () => {
        this.props.startNewYear();
        this.hideNewYearModal();
    };

    componentDidMount() {
        this.props.getYearStructure();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.yearStructure && this.props.yearStructure.nrStep !== this.state.yearStep){
           // debugger;
            this.setState({yearStep: this.props.yearStructure.nrStep})
        }
    }

    getSteps = () => {
        return ([
            "Inceputul Anului Scolar",
            "Inceputul Semestrului I",
            "Sfarsitul Semestrului I",
            "Inceputul Semestrului II",
            "Sfarsitul Semestrului II",
            "Sfarsitul Anului Scolar"
        ]);
    };

    render() {
       // debugger;
        return (
            <div>
                <NewYearIsStartingModal
                    newYearModal = {this.state.newYearModal}

                    hideNewYearModal = {this.hideNewYearModal}
                    startNewYear = {this.startYear}
                    />

              <AdminStepper
                  yearStep={this.state.yearStep}
                  getSteps={this.getSteps}
                  //startNewYear={this.props.startNewYear}
                  startNewYear={this.showNewYearModal}
                  startSemI={this.props.startSemI}
                  stopSemI={this.props.stopSemI}
                  startSemII={this.props.startSemII}
                  stopSemII={this.props.stopSemII}
                  finishTheYear={this.props.finishTheYear}
              />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {yearStructure} = state.yearStructureReducer;
    return {yearStructure};
};

const mapDispatchToProps = (dispatch) => ({
    getYearStructure:() => {dispatch(getYearStructure())},
    startNewYear:() => {dispatch(startNewYear())},
    startSemI:() => {dispatch(startSemI())},
    stopSemI:() => {dispatch(stopSemI())},
    startSemII:() => {dispatch(startSemII())},
    stopSemII:() => {dispatch(stopSemII())},
    finishTheYear:() => {dispatch(finishTheYear())}
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
