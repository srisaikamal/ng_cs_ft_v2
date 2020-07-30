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
import axios from 'axios';
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


class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.getDrawer = this.getDrawer.bind(this);
        this.getCases = this.getCases.bind(this);
        this.getAllAccounts = this.getAllAccounts.bind(this);
        this.resetToDefault = this.resetToDefault.bind(this);
        this.onCreateOrEditButtonPress = this.onCreateOrEditButtonPress.bind(this);
        this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
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
            accounts: [],
            targets: [],
        },
        tableData: [],
        accountObjects: [],
        accountNameOptions: [],
        accountIdNameLookupMap: {},
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
                                        accounts: [],
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
                                grouping: true,
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
                                    title: "accounts",
                                    field: "accounts",
                                    grouping: false,
                                    render: rowData =>
                                        <div>
                                            {
                                                rowData.accounts.map((user, index) =>
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
                                    grouping: false,
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
                                        let editableItem = Object.assign({}, rowData);
                                        let selectedCaseAccountNames = editableItem['accounts'];
                                        let accountsObjectsList = this.state.accountObjects;
                                        let editableItemAccounts = [];

                                        selectedCaseAccountNames.forEach(accountName => {
                                            accountsObjectsList.forEach(accountObject => {
                                                if (accountName === accountObject['name']) {
                                                    editableItemAccounts.push(accountObject);
                                                }
                                            });
                                        });

                                        editableItem['accounts'] = editableItemAccounts;

                                        this.setState({
                                            drawerOpen: true,
                                            editableItem: editableItem,
                                            editMode: true
                                        });
                                    },
                                },
                                {
                                    icon: () => <Delete color='error' />,
                                    tooltip: 'Delete Case',
                                    onClick: (event, rowData) => {
                                        // Do Delete operation
                                        this.onDeleteButtonPress(rowData);
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
                    () => this.resetToDefault()
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
                    multiline
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

                {
                    this.state.editMode &&
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

                }

                <Autocomplete
                    style={{ marginTop: 16 }}
                    multiple
                    options={this.state.accountObjects}
                    getOptionLabel={(option) => option['name']}
                    value={this.state.editableItem.accounts}
                    onChange={(event, value) => this.setState({ editableItem: { ...this.state.editableItem, accounts: value } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="accounts"
                        />
                    )}
                />


                <TextField
                    style={{ marginTop: 16 }}
                    label='Targets'
                    value={this.state.editableItem.targets.join(',')}
                    onChange={event => this.setState({ editableItem: { ...this.state.editableItem, targets: event.target.value.split(',') } })}
                />


                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 32 }}
                    startIcon={this.state.editMode ? <Edit /> : <Add />}
                    onClick={this.onCreateOrEditButtonPress}
                >
                    {this.state.editMode ? 'Update' : 'Create'}
                </Button>
            </Drawer>
        );
    }

    componentDidMount() {
        this.getCases();
    }

    async getCases() {
        try {
            await this.getAllAccounts();
            const apiEndpoint = apiHost + '/cases/';
            let response = await axios.get(apiEndpoint);
            response = response.data;
            response = response.filter((caseItem, index) => caseItem['name'] !== 'DEFAULT_CASE_CHECK_OT');
            response.forEach((caseItem, index) => {
                let accountsForCase = caseItem['accounts'];
                let accountNamesForCase = [];
                accountsForCase.forEach(accountId => {
                    accountNamesForCase.push(this.state.accountIdNameLookupMap[accountId]);
                });
                response[index]['accounts'] = accountNamesForCase;
            });
            this.setState({ tableData: response });
        } catch (error) {
            console.log(error);
        }
    }

    async getAllAccounts() {
        try {
            const apiEndpoint = apiHost + '/accounts/';
            let response = await axios.get(apiEndpoint);
            response = response.data;

            let accountNameOptions = new Set();
            let accountIdNameLookupMap = {};
            let accountObjects = [];

            response.forEach(account => {
                let accountId = account['id'];
                let accountName = account['name'];
                accountNameOptions.add(accountName);
                accountIdNameLookupMap[accountId] = accountName;
                accountObjects.push(account);
            });

            accountNameOptions = Array.from(accountNameOptions);

            this.setState({
                accountNameOptions: accountNameOptions,
                accountIdNameLookupMap: accountIdNameLookupMap,
                accountObjects: accountObjects,
            });
        } catch (error) {
            console.log(error);
        }
    }

    resetToDefault() {
        this.setState({
            drawerOpen: false,
            editMode: false,
            editableItem: {
                name: '',
                description: '',
                category: '',
                status: 'Open',
                createdAt: '',
                updatedAt: '',
                accounts: [],
                targets: [],
            },
        });
    }

    async onCreateOrEditButtonPress() {
        try {
            let apiEndpoint = apiHost + '/cases/';
            let payload = this.state.editableItem;
            let accountsIds = [];
            console.log(payload);
            payload.accounts.forEach(account => {
                accountsIds.push(account['id']);
            });
            payload.accounts = accountsIds;

            if (this.state.editMode) {
                apiEndpoint += `${payload.id}/`;
                let response = await axios.put(apiEndpoint, payload);
                response = response.data;
                console.log(response);
            }
            else {
                let response = await axios.post(apiEndpoint, payload);
                response = response.data;
                console.log(response);
            }
            this.resetToDefault();
            this.componentDidMount();
        } catch (error) {
            console.log(error);
        }
    }

    async onDeleteButtonPress(rowData) {
        try {
            let apiEndpoint = apiHost + '/cases/' + rowData.id + '/';
            let response = await axios.delete(apiEndpoint);
            response = response.data;
            console.log(response);
            this.resetToDefault();
            this.componentDidMount();
        } catch (error) {
            console.log(error);
        }
    }
};

export default withStyles(styles)(Cases);
