import React from "react";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles({
    rootMuiExpansionPanel: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        minWidth: 300,
        "&:not(:last-child)": {
            borderBottom: 0
        },
        "&:before": {
            display: "none"
        },
        "&$expanded": {
            margin: "auto"
        }
    },
    rootExpansionPanelSummary: {
        backgroundColor: "rgba(0, 0, 0, .03)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56
        }
    },
    rootExpansionPanelDetails: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        "&$expanded": {
            margin: "12px 0"
        }
    },
    expanded: {},
    expandedSummary: {}
});

export default function Job({ job }) {
    const [expanded, setExpanded] = React.useState("");
    const preventDefault = event => event.preventDefault();

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const classes = useStyles();
    const panel = "panel" + job.id;

    return (
        <div className="job" id={job.id}>
            <MuiExpansionPanel
                className={`${classes.rootMuiExpansionPanel} ${classes.expanded}`}
                square={false}
                expanded={expanded === panel}
                onChange={handleChange(panel)}
            >
                <MuiExpansionPanelSummary
                    className={`${classes.rootExpansionPanelSummary} ${classes.expandedSummary} summary-panel`}
                >
                    <div className="test">
                        <div>
                            <Typography variant="h5">{job.title}</Typography>
                            <Typography variant="h6">
                                {job.company} - {job.location}
                            </Typography>
                            <Typography>
                                {job.created_at
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                            </Typography>
                        </div>
                    </div>
                </MuiExpansionPanelSummary>
                <MuiExpansionPanelDetails
                    className={classes.rootExpansionPanelDetails}
                >
                    <img
                        className="company-logo"
                        src={job.company_logo}
                        alt={`Picture of ${job.company}'s logo`}
                    />

                    <div
                        className="description"
                        dangerouslySetInnerHTML={{
                            __html: job.description + " " + job.how_to_apply
                        }}
                    />
                    <div className="links">
                        <a href={`#${job.id}`}>
                            <Button onClick={handleChange(panel)}>Close</Button>
                        </a>

                        <Typography className={classes.root}>
                            <Link target="_blank" href={job.url}>
                                <Button variant="contained" color="primary">
                                    Apply
                                </Button>
                            </Link>
                        </Typography>
                    </div>
                </MuiExpansionPanelDetails>
            </MuiExpansionPanel>
        </div>
    );
}
