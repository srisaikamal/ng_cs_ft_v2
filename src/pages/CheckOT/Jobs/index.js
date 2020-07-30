import {
    Button, Card,
    CardContent, Chip, Drawer,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper, Select,
    TextField,
    Typography,
    withStyles
} from '@material-ui/core';
import {
    Add,
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    Delete,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import MaterialTable from "material-table";
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import React, { forwardRef } from 'react';
// Local
import { drawerWidth, apiHost } from '../../../config';

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
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: theme.spacing(4),
    },
});


class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.getDrawer = this.getDrawer.bind(this);
        this.getJobsTableComponent = this.getJobsTableComponent.bind(this);
        this.getDefaultCase = this.getDefaultCase.bind(this);
        this.resetToDefault = this.resetToDefault.bind(this);
        this.getAllAccounts = this.getAllAccounts.bind(this);
        this.fetchJobsForCase = this.fetchJobsForCase.bind(this);
        this.onCreateJobButtonPress = this.onCreateJobButtonPress.bind(this);
        this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
    }

    state = {
        drawerOpen: false,
        selectedCase: null,
        accountIdNameLookupMap: {},
        selectedCaseJobsList: [],
        newJob: {
            id: -1,
            case: -1,
            category: 'IMSI',
            status: '',
            latitude: -1,
            longitude: -1,
            distance: -1,
            lac: -1,
            cellId: -1,
            startTime: new Date(),
            endTime: new Date(),
            query: '',
        }
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <div style={{ paddingBottom: 32 }}>
                {this.state.selectedCase && this.getDrawer()}

                {
                    this.state.selectedCase ?
                        <Grid container>
                            <Grid item md={1} style={{
                                textAlign: 'center',
                                marginTop: window.innerHeight / 5
                            }}>
                                <span
                                    style={{ fontSize: 42, }}
                                    onClick={
                                        () => this.setState({
                                            drawerOpen: true,
                                        })
                                    }
                                >
                                    C<br />
                                    R<br />
                                    E<br />
                                    A<br />
                                    T<br />
                                    E<br />
                                </span>
                            </Grid>

                            <Grid item md={11}>
                                {this.getJobsTableComponent()}
                            </Grid>
                        </Grid>
                        : <div />
                }

            </div>
        );
    }

    getDrawer() {
        const {
            classes
        } = this.props;

        return (
            <Drawer
                anchor={this.state.drawerPosition}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={this.state.drawerOpen}
                onClose={this.resetToDefault}
            >

                <Typography component='h5' variant='h5' style={{ marginBottom: 24 }}>
                    Create Job
                </Typography>

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        value={this.state.newJob.category}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, category: event.target.value } })}
                    >
                        <MenuItem value={'IMSI'}>IMSI</MenuItem>
                        <MenuItem value={'IMEI'}>IMEI</MenuItem>
                        <MenuItem value={'MSISDN'}>MSISDN</MenuItem>
                        <MenuItem value={'Location'}>Location</MenuItem>
                        <MenuItem value={'LAC/Cell-ID'} >LAC/Cell-ID</MenuItem>
                    </Select>
                </FormControl>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        style={{ marginTop: 16 }}
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        format="DD/MM/yyyy"
                        openTo="year"
                        label="Query Start Date"
                        value={this.state.newJob.startTime}
                        onChange={newDate => this.setState({ newJob: { ...this.state.newJob, startTime: newDate } })}
                    />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        style={{ marginTop: 16 }}
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        openTo="year"
                        format="DD/MM/yyyy"
                        label="Query End Date"
                        value={this.state.newJob.endTime}
                        onChange={newDate => this.setState({ newJob: { ...this.state.newJob, endTime: newDate } })}
                    />
                </MuiPickersUtilsProvider>


                {
                    this.state.newJob.category === 'Location' &&
                    <TextField
                        style={{ marginTop: 16 }}
                        label="Query Location (Latitude)"
                        type="number"
                        value={this.state.newJob.latitude === -1 ? '' : this.state.newJob.latitude}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, latitude: event.target.value } })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }

                {
                    this.state.newJob.category === 'Location' &&
                    <TextField
                        style={{ marginTop: 16 }}
                        label="Query Location (Longitude)"
                        type="number"
                        value={this.state.newJob.longitude === -1 ? '' : this.state.newJob.longitude}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, longitude: event.target.value } })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }

                {
                    this.state.newJob.category === 'LAC/Cell-ID' &&
                    <TextField
                        style={{ marginTop: 16 }}
                        label="Query LAC"
                        type="number"
                        value={this.state.newJob.lac === -1 ? '' : this.state.newJob.lac}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, lac: event.target.value } })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }

                {
                    this.state.newJob.category === 'LAC/Cell-ID' &&
                    <TextField
                        style={{ marginTop: 16 }}
                        label="Query Cell-ID"
                        type="number"
                        value={this.state.newJob.cellId === -1 ? '' : this.state.newJob.cellId}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, cellId: event.target.value } })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }

                {
                    (this.state.newJob.category === 'Location' || this.state.newJob.category === 'LAC/Cell-ID') &&
                    <TextField
                        style={{ marginTop: 16 }}
                        label="Query Distance"
                        type="number"
                        value={this.state.newJob.distance === -1 ? '' : this.state.newJob.distance}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, distance: event.target.value } })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }

                {
                    (this.state.newJob.category === 'IMSI' || this.state.newJob.category === 'IMEI' || this.state.newJob.category === 'MSISDN') &&
                    <TextField
                        style={{ marginTop: 16 }}
                        label="Query"
                        value={this.state.newJob.query}
                        onChange={event => this.setState({ newJob: { ...this.state.newJob, query: event.target.value } })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                }

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 32 }}
                    startIcon={<Add />}
                    onClick={this.onCreateJobButtonPress}
                >
                    Create
                </Button>
            </Drawer>
        );
    }

    getJobsTableComponent() {
        const {
            classes,
            onRowSelect,
            selectedJob,
        } = this.props;

        return (
            <MaterialTable
                icons={tableIcons}
                style={{ marginTop: 32, marginRight: 16 }}
                components={{
                    Container: props => <Paper {...props} elevation={4} />
                }}
                options={{
                    grouping: false,
                    exportButton: true,
                    paging: true,
                    actionsColumnIndex: -1,
                }}
                columns={[
                    { title: "ID", field: "id", type: "numeric", align: "left", width: 16 },
                    { title: "Category", field: "category" },
                    {
                        title: "Query",
                        field: "query",
                        render: rowData => {
                            let jobCategory = rowData['category'];
                            let resultantHtmlElement = null;
                            if (jobCategory === 'Location') {
                                let queryArr = rowData['query'].split(',');
                                resultantHtmlElement = <span>
                                    <b>Latitude: </b>{queryArr[0]}<br />
                                    <b>Longitude: </b>{queryArr[1]}<br />
                                    <b>Distance: </b>{queryArr[2]}<br />
                                </span>;
                            }
                            else if (jobCategory === 'LAC/Cell-ID') {
                                let queryArr = rowData['query'].split(',');
                                resultantHtmlElement = <span>
                                    <b>LAC: </b>{queryArr[0]}<br />
                                    <b>Cell-ID: </b>{queryArr[1]}<br />
                                    <b>Distance: </b>{queryArr[2]}<br />
                                </span>;
                            }
                            else resultantHtmlElement = rowData['query'];
                            return resultantHtmlElement;
                        }
                    },
                    {
                        title: "Status",
                        field: "status",
                        render: rowData =>
                            <span style={{ color: rowData.status === 'PENDING' ? 'red' : 'green' }}>
                                {rowData.status}
                            </span>
                    },
                    {
                        title: "Start Time",
                        field: "startTime",
                        align: "center",
                        render: rowData => moment(rowData['startTime']).format('L'),
                    },
                    {
                        title: "End Time",
                        field: "endTime",
                        align: "center",
                        render: rowData => moment(rowData['endTime']).format('L'),
                    },
                ]}
                data={this.state.selectedCaseJobsList}
                title='Jobs List'
                actions={[
                    {
                        icon: () => <Delete color='error' />,
                        tooltip: 'Delete Job',
                        onClick: (event, rowData) => {
                            // Do Delete operation
                            this.onDeleteButtonPress(rowData);
                        },
                    }
                ]}
            />
        );
    }

    componentDidMount() {
        this.getAllAccounts();
        this.getDefaultCase();
    }

    resetToDefault() {
        this.setState({
            drawerOpen: false,
            editMode: false,
            newJob: {
                id: -1,
                case: -1,
                category: 'IMSI',
                status: '',
                latitude: -1,
                longitude: -1,
                distance: -1,
                lac: -1,
                cellId: -1,
                startTime: new Date(),
                endTime: new Date(),
                query: '',
            }
        });
    }


    async getAllAccounts() {
        try {
            const apiEndpoint = apiHost + '/accounts/';
            let response = await axios.get(apiEndpoint);
            response = response.data;

            let accountIdNameLookupMap = {};

            response.forEach(account => {
                let accountId = account['id'];
                let accountName = account['name'];
                accountIdNameLookupMap[accountId] = accountName;
            });


            this.setState({
                accountIdNameLookupMap: accountIdNameLookupMap,
            });
        } catch (error) {
            console.log(error);
        }
    }


    async getDefaultCase() {
        try {
            const apiEndpoint = apiHost + '/cases/';
            let response = await axios.get(apiEndpoint);
            response = response.data;
            response.every((caseItem, index) => {
                let caseName = caseItem['name'];
                if (caseName === 'DEFAULT_CASE_CHECK_OT') {
                    this.setState({ selectedCase: caseItem });
                    this.fetchJobsForCase(caseItem);
                    return false;
                }
                return true;
            });
        } catch (error) {
            console.log(error);
        }
    }

    async fetchJobsForCase(selectedCase) {
        try {
            this.setState({ selectedCase: selectedCase });
            const apiEndpoint = apiHost + '/jobs/?case=' + selectedCase.id;
            let response = await axios.get(apiEndpoint);
            response = response.data;
            this.setState({ selectedCaseJobsList: response });
        } catch (error) {
            console.log(error);
        }
    }

    async onCreateJobButtonPress() {
        try {
            const apiEndpoint = apiHost + '/jobs/';
            let payload = this.state.newJob;
            if (payload.category === 'Location') {
                payload['query'] = payload['latitude'] + ',' + payload['longitude'] + ',' + payload['distance'];
                delete payload['latitude'];
                delete payload['longitude'];
                delete payload['distance'];
            }
            else if (payload.category === 'LAC/Cell-ID') {
                payload['query'] = payload['lac'] + ',' + payload['cellId'] + ',' + payload['distance'];
                delete payload['lac'];
                delete payload['cellId'];
                delete payload['distance'];
            }
            payload['status'] = 'PENDING';
            payload['startTime'] = payload['startTime'].valueOf();
            payload['endTime'] = payload['endTime'].valueOf();
            payload['case'] = this.state.selectedCase['id'];

            let response = await axios.post(apiEndpoint, payload);
            response = response.data;
            this.resetToDefault();
            this.fetchJobsForCase(this.state.selectedCase);
        } catch (error) {
            console.log(error);
        }
    }

    async onDeleteButtonPress(rowData) {
        try {
            const apiEndpoint = apiHost + '/jobs/' + rowData.id + '/';
            let response = await axios.delete(apiEndpoint);
            response = response.data;
            this.resetToDefault();
            this.fetchJobsForCase(this.state.selectedCase);
        } catch (error) {
            console.log(error);
        }
    }
};

export default withStyles(styles)(Jobs);
