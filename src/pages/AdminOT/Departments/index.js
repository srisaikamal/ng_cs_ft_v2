import {
    Button,
    Chip,
    Drawer,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
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


class Departments extends React.Component {
    constructor(props) {
        super(props);
        this.getDrawer = this.getDrawer.bind(this);
    }

    state = {
        drawerOpen: false,
        drawerPosition: 'left',
        editMode: false,
        editableItem: {
            name: '',
            zone: '',
            head: '',
        },
        tableData: [
            {
                name: 'Dept A',
                zone: 'Zone A',
                head: 'Abhishek'
            },
            {
                name: 'Dept B',
                zone: 'Zone A',
                head: 'Darshan'
            },
            {
                name: 'Dept C',
                zone: 'Zone B',
                head: 'Srikanth'
            }
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
                                        zone: '',
                                        head: '',
                                    },
                                    editMode: false,
                                    drawerPosition: 'left',
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
                    <Grid item md={10}>
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
                                { title: "Head", field: "head" },
                            ]}
                            data={this.state.tableData}
                            title=''
                            actions={[
                                {
                                    icon: () => <Edit />,
                                    tooltip: 'Edit Department',
                                    onClick: (event, rowData) => {
                                        // Do edit operation
                                        this.setState({ drawerOpen: true, editableItem: rowData, editMode: true });
                                    }
                                }
                            ]}
                        />
                    </Grid>
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
                                    drawerPosition: 'right',
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
                </Grid>
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
                        editableItem: {
                            name: '',
                            zone: '',
                            head: '',
                        },
                    })
                }
            >
                <Typography component='h5' variant='h5' style={{ marginBottom: 24 }}>
                    {this.state.editMode ? 'Edit Department' : 'Add Department'}
                </Typography>

                <TextField
                    label='Name'
                    value={this.state.editableItem.name}
                    onChange={event => this.setState({ editableItem: { ...this.state.editableItem, name: event.target.value } })}
                />

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="zone-label">Zone</InputLabel>
                    <Select
                        labelId="zone-label"
                        value={this.state.editableItem.zone}
                        onChange={event => this.setState({ editableItem: { ...this.state.editableItem, zone: event.target.value } })}
                    >
                        <MenuItem value={'Zone A'}>Zone A</MenuItem>
                        <MenuItem value={'Zone B'}>Zone B</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ marginTop: 16 }}>
                    <InputLabel id="head-label">Head</InputLabel>
                    <Select
                        labelId="head-label"
                        value={this.state.editableItem.head}
                        onChange={event => this.setState({ editableItem: { ...this.state.editableItem, head: event.target.value } })}
                    >
                        <MenuItem value={'Abhishek'}>Abhishek</MenuItem>
                        <MenuItem value={'Darshan'}>Darshan</MenuItem>
                        <MenuItem value={'Srikanth'}>Srikanth</MenuItem>
                    </Select>
                </FormControl>

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
                                        zone: '',
                                        head: '',
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

export default withStyles(styles)(Departments);
