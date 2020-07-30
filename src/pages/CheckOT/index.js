import { Tab, Tabs, withStyles } from '@material-ui/core';
import { ExitToApp, Home } from '@material-ui/icons';
import React from 'react';
// Local
import CustomAppBar from '../../components/CustomAppBar';
import Jobs from './Jobs';
import Reports from './Reports';

const styles = (theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    },
    tabs: {
        backgroundColor: theme.palette.primary.main,
    },
});

class CheckOT extends React.Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    state = {
        activeTab: 'Jobs',
        selectedCase: {
            id: 0,
            name: 'Default',
            description: 'Default Case for all Check OT jobs',
            category: 'Other',
            status: 'Open',
            users: [],
        },
        selectedJob: {
            id: -1,
            case: 0,
            serverJobId: -1,
            status: '',
            category: '',
            eventStartDate: '',
            eventEndDate: '',
        }
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                {
                    this.getContent()
                }
            </div>
        );
    }

    getHeader() {
        const {
            classes
        } = this.props;

        return (
            <div>
                <CustomAppBar
                    title='Check OT'
                    leadingIcon={<Home />}
                    onLeadingIconPress={() => window.location = '/landing'}
                    trailingIcon={<ExitToApp />}
                    onTrailingIconPress={() => window.location = '/'}
                />
                <Tabs
                    className={classes.tabs}
                    variant='fullWidth'
                    centered
                    value={this.state.activeTab}
                    onChange={(event, newVal) => this.setState({ activeTab: newVal })}
                >
                    <Tab label={<b style={{ color: 'white' }}>Jobs</b>} value='Jobs' />
                    <Tab label={<b style={{ color: 'white' }}>Reports</b>} value='Reports' />
                </Tabs>
            </div>
        );
    }

    getContent() {
        switch (this.state.activeTab) {
            case 'Jobs':
                return <Jobs
                    selectedJob={this.state.selectedJob}
                    onRowSelect={(event, selectedRow) => this.setState({ selectedJob: selectedRow })}
                />;
            default:
                return <Reports />;
        }
    }
};

export default withStyles(styles)(CheckOT);
