import {
    withStyles,
    Slide,
    Paper,
    Grid,
    Card,
    CardContent,
    IconButton,
    Typography,
} from '@material-ui/core';
import {
    TableChart,
    Timeline,
    People,
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
    Delete,
    Map,
} from '@material-ui/icons';
import React, { forwardRef } from 'react';
import MaterialTable from "material-table";
// Local
import sampleData from './sampledata.json';
import { drawerWidth } from '../../../config';

import DataMapContent from './Content/DataMap';
import DataTableContent from './Content/DataTable';
import HandsetHistoryContent from './Content/HandsetHistory';
import LinkTreeContent from './Content/LinkTree';

import DataMapQuery from './Query/DataMap';
import DataTableQuery from './Query/DataTable';
import HandsetHistoryQuery from './Query/HandsetHistory';
import LinkTreeQuery from './Query/LinkTree';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const styles = (theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    },
    drawer: {
    },
    widgetListItem: {
        marginRight: 20
    }
});


class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.getMainContent = this.getMainContent.bind(this);
        this.getLeftDrawer = this.getLeftDrawer.bind(this);
        this.getRightDrawer = this.getRightDrawer.bind(this);
        this.getJobsTableComponent = this.getJobsTableComponent.bind(this);
        this.getWidgetsListComponent = this.getWidgetsListComponent.bind(this);
    }

    state = {
        leftDrawerOpen: true,
        rightDrawerOpen: true,
        activeWidget: 'Handset',
        selectedCaseJobsList: [
            {
                id: 1,
                case: 1,
                serverJobId: -1,
                status: 'Pending',
                category: 'IMSI',
                eventStartDate: 'July 1, 2020',
                eventEndDate: 'July 3, 2020',
            },
            {
                id: 2,
                case: 1,
                serverJobId: -1,
                status: 'Completed',
                category: 'MSISDN',
                eventStartDate: 'Feb 1, 2020',
                eventEndDate: 'Mar 3, 2020',
            },
            {
                id: 3,
                case: 1,
                serverJobId: -1,
                status: 'Pending',
                category: 'Cell Site',
                eventStartDate: 'Jan 1, 2020',
                eventEndDate: 'June 3, 2020',
            },
            {
                id: 4,
                case: 1,
                serverJobId: -1,
                status: 'Completed',
                category: 'IMEI',
                eventStartDate: 'Apr 1, 2020',
                eventEndDate: 'May 3, 2020',
            },
            {
                id: 5,
                case: 1,
                serverJobId: -1,
                status: 'Pending',
                category: 'IMSI',
                eventStartDate: 'Jan 1, 2020',
                eventEndDate: 'Jun 3, 2020',
            }
        ],
        newJob: {
            category: 'IMSI',
            eventStartDate: '',
            eventEndDate: '',
        },
        dataTableSelectedColumns: Object.keys(sampleData['results'][0]).slice(0, 5),
    }

    render() {
        const {
            classes
        } = this.props;

        let leftDrawerSize = this.state.leftDrawerOpen ? 3 : 1;
        let rightDrawerSize = this.state.rightDrawerOpen ? 3 : 1;
        let mainContentSize = 12 - (leftDrawerSize + rightDrawerSize);

        return (
            <div>
                <Grid container>
                    <Grid item md={leftDrawerSize}>
                        {this.getLeftDrawer()}
                    </Grid>
                    <Grid item md={mainContentSize} style={{ padding: 16 }}>
                        {this.getMainContent()}
                    </Grid>
                    <Grid item md={rightDrawerSize}>
                        {this.getRightDrawer()}
                    </Grid>
                </Grid>
            </div >
        );
    }

    getMainContent() {
        switch (this.state.activeWidget) {
            case 'Handset':
                return <HandsetHistoryContent />;
            case 'Map':
                return <DataMapContent />;
            case 'Linktree':
                return <LinkTreeContent />;
            default:
                return <DataTableContent
                    tableData={sampleData['results']}
                    selectedColumns={this.state.dataTableSelectedColumns}
                />;
        }
    }

    getLeftDrawer() {
        const {
            classes,
        } = this.props;

        let leftDrawerOpen = this.state.leftDrawerOpen;

        return (
            <div>
                <Paper
                    className={classes.drawer}
                    elevation={4}
                >
                    <div style={{ textAlign: 'right' }}>
                        <IconButton
                            onClick={() => this.setState({ leftDrawerOpen: !leftDrawerOpen })}
                        >
                            {leftDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div>

                    {
                        leftDrawerOpen ?
                            <div style={{ padding: 16 }}>
                                <Typography component='h5' variant='h5' style={{ marginBottom: 32 }}>
                                    <b>Jobs</b>
                                </Typography>

                                {this.getJobsTableComponent()}

                            </div>
                            : <div />
                    }

                    {
                        leftDrawerOpen ?
                            <div />
                            :
                            <div style={{
                                textAlign: 'center',
                                marginTop: window.innerHeight / 5,
                                paddingBottom: window.innerHeight / 3.2
                            }}>
                                <span
                                    style={{ fontSize: 42, textAlign: 'center' }}
                                >
                                    J<br />
                                    O<br />
                                    B<br />
                                    S<br />
                                </span>
                            </div>
                    }

                </Paper>
            </div>
        );
    }

    getJobsTableComponent() {
        const {
            classes
        } = this.props;

        return (
            <MaterialTable
                icons={tableIcons}
                style={{ marginTop: 32, marginRight: 16 }}
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                options={{
                    actionsColumnIndex: -1,
                    paging: false,
                }}
                columns={[
                    // { title: "ID", field: "id", type: "numeric", align: "left", width: 16 },
                    { title: "Category", field: "category" },
                    {
                        title: "Status",
                        field: "status",
                        render: rowData =>
                            <span style={{ color: rowData.status === 'Pending' ? 'green' : 'red' }}>
                                {rowData.status}
                            </span>
                    },
                    // { title: "Query Start Date", field: "eventStartDate", align: "center" },
                    // { title: "Query End Date", field: "eventEndDate", align: "center" }
                ]}
                data={this.state.selectedCaseJobsList}
                title=''
                actions={[
                    {
                        icon: () => <Delete color='error' />,
                        tooltip: 'Delete Job',
                        onClick: (event, rowData) => {
                            // Do Delete operation
                        },
                    },
                    {
                        icon: () => <AddBox color='action' />,
                        tooltip: 'Add Job',
                        isFreeAction: true,
                        onClick: (event, rowData) => {
                            // Do Delete operation
                        },
                    }
                ]}
            />
        );
    }

    getRightDrawer() {
        const {
            classes,
        } = this.props;

        let rightDrawerOpen = this.state.rightDrawerOpen;

        return (
            <div>
                <Paper
                    className={classes.drawer}
                    elevation={4}
                >
                    <div style={{ textAlign: 'left' }}>
                        <IconButton
                            onClick={() => this.setState({ rightDrawerOpen: !rightDrawerOpen })}
                        >
                            {rightDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
                        </IconButton>
                    </div>

                    {
                        rightDrawerOpen ?
                            <div style={{ padding: 16 }}>
                                <Typography component='h5' variant='h5' style={{ marginBottom: 32 }}>
                                    <b>Query</b>
                                </Typography>

                                {
                                    this.state.activeWidget === 'Handset' ?
                                        <HandsetHistoryQuery />
                                        : <div />
                                }

                                {
                                    this.state.activeWidget === 'Map' ? <div /> : <div />
                                }

                                {
                                    this.state.activeWidget === 'Linktree' ? <div /> : <div />
                                }

                                {
                                    this.state.activeWidget === 'Table' ?
                                        <DataTableQuery
                                            allColumns={Object.keys(sampleData['results'][0])}
                                            selectedColumns={this.state.dataTableSelectedColumns}
                                            onChange={(event, newVal) => this.setState({ dataTableSelectedColumns: newVal })}
                                        /> :
                                        <div />
                                }

                                <Typography component='h5' variant='h5' style={{ marginBottom: 24, marginTop: 32 }}>
                                    <b>Widgets</b>
                                </Typography>

                                {this.getWidgetsListComponent()}
                            </div>
                            : <div />
                    }

                    {
                        rightDrawerOpen ?
                            <div />
                            :
                            <div style={{
                                textAlign: 'center',
                                marginTop: window.innerHeight / 7,
                                paddingBottom: window.innerHeight / 5.8
                            }}>
                                <span
                                    style={{ fontSize: 42, textAlign: 'center' }}
                                >
                                    W<br />
                                    I<br />
                                    D<br />
                                    G<br />
                                    E<br />
                                    T<br />
                                    S<br />
                                </span>
                            </div>
                    }

                </Paper>
            </div>
        );
    }

    getWidgetsListComponent() {
        const {
            classes
        } = this.props;

        return (
            <Grid container spacing={4}>
                <Grid item md={2} className={classes.widgetListItem}>
                    <IconButton onClick={() => this.setState({ activeWidget: 'Handset' })}>
                        <Timeline />
                    </IconButton>
                    <br />
                    Handset History
                </Grid>

                <Grid item md={2} className={classes.widgetListItem}>
                    <IconButton onClick={() => this.setState({ activeWidget: 'Map' })}>
                        <Map />
                    </IconButton>
                    <br />
                    Map
                </Grid>

                <Grid item md={2} className={classes.widgetListItem}>
                    <IconButton onClick={() => this.setState({ activeWidget: 'Linktree' })}>
                        <People />
                    </IconButton>
                    <br />
                    Linktree
                </Grid>

                <Grid item md={2} className={classes.widgetListItem}>
                    <IconButton onClick={() => this.setState({ activeWidget: 'Table' })}>
                        <TableChart />
                    </IconButton>
                    <br />
                    Table
                </Grid>
            </Grid>
        );
    }
};

export default withStyles(styles)(Reports);
