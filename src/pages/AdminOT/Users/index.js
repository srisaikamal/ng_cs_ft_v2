import axios from 'axios';
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
  withStyles,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
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
  ViewColumn,
} from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';
// Local
import { drawerWidth, apiHost } from '../../../config';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
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
    padding: theme.spacing(5),
    backgroundColor: '#7395AE',
  },
  drawercontent: {
    marginTop: -32,
  },
});

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.getDrawer = this.getDrawer.bind(this);
    this.getDepartmentsList = this.getDepartmentsList.bind(this);
    this.getUsersList = this.getUsersList.bind(this);
    this.onCreateOrEditButtonPress = this.onCreateOrEditButtonPress.bind(this);
    this.resetToDefault = this.resetToDefault.bind(this);
    this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    drawerOpen: false,
    editMode: false,
    error: null,
    loading: false,
    designationOptions: [],
    departmentOptions: [],
    departmentNameIdMap: {},
    tableData: [],
    selected: 'no',
    editableItem: {
      name: '',
      username: '',
      password: '',
      disabled: false,
      designation: '',
      cases: [],
      department: '',
    },
  };
  handleChange = (ev) => {
    this.setState({ selected: ev.target.value });
    console.log(ev.target.value);
  };
  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    return (
      <div>
        {this.getDrawer()}
        <Grid container>
          <Grid
            item
            md={1}
            style={{ textAlign: 'center', marginTop: window.innerHeight / 5 }}
          >
            <span
              style={{ fontSize: 42 }}
              onClick={() =>
                this.setState({
                  editableItem: {
                    name: '',
                    username: '',
                    password: '',
                    disabled: false,
                    designation: '',
                    cases: [],
                    department: '',
                  },
                  drawerOpen: true,
                  editMode: false,
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
            <MaterialTable
              icons={tableIcons}
              components={{
                Container: (props) => <Paper {...props} elevation={0} />,
              }}
              options={{
                grouping: true,
                exportButton: true,
                actionsColumnIndex: -1,
                paging: false,
              }}
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Username', field: 'username' },
                { title: 'Designation', field: 'designation' },
                {
                  title: 'Cases',
                  field: 'cases',
                  grouping: false,
                  render: (rowData) => (
                    <div>
                      {rowData.cases.map((caseItem, index) => (
                        <Chip
                          key={index}
                          label={caseItem}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  ),
                },
                {
                  title: 'Department',
                  field: 'department',
                },
              ]}
              data={this.state.tableData}
              title='Users List'
              actions={[
                {
                  icon: () => <Edit />,
                  tooltip: 'Edit User',
                  onClick: (event, rowData) => {
                    // Do edit operation
                    let editableItem = Object.assign({}, rowData);
                    editableItem.department = editableItem.department.name;
                    this.setState({
                      drawerOpen: true,
                      editableItem: editableItem,
                      editMode: true,
                    });
                  },
                },
                {
                  icon: () => <Delete color='error' />,
                  tooltip: 'Delete User',
                  onClick: (event, rowData) => {
                    // Do Delete operation
                    this.onDeleteButtonPress(rowData);
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this.getDepartmentsList();
    this.getUsersList();
  }

  async getDepartmentsList() {
    try {
      const apiEndpoint = apiHost + '/departments/';
      let response = await axios.get(apiEndpoint);
      response = response.data;

      let departmentOptions = new Set();
      let departmentNameIdMap = {};

      response.forEach((department) => {
        departmentOptions.add(department['name']);
        departmentNameIdMap[department['name']] = department['id'];
      });

      departmentOptions = Array.from(departmentOptions);
      this.setState({
        departmentOptions: departmentOptions,
        departmentNameIdMap: departmentNameIdMap,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersList() {
    try {
      const apiEndpoint = apiHost + '/accounts/';
      let response = await axios.get(apiEndpoint);
      response = response.data;
      response.forEach((user, index) => {
        response[index]['department'] = user['department']['name'];
        let userCases = [];
        user['cases'].forEach((caseItem) => {
          userCases.push(caseItem['name']);
        });
        response[index]['cases'] = userCases;
      });
      this.setState({
        tableData: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getDrawer() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.state.drawerOpen}
        onClose={this.resetToDefault}
      >
        <Typography component='h5' variant='h5' style={{ marginBottom: 24 }}>
          {this.state.editMode ? 'Edit User' : 'Add User'}
        </Typography>
        <div className={classes.drawercontent}>
          <TextField
            label='First Name'
            value={this.state.editableItem.name}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  name: event.target.value,
                },
              })
            }
          />

          <TextField
            style={{ marginTop: 16 }}
            label='Last Name'
            value={this.state.editableItem.username}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  username: event.target.value,
                },
              })
            }
          />
          <TextField
            style={{ marginTop: 16 }}
            label='Group'
            value={this.state.editableItem.username}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  username: event.target.value,
                },
              })
            }
          />
          <TextField
            style={{ marginTop: 16 }}
            label='Phone'
            value={this.state.editableItem.username}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  username: event.target.value,
                },
              })
            }
          />

          <FormControl style={{ marginTop: 18, minWidth: 180 }}>
            <InputLabel id='designation-label'>Role</InputLabel>
            <Select
              labelId='designation-label'
              value={this.state.editableItem.designation}
              onChange={(event) =>
                this.setState({
                  editableItem: {
                    ...this.state.editableItem,
                    designation: event.target.value,
                  },
                })
              }
            >
              <MenuItem value={'Supervisor'}>Supervisor</MenuItem>
              <MenuItem value={'Team Lead'}>Analyst</MenuItem>
              <MenuItem value={'Analyst'}>Analyst</MenuItem>
              <MenuItem value={'Field Agent'}>Analyst</MenuItem>
            </Select>
            <br />
            <FormLabel component='legend'>System Access</FormLabel>
            <RadioGroup
              aria-label='System Access'
              name='System Access'
              className={classes.group}
              row={true}
              onChange={this.handleChange}
              value={this.state.selected}
            >
              <FormControlLabel value='yes' control={<Radio />} label='Yes' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>

          {this.state.selected === 'yes' && (
            <div>
              <TextField
                label='Username'
                value={this.state.editableItem.name}
                onChange={(event) =>
                  this.setState({
                    editableItem: {
                      ...this.state.editableItem,
                      name: event.target.value,
                    },
                  })
                }
              />

              <TextField
                style={{ marginTop: 16 }}
                label='Password'
                type='password'
                value={this.state.editableItem.password}
                onChange={(event) =>
                  this.setState({
                    editableItem: {
                      ...this.state.editableItem,
                      password: event.target.value,
                    },
                  })
                }
              />
            </div>
          )}
          <br />
          <TextField
            id='date'
            label='Start Date'
            type='date'
            defaultValue='2017-05-24'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            id='date'
            label='End Date'
            type='date'
            defaultValue='2017-05-24'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant='contained'
            color='primary'
            fullWidth
            style={{ marginTop: 32 }}
            startIcon={this.state.editMode ? <Edit /> : <Add />}
            onClick={this.onCreateOrEditButtonPress}
          >
            {this.state.editMode ? 'Update' : 'Create'}
          </Button>
        </div>
      </Drawer>
    );
  }

  resetToDefault() {
    this.setState({
      drawerOpen: false,
      editMode: false,
      editableItem: {
        name: '',
        username: '',
        password: '',
        disabled: false,
        designation: '',
        cases: [],
        department: '',
      },
    });
  }

  async onCreateOrEditButtonPress() {
    try {
      let apiEndpoint = apiHost + '/accounts/';
      let payload = this.state.editableItem;
      let departmentId = this.state.departmentNameIdMap[payload.department];
      payload.department = departmentId;
      if (this.state.editMode) {
        apiEndpoint += `${payload.id}/`;
        let response = await axios.put(apiEndpoint, payload);
        response = response.data;
        console.log(response);
      } else {
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
      let apiEndpoint = apiHost + '/accounts/' + rowData.id + '/';
      let response = await axios.delete(apiEndpoint);
      response = response.data;
      console.log(response);
      this.resetToDefault();
      this.componentDidMount();
    } catch (error) {
      console.log(error);
    }
  }
}

export default withStyles(styles)(Users);
