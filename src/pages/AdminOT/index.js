import React from 'react';
import { forwardRef } from 'react';
import {
    withStyles,
    Tabs,
    Tab,
    Chip,
    Drawer,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
} from '@material-ui/core';
import {
    Autocomplete
} from '@material-ui/lab';
import {
    Home,
    ExitToApp,
    AddBox,
    Clear,
    DeleteOutline,
    ChevronLeft,
    ChevronRight,
    Edit,
    Remove,
    ViewColumn,
    SaveAlt,
    FilterList,
    ArrowDownward,
    Check,
    FirstPage,
    LastPage,
    Search,
    Delete,
    Add
} from '@material-ui/icons';
import MaterialTable from "material-table";
// Local
import {
    drawerWidth
} from '../../config';
import CustomAppBar from '../../components/CustomAppBar';

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

class AdminOT extends React.Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getUsersTable = this.getUsersTable.bind(this);
        this.getDepartmentsTable = this.getDepartmentsTable.bind(this);
        this.getUsersDrawer = this.getUsersDrawer.bind(this);
    }

    state = {
        activeTab: 'Users',
        drawerOpen: false,
        editMode: false,
        editableItem: {
            name: '',
            designation: '',
            cases: [],
            department: '',
            modules: [],
        },
        usersTableData: [
            {
                name: 'Darshan',
                designation: 'Analyst',
                cases: ['Bomb blast at market', 'Case 2', 'Case 3'],
                department: 'Dept A',
                modules: ['Location']
            },
            {
                name: 'Abhishek',
                designation: 'Supervisor',
                cases: ['Bomb blast at market', 'Case 2'],
                department: 'Dept C',
                modules: ['Location']
            },
            {
                name: 'Boopathi',
                designation: 'Analyst',
                cases: ['Case 2', 'Case 3'],
                department: 'Dept B',
                modules: []
            },
            {
                name: 'Srikanth',
                designation: 'Analyst',
                cases: ['Bomb blast at market', 'Case 3'],
                department: 'Dept A',
                modules: []
            },
        ],
        departmentsTableData: [
            {
                name: 'Dept A',
                zone: 'Zone 1',
                head: 'Abhishek'
            },
            {
                name: 'Dept B',
                zone: 'Zone 1',
                head: 'Darshan'
            },
            {
                name: 'Dept C',
                zone: 'Zone 3',
                head: 'Srikanth'
            }
        ]
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                {this.getContent()}
                {this.getUsersDrawer()}
            </div>
        );
    }

    getHeader() {
        return (
            <div>
                <CustomAppBar
                    title='Admin OT'
                    leadingIcon={<Home />}
                    onLeadingIconPress={() => window.location = '/landing'}
                    trailingIcon={<ExitToApp />}
                    onTrailingIconPress={() => window.location = '/'}
                />
                <Tabs
                    style={{ backgroundColor: '#3f51b5' }}
                    variant='fullWidth'
                    centered
                    value={this.state.activeTab}
                    onChange={(event, newVal) => this.setState({ activeTab: newVal })}
                >
                    <Tab label={<b style={{ color: 'white' }}>Users</b>} value='Users' />
                    <Tab label={<b style={{ color: 'white' }}>Departments</b>} value='Departments' />
                </Tabs>
            </div>
        );
    }

    getContent() {
        return (
            <div>
                {this.state.activeTab === 'Users' ? this.getUsersTable() : this.getDepartmentsTable()}
            </div>
        );
    }

    getUsersTable() {
        const {
            classes
        } = this.props;

        return (
            <div>
                <MaterialTable
                    icons={tableIcons}
                    options={{
                        grouping: true,
                        exportButton: true,
                        actionsColumnIndex: -1,
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
                        {
                            title: "Modules",
                            field: "modules",
                            grouping: false,
                            render: rowData =>
                                <div>
                                    {
                                        rowData.modules.map((moduleName, index) =>
                                            <Chip
                                                key={index}
                                                label={moduleName}
                                                className={classes.chip}
                                                onDelete={() => null}
                                            />
                                        )
                                    }
                                </div>
                        }
                    ]}
                    data={this.state.usersTableData}
                    title=''
                    actions={[
                        {
                            icon: () => <AddBox />,
                            tooltip: 'Add User',
                            isFreeAction: true,
                            onClick: () => {
                                // Do add operation
                                this.setState({
                                    drawerOpen: true,
                                    editableItem: {
                                        name: '',
                                        designation: '',
                                        cases: [],
                                        department: '',
                                        modules: [],
                                    },
                                    editMode: false,
                                });
                            }
                        },
                        {
                            icon: () => <Edit />,
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => {
                                // Do edit operation
                                this.setState({ drawerOpen: true, editableItem: rowData, editMode: true });
                            }
                        }
                    ]}
                />
            </div>
        );
    }

    getDepartmentsTable() {
        const {
            classes
        } = this.props;

        return (
            <div>
                <MaterialTable
                    icons={tableIcons}
                    options={{
                        grouping: true,
                        exportButton: true,
                        actionsColumnIndex: -1,
                    }}
                    columns={[
                        { title: "Name", field: "name" },
                        { title: "Zone", field: "zone" },
                        { title: "Head", field: "head" }
                    ]}
                    data={this.state.departmentsTableData}
                    title=''
                    actions={[
                        {
                            icon: () => <AddBox />,
                            tooltip: 'Add Department',
                            isFreeAction: true,
                            onClick: () => {
                                // Do add operation
                            }
                        },
                        {
                            icon: () => <Edit />,
                            tooltip: 'Edit Department',
                            onClick: (event, rowData) => {
                                // Do edit operation
                            }
                        }
                    ]}
                />
            </div>
        );
    }

    getUsersDrawer() {
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

                <Autocomplete
                    style={{ marginTop: 16 }}
                    multiple
                    options={['Location', 'Mobile']}
                    getOptionLabel={(option) => option}
                    value={this.state.editableItem.modules}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Modules"
                        />
                    )}
                />

                <Grid container spacing={1} style={{ marginTop: 24 }}>
                    <Grid item md={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            startIcon={<Delete />}
                            onClick={
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
                            {this.state.editMode ? 'Delete' : 'Cancel'}
                        </Button>
                    </Grid>

                    <Grid item md={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={this.state.editMode ? <Edit /> : <Add />}
                        >
                            {this.state.editMode ? 'Edit' : 'Create'}
                        </Button>
                    </Grid>
                </Grid>
            </Drawer>
        );
    }
};

export default withStyles(styles)(AdminOT);
