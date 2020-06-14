import React from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

function getSteps(){
    return ([
        "Inceputul Anului Scolar",
        "Inceputul Semestrului I",
        "Sfarsitul Semestrului I",
        "Inceputul Semestrului II",
        "Sfarsitul Semestrului II",
        "Sfarsitul Anului Scolar"
    ]);
};

function BasicStepper(props){
        const classes = useStyles();
        let steps = getSteps();
        return(
            <div className={classes.root}>
                <Stepper activeStep={props.yearStructure}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>
                                    {label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        )
}

export default BasicStepper;
