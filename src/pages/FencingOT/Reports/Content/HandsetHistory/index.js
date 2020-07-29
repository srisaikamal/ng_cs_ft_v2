import {
    Paper,
    Typography,
    withStyles
} from '@material-ui/core';
import {
    Fastfood,
    Hotel,
    LaptopMac,
    Repeat
} from '@material-ui/icons';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@material-ui/lab';
import React from 'react';
// Local

const styles = theme => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
});

class HandsetHistory extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <div>
                <Typography variant="h5" component="h5">
                    <b>Handset History</b>
                </Typography>


                <Timeline align="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body1" color="textSecondary">
                                <br />
                                <b>July 1, 2020</b>
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <Fastfood />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography>
                                    <b>IMEI: </b>8976573429
                                    <br />
                                    <b>Geohash: </b>ASDC45Q
                                    <br />
                                    <b>Location: </b>78.56, 998.66
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body1" color="textSecondary">
                                <br />
                                <b>July 5, 2020</b>
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <LaptopMac />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography>
                                    <b>IMEI: </b>9974518421
                                    <br />
                                    <b>Geohash: </b>ASDC45W
                                    <br />
                                    <b>Location: </b>78.56, 998.66
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body1" color="textSecondary">
                                <br />
                                <b>July 10, 2020</b>
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                <Hotel />
                            </TimelineDot>
                            <TimelineConnector className={classes.secondaryTail} />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography>
                                    <b>IMEI: </b>66671568421
                                    <br />
                                    <b>Geohash: </b>ASDC45W
                                    <br />
                                    <b>Location: </b>78.56, 998.66
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body1" color="textSecondary">
                                <br />
                                <b>July 22, 2020</b>
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <Repeat />
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography>
                                    <b>IMEI: </b>66671568421
                                    <br />
                                    <b>Geohash: </b>ASDC45W
                                    <br />
                                    <b>Location: </b>78.56, 998.66
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }
}

export default withStyles(styles)(HandsetHistory);
