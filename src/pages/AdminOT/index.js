import React from 'react';
import { forwardRef } from 'react';
import {
    withStyles,
    Tabs,
    Tab,
    Chip,
} from '@material-ui/core';
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
} from '@material-ui/icons';
import MaterialTable from "material-table";
// Local
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
});

class AdminOT extends React.Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getUsersTable = this.getUsersTable.bind(this);
        this.getDepartmentsTable = this.getDepartmentsTable.bind(this);
    }

    state = {
        activeTab: 'Users',
        usersTableData: [
            {
                name: 'Darshan',
                designation: 'Analyst',
                cases: ['Bomb blast at market', 'Case 2', 'Case 3'],
                departments: ['Dept A', 'Dept B', 'Dept C'],
                modules: ['Location']
            },
            {
                name: 'Abhishek',
                designation: 'Supervisor',
                cases: ['Bomb blast at market', 'Case 2'],
                departments: ['Dept C'],
                modules: ['Location']
            },
            {
                name: 'Boopathi',
                designation: 'Analyst',
                cases: ['Case 2', 'Case 3'],
                departments: ['Dept A', 'Dept B', 'Dept C'],
                modules: []
            },
            {
                name: 'Srikanth',
                designation: 'Analyst',
                cases: ['Bomb blast at market', 'Case 3'],
                departments: ['Dept A', 'Dept B'],
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
                            editable: "never",
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
                        {
                            title: "Deparments",
                            field: "departments",
                            editable: "never",
                            grouping: false,
                            render: rowData =>
                                <div>
                                    {
                                        rowData.departments.map((departmentName, index) =>
                                            <Chip
                                                key={index}
                                                label={departmentName}
                                                className={classes.chip}
                                            />
                                        )
                                    }
                                </div>
                        },
                        {
                            title: "Modules",
                            field: "modules",
                            editable: "never",
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
                    editable={{
                        onRowAdd: (newData) => new Promise(resolve => {
                            console.log(newData);
                            resolve();
                        }),
                        onRowUpdate: (newData, oldData) => new Promise(resolve => {
                            console.log(newData);
                            resolve();
                        }),
                        onRowDelete: (oldData) => new Promise(resolve => {
                            console.log(oldData);
                            resolve();
                        }),
                    }}
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
                    editable={{
                        onRowAdd: (newData) => new Promise(resolve => {
                            console.log(newData);
                            resolve();
                        }),
                        onRowUpdate: (newData, oldData) => new Promise(resolve => {
                            console.log(newData);
                            resolve();
                        }),
                        onRowDelete: (oldData) => new Promise(resolve => {
                            console.log(oldData);
                            resolve();
                        }),
                    }}
                />
            </div>
        );
    }
};

export default withStyles(styles)(AdminOT);
