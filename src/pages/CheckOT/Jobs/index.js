import {
    Drawer,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    withStyles,
    Chip,
    Card,
    CardContent,
    Paper,
    Button,
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
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MaterialTable from "material-table";
import React, { forwardRef } from 'react';
// Local
import { drawerWidth } from '../../../config';

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
    }

    state = {
        drawerOpen: false,
        editMode: false,
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
        }
    }

    render() {
        const {
            classes,
            selectedCase
        } = this.props;

        return (
            <div style={{ paddingBottom: 32 }}>
                {this.getDrawer()}

                {
                    selectedCase.id !== -1 ?
                        <Grid container>
                            <Grid item md={1} style={{ textAlign: 'center', marginTop: window.innerHeight / 5 }}>
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
                onClose={
                    () => this.setState({
                        drawerOpen: false,
                        editMode: false,
                        newJob: {
                            category: 'IMSI',
                            eventStartDate: '',
                            eventEndDate: '',
                        }
                    })
                }
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
                        <MenuItem value={'Cell Site'}>Cell Site</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    style={{ marginTop: 16 }}
                    label="Query Start Date"
                    type="date"
                    value={this.state.newJob.eventStartDate}
                    onChange={event => this.setState({ newJob: { ...this.state.newJob, eventStartDate: event.target.value } })}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    style={{ marginTop: 16 }}
                    label="Query End Date"
                    type="date"
                    value={this.state.newJob.eventEndDate}
                    onChange={event => this.setState({ newJob: { ...this.state.newJob, eventEndDate: event.target.value } })}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 32 }}
                    startIcon={<Add />}
                >
                    Create
                </Button>
            </Drawer>
        );
    }

    getJobsTableComponent() {
        const {
            classes,
            selectedJob,
            onRowSelect,
        } = this.props;

        return (
            <MaterialTable
                icons={tableIcons}
                style={{ marginTop: 32, marginRight: 16 }}
                components={{
                    Container: props => <Paper {...props} elevation={4} />
                }}
                options={{
                    grouping: true,
                    exportButton: true,
                    actionsColumnIndex: -1,
                    paging: false,
                    rowStyle: rowData => ({
                        backgroundColor: (selectedJob.id === rowData.id) ? '#EEE' : '#FFF'
                    })
                }}
                columns={[
                    { title: "ID", field: "id", type: "numeric", align: "left", width: 16 },
                    { title: "Category", field: "category" },
                    {
                        title: "Status",
                        field: "status",
                        render: rowData =>
                            <span style={{ color: rowData.status === 'Pending' ? 'green' : 'red' }}>
                                {rowData.status}
                            </span>
                    },
                    { title: "Query Start Date", field: "eventStartDate", align: "center" },
                    { title: "Query End Date", field: "eventEndDate", align: "center" }
                ]}
                data={this.state.selectedCaseJobsList}
                title='Jobs List'
                actions={[
                    {
                        icon: () => <Delete color='error' />,
                        tooltip: 'Delete Job',
                        onClick: (event, rowData) => {
                            // Do Delete operation
                        },
                    }
                ]}
                onRowClick={onRowSelect}
            />
        );
    }
};

export default withStyles(styles)(Jobs);