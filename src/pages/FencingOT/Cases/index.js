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

const currentAccount = JSON.parse(localStorage.getItem('current_account'));

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


class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.getCases = this.getCases.bind(this);
        this.getAllAccounts = this.getAllAccounts.bind(this);
    }

    state = {
        tableData: [],
        accountIdNameLookupMap: {},
    }

    render() {
        const {
            classes,
            selectedCase,
            onRowSelect,
        } = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item md={12}>
                        <MaterialTable
                            icons={tableIcons}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />
                            }}
                            options={{
                                actionsColumnIndex: -1,
                                paging: false,
                                grouping: true,
                                rowStyle: rowData => ({
                                    backgroundColor: (selectedCase.id === rowData.id) ? '#EEE' : '#FFF'
                                })
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
                            title='My Case List'
                            onRowClick={onRowSelect}
                        />
                    </Grid>
                </Grid>
            </div >
        );
    }
    async componentDidMount() {
        await this.getAllAccounts();
        await this.getCases();
    }

    async getCases() {
        try {
            const apiEndpoint = apiHost + '/cases/?accounts=' + currentAccount['id'];
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

};

export default withStyles(styles)(Cases);
