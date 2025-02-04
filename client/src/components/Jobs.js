import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Job from "./Job";

const useStyles = makeStyles({
    root: { width: '60%', padding: 0 }
});

export default function Jobs({ jobs }) {
    const classes = useStyles();
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);

    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 25);

    const jobsOnPage = jobs.slice(activeStep * 25, activeStep * 25 + 25);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div className="jobs">
            <header className="head">
                <div className="header-content">
                    <Typography variant="h3" component="h1">
                        Entry Level Software Jobs
                    </Typography>
                    <br />
                    <Typography variant="h5" component="h1">
                        Found a total of {numJobs} jobs
                    </Typography>
                </div>
            </header>

            <div className="content">
                <div className="job-list">
                    {jobsOnPage.map(job => (
                        <Job key={job.id} job={job} />
                    ))}
                </div>

                <div>
                    <Typography variant="h6">
                        Page {activeStep + 1} of {numPages}
                    </Typography>
                </div>

                <MobileStepper
                    variant="dots"
                    steps={numPages}
                    position="static"
                    activeStep={activeStep}
                    className={classes.root}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === numPages - 1}
                        >
                            Next
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </div>
        </div>
    );
}
