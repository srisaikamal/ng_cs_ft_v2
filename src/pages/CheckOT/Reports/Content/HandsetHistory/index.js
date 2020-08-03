import { Paper, Typography, withStyles } from '@material-ui/core';
import { Fastfood, Hotel, LaptopMac, Repeat } from '@material-ui/icons';
/* import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab'; */
//import { DataSet, Timeline } from 'vis-timeline/standalone';
import Timeline from 'react-visjs-timeline';
import { DataSet } from 'vis-data/peer';
import moment from 'moment';

import React from 'react';
// Local

const styles = (theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
});
const basicExample = {
  options: {
    start: '2014-04-10',
    end: '2014-04-30',
  },
  items: [
    { id: 1, content: 'MSISDN', start: '2014-04-20' },
    { id: 2, content: 'Geohash', start: '2014-04-14' },
    { id: 3, content: 'Location', start: '2014-04-18' },

    { id: 4, content: 'IMEI', start: '2014-04-25' },
  ],
};

const groupsExample = {
  groups: [],
  items: [],
  options: {
    groupOrder: 'content', // groupOrder can be a property name or a sorting function
  },
};

const now = moment().minutes(0).seconds(0).milliseconds(0);
const groupCount = 1;
const itemCount = 4;
const itemNames = [
  'IMEI: 9974518421',
  'Geohash: ASDC45W',
  'Location: 78.56, 998.66',
];
// create a data set with groups
const names = ['MSISDN'];
for (let g = 0; g < groupCount; g++) {
  groupsExample.groups.push({ id: g, content: names[g] });
}

// create a dataset with items
for (let i = 0; i < itemCount; i++) {
  const start = now.clone().add(Math.random() * 200, 'hours');
  const group = Math.floor(Math.random() * groupCount);
  groupsExample.items.push({
    id: i,
    group: group,
    content: itemNames[i],

    start: start,
    type: 'box',
  });
}

class HandsetHistory extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedIds: [],
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant='h5' component='h5'>
          <b>Handset History</b>
        </Typography>
        <Timeline
          {...groupsExample}
          clickHandler={this.clickHandler.bind(this)}
          selection={this.state.selectedIds}
        />
        {/* <Timeline align="alternate">
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
        </Timeline> */}
      </div>
    );
  }
  clickHandler(props) {
    const { group } = props;
    const selectedIds = groupsExample.items
      .filter((item) => item.group === group)
      .map((item) => item.id);
    this.setState({
      selectedIds,
    });
  }
}

export default withStyles(styles)(HandsetHistory);
