import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function AdminStepper(props) {
    const classes = useStyles();
    const steps = props.getSteps();

    const handleNext = () => {
        debugger;
        props.yearStep === 0 && props.startSemI();
        props.yearStep === 1 && props.stopSemI();
        props.yearStep === 2 && props.startSemII();
        props.yearStep === 3 && props.stopSemII();
        props.yearStep === 4 && props.finishTheYear();
    };

    const handleReset = () => {
        props.yearStep === 5 && props.startNewYear();
    };

    //debugger;
    return (
        <div className={classes.root}>
            <Stepper activeStep={props.yearStep}>
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
            <div>
                {props.yearStep === steps.length - 1  ? (
                    <div>
                        {/*<Typography className={classes.instructions}>*/}
                        {/*    All steps completed - you&apos;re finished*/}
                        {/*</Typography>*/}
                        <Button onClick={handleReset} className={classes.button}>
                            {"Incepeti an nou"}
                        </Button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {"Urmatorul Pas"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
