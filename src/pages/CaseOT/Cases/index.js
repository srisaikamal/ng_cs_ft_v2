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
    Paper
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


class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.getDrawer = this.getDrawer.bind(this);
    }

    state = {
        drawerOpen: false,
        editMode: false,
        editableItem: {
            name: '',
            description: '',
            category: '',
            status: 'Open',
            createdAt: '',
            updatedAt: '',
            users: [],
            targets: [],
        },
        tableData: [
            {
                id: 1,
                name: 'Bomb blast at Place X',
                description: 'Sample description',
                category: 'Bomb Blast',
                status: 'Open',
                users: ['Abhishek', 'Darshan'],
                targets: ['123456789', '987654321'],
            },
            {
                id: 2,
                name: 'Robbery at Place X',
                description: 'Sample description',
                category: 'Robbery',
                status: 'Open',
                users: ['Srikanth'],
                targets: [],
            },
            {
                id: 3,
                name: 'Bomb blast at Place X',
                description: 'Sample description',
                category: 'Bomb Blast',
                status: 'Close',
                users: ['Abhishek', 'Darshan'],
                targets: ['123456789', '987654321'],
            },
            {
                id: 4,
                name: 'Robbery at Place X',
                description: 'Sample description',
                category: 'Robbery',
                status: 'Close',
                users: ['Srikanth'],
                targets: [],
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
                                        description: '',
                                        category: '',
                                        status: 'Open',
                                        createdAt: '',
                                        updatedAt: '',
                                        users: [],
                                        targets: [],
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
                                actionsColumnIndex: -1,
                                paging: false,
                            }}
                            columns={[
                                { title: "ID", field: "id", type: "numeric", align: "left", width: 16 },
                                { title: "Name", field: "name" },
                                { title: "Description", field: "description" },
                                { title: "Category", field: "category" },
                                {
                                    title: "Status",
                                    field: "status",
                                    render: rowData =>
                                        <span style={{ color: rowData.status === 'Open' ? 'green' : 'red' }}>
                                            {rowData.status}
                                        </span>
                                },
                                {
                                    title: "Users",
                                    field: "users",
                                    render: rowData =>
                                        <div>
                                            {
                                                rowData.users.map((user, index) =>
                                                    <Chip
                                                        key={index}
                                                        label={user}
                                                        className={classes.chip}
                                                    />
                                                )
                                            }
                                        </div>
                                },
                                {
                                    title: "Targets",
                                    field: "targets",
                                    render: rowData =>
                                        <div>
                                            {
                                                rowData.targets.map((target, index) =>
                                                    <Chip
                                                        key={index}
                                                        label={target}
                                                        className={classes.chip}
                                                    />
                                                )
                                            }
                                        </div>
                                }
                            ]}
                            data={this.state.tableData}
                            title='Case List'
                            actions={[
                                {
                                    icon: () => <Edit />,
                                    tooltip: 'Edit Case',
                                    onClick: (event, rowData) => {
                                        // Do edit operation
                                        this.setState({ drawerOpen: true, editableItem: rowData, editMode: true });
                                    },
                                },
                                {
                                    icon: () => <Delete color='error' />,
                                    tooltip: 'Delete Case',
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
                        editableItem: {
                            name: '',
                            description: '',
                            category: '',
                            status: 'Open',
                            createdAt: '',
                            updatedAt: '',
                            users: [],
                            targets: [],
                        },
                    })
                }
            >
                <Typography component='h5' variant='h5' style={{ marginBottom: 32 }}>
                    {this.state.editMode ? 'Edit Case' : 'Add Case'}
                </Typography>

                <TextField
                    label='Name'
                    value={this.state.editableItem.name}
                    onChange={event => this.setState({ editableItem: { ...this.state.editableItem, name: event.target.value } })}
                />

                <TextField
                    label='Description'
                    style={{ marginTop: 16 }}
                    value={this.state.editableItem.description}
                    onChange={event => this.setState({ editableItem: { ...this.state.editableItem, description: event.target.value } })}
                />

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        value={this.state.editableItem.category}
                        onChange={event => this.setState({ editableItem: { ...this.state.editableItem, category: event.target.value } })}
                    >
                        <MenuItem value={'Robbery'}>Robbery</MenuItem>
                        <MenuItem value={'Bomb Blast'}>Bomb Blast</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        value={this.state.editableItem.status}
                        onChange={event => this.setState({ editableItem: { ...this.state.editableItem, status: event.target.value } })}
                    >
                        <MenuItem value={'Open'}>Open</MenuItem>
                        <MenuItem value={'Close'}>Close</MenuItem>
                        <MenuItem value={'Delayed'}>Delayed</MenuItem>
                    </Select>
                </FormControl>

                <Autocomplete
                    style={{ marginTop: 16 }}
                    multiple
                    options={['Abhishek', 'Darshan', 'Srikanth']}
                    getOptionLabel={(option) => option}
                    value={this.state.editableItem.users}
                    onChange={(event, value) => this.setState({ editableItem: { ...this.state.editableItem, users: value } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Users"
                        />
                    )}
                />


                <Autocomplete
                    style={{ marginTop: 16 }}
                    multiple
                    options={['123456789', '987654321']}
                    getOptionLabel={(option) => option}
                    value={this.state.editableItem.targets}
                    onChange={(event, value) => this.setState({ editableItem: { ...this.state.editableItem, targets: value } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Targets"
                        />
                    )}
                />


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

export default withStyles(styles)(Cases);
