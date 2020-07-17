import {
    Button, Chip,
    Drawer,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    withStyles,
    Paper,
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


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.getDrawer = this.getDrawer.bind(this);
    }

    state = {
        drawerOpen: false,
        editMode: false,
        editableItem: {
            name: '',
            designation: '',
            cases: [],
            department: '',
        },
        tableData: [
            {
                name: 'Darshan',
                designation: 'Analyst',
                cases: ['Bomb blast at market', 'Case 2', 'Case 3'],
                department: 'Dept A',
            },
            {
                name: 'Abhishek',
                designation: 'Supervisor',
                cases: ['Bomb blast at market', 'Case 2'],
                department: 'Dept C',
            },
            {
                name: 'Boopathi',
                designation: 'Analyst',
                cases: ['Case 2', 'Case 3'],
                department: 'Dept B',
            },
            {
                name: 'Srikanth',
                designation: 'Analyst',
                cases: ['Bomb blast at market', 'Case 3'],
                department: 'Dept A',
            },
        ]
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <div>
                {this.getDrawer()}
                <Grid container>
                    <Grid item md={1} style={{ textAlign: 'center', marginTop: window.innerHeight / 5 }}>
                        <span
                            style={{ fontSize: 42, }}
                            onClick={
                                () => this.setState({
                                    drawerOpen: true,
                                    editableItem: {
                                        name: '',
                                        designation: '',
                                        cases: [],
                                        department: '',
                                        modules: [],
                                    },
                                    editMode: false,
                                })}
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
                        <MaterialTable
                            icons={tableIcons}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />
                            }}
                            options={{
                                grouping: true,
                                exportButton: true,
                                actionsColumnIndex: -1,
                                paging: false,
                            }}
                            columns={[
                                { title: "Name", field: "name" },
                                { title: "Designation", field: "designation" },
                                {
                                    title: "Cases",
                                    field: "cases",
                                    grouping: false,
                                    render: rowData =>
                                        <div>
                                            {
                                                rowData.cases.map((caseName, index) =>
                                                    <Chip
                                                        key={index}
                                                        label={caseName}
                                                        className={classes.chip}
                                                    />
                                                )
                                            }
                                        </div>
                                },
                                { title: "Department", field: "department" },
                            ]}
                            data={this.state.tableData}
                            title='Users List'
                            actions={[
                                {
                                    icon: () => <Edit />,
                                    tooltip: 'Edit User',
                                    onClick: (event, rowData) => {
                                        // Do edit operation
                                        this.setState({ drawerOpen: true, editableItem: rowData, editMode: true });
                                    }
                                },
                                {
                                    icon: () => <Delete color='error' />,
                                    tooltip: 'Delete User',
                                    onClick: (event, rowData) => {
                                        // Do Delete operation
                                    },
                                }
                            ]}
                        />
                    </Grid>
                </Grid>
            </div >
        );
    }

    getDrawer() {
        const {
            classes
        } = this.props;

        return (
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={this.state.drawerOpen}
                onClose={
                    () => this.setState({
                        drawerOpen: false,
                        editMode: false,
                        editableItem: {
                            name: '',
                            designation: '',
                            cases: [],
                            department: '',
                            modules: [],
                        },
                    })
                }
            >
                <Typography component='h5' variant='h5' style={{ marginBottom: 24 }}>
                    {this.state.editMode ? 'Edit User' : 'Add User'}
                </Typography>

                <TextField
                    label='Name'
                    value={this.state.editableItem.name}
                    onChange={event => this.setState({ editableItem: { ...this.state.editableItem, name: event.target.value } })}
                />

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="designation-label">Designation</InputLabel>
                    <Select
                        labelId="designation-label"
                        value={this.state.editableItem.designation}
                        onChange={event => this.setState({ editableItem: { ...this.state.editableItem, designation: event.target.value } })}
                    >
                        <MenuItem value={'Analyst'}>Analyst</MenuItem>
                        <MenuItem value={'Supervisor'}>Supervisor</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                        labelId="department-label"
                        value={this.state.editableItem.department}
                        onChange={event => this.setState({ editableItem: { ...this.state.editableItem, department: event.target.value } })}
                    >
                        <MenuItem value={'Dept A'}>Dept A</MenuItem>
                        <MenuItem value={'Dept B'}>Dept B</MenuItem>
                        <MenuItem value={'Dept C'}>Dept C</MenuItem>
                    </Select>
                </FormControl>


                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 32 }}
                    startIcon={this.state.editMode ? <Edit /> : <Add />}
                >
                    {this.state.editMode ? 'Update' : 'Create'}
                </Button>
            </Drawer>
        );
    }
};

export default withStyles(styles)(Users);
