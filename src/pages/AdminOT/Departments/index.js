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
  Dialog,
  AppBar,
  Toolbar,
  DialogContent,
  IconButton,
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
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
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
    width: '40%',
    align: 'center',
  },
  title: {
    padding: 10,
  },
});

class Departments extends React.Component {
  constructor(props) {
    super(props);
    this.getDrawer = this.getDrawer.bind(this);
    this.getAllAccounts = this.getAllAccounts.bind(this);
    this.getDepartmentsList = this.getDepartmentsList.bind(this);
    this.onCreateOrEditButtonPress = this.onCreateOrEditButtonPress.bind(this);
    this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
  }

  state = {
    drawerOpen: false,
    editMode: false,
    editableItem: {
      name: '',
      zone: '',
      head: '',
    },
    tableData: [],
    departmentHeadOptions: [],
    departmentZoneOptions: [],
  };
  handleClose = () => {
    this.setState({
      drawerOpen: false,
      editMode: false,
      editableItem: {
        name: '',
        zone: '',
        head: '',
      },
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.getDrawer()}
        <Grid container>
          <Grid
            item
            style={{
              textAlign: 'center',
              marginTop: window.innerHeight / 1500,
              width: 45,
              height: window.innerHeight,
              backgroundColor: '#18202c',
            }}
          >
            <span
              style={{ fontSize: 21, color: 'white' }}
              onClick={() =>
                this.setState({
                  drawerOpen: true,
                  editMode: false,
                  editableItem: {
                    name: '',
                    zone: '',
                    head: '',
                  },
                })
              }
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              C<br />
              R<br />
              E<br />
              A<br />
              T<br />
              E<br />
            </span>
          </Grid>
          <Grid style={{ padding: 0, width: 36 }}></Grid>
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
                search: true,
              }}
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Zone', field: 'zone' },
                { title: 'Head', field: 'head' },
              ]}
              data={this.state.tableData}
              title='Departments List'
              actions={[
                {
                  icon: () => <Edit />,
                  tooltip: 'Edit Department',
                  onClick: (event, rowData) => {
                    // Do edit operation
                    this.setState({
                      drawerOpen: true,
                      editableItem: rowData,
                      editMode: true,
                    });
                  },
                },
                {
                  icon: () => <Delete color='error' />,
                  tooltip: 'Delete Department',
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
    this.getAllAccounts();
    this.getDepartmentsList();
  }

  async getDepartmentsList() {
    try {
      const apiEndpoint = apiHost + '/departments/';
      let response = await axios.get(apiEndpoint);
      response = response.data;

      let departmentZoneOptions = new Set();

      response.forEach((department) => {
        let departmentName = department['zone'];
        departmentZoneOptions.add(departmentName);
      });

      departmentZoneOptions = Array.from(departmentZoneOptions);

      this.setState({
        tableData: response,
        departmentZoneOptions: departmentZoneOptions,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAccounts() {
    try {
      const apiEndpoint = apiHost + '/accounts/';
      let response = await axios.get(apiEndpoint);
      response = response.data;

      let departmentHeadOptions = new Set();

      response.forEach((account) => {
        let accountName = account['name'];
        departmentHeadOptions.add(accountName);
      });

      departmentHeadOptions = Array.from(departmentHeadOptions);

      this.setState({
        departmentHeadOptions: departmentHeadOptions,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getDrawer() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          aria-labelledby='customized-dialog-title'
          open={this.state.drawerOpen}
          onClose={this.handleClose}
          //className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppBar position='static' style={{ backgroundColor: '#18202c' }}>
            <Toolbar>
              <Grid
                justify='space-between' // Add it here :)
                container
                spacing={20}
              >
                <Grid item>
                  <Typography
                    variant='h6'
                    color='inherit'
                    className={classes.title}
                  >
                    {this.state.editMode ? 'Edit Department' : 'Add Department'}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label='close'
                    className={classes.closeButton}
                    onClick={this.handleClose}
                    color='inherit'
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <DialogContent style={{ paddingLeft: 50 }}>
            <TextField
              label='Name'
              fullWidth
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
            <br />

            <FormControl style={{ marginTop: 16, minWidth: 500 }}>
              <InputLabel id='zone-label'>Department Zone</InputLabel>
              <Select
                labelId='zone-label'
                value={this.state.editableItem.zone}
                onChange={(event) =>
                  this.setState({
                    editableItem: {
                      ...this.state.editableItem,
                      zone: event.target.value,
                    },
                  })
                }
              >
                {this.state.departmentZoneOptions.map((zone) => (
                  <MenuItem key={zone} value={zone}>
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />

            <FormControl style={{ marginTop: 16, minWidth: 500 }}>
              <InputLabel id='head-label'>Department Head</InputLabel>
              <Select
                labelId='head-label'
                value={this.state.editableItem.head}
                onChange={(event) =>
                  this.setState({
                    editableItem: {
                      ...this.state.editableItem,
                      head: event.target.value,
                    },
                  })
                }
              >
                {this.state.departmentHeadOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label='City'
              fullWidth
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
            <br />
            <br />
            <TextField
              label='LGA'
              fullWidth
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
            <br />
            <br />
            <TextField
              label='State'
              fullWidth
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
            <br />

            <Button
              variant='contained'
              color='primary'
              fullWidth
              style={{
                marginTop: 32,
                marginLeft: -12,
                backgroundColor: '#18202c',
              }}
              startIcon={this.state.editMode ? <Edit /> : <Add />}
              onClick={this.onCreateOrEditButtonPress}
            >
              {this.state.editMode ? 'Edit' : 'Create'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      /* <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.state.drawerOpen}
        onClose={() =>
          this.setState({
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
          onChange={(event) =>
            this.setState({
              editableItem: {
                ...this.state.editableItem,
                name: event.target.value,
              },
            })
          }
        />

        <FormControl style={{ marginTop: 16 }}>
          <InputLabel id='zone-label'>Department Zone</InputLabel>
          <Select
            labelId='zone-label'
            value={this.state.editableItem.zone}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  zone: event.target.value,
                },
              })
            }
          >
            {this.state.departmentZoneOptions.map((zone) => (
              <MenuItem key={zone} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: 16 }}>
          <InputLabel id='head-label'>Department Head</InputLabel>
          <Select
            labelId='head-label'
            value={this.state.editableItem.head}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  head: event.target.value,
                },
              })
            }
          >
            {this.state.departmentHeadOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='City'
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
          label='LGA'
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
          label='State'
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

        <Button
          variant='contained'
          color='primary'
          fullWidth
          style={{ marginTop: 32 }}
          startIcon={this.state.editMode ? <Edit /> : <Add />}
          onClick={this.onCreateOrEditButtonPress}
        >
          {this.state.editMode ? 'Edit' : 'Create'}
        </Button>
      </Drawer> */
    );
  }

  async onCreateOrEditButtonPress() {
    try {
      let apiEndpoint = apiHost + '/departments/';
      let payload = this.state.editableItem;
      if (this.state.editMode) {
        apiEndpoint += `${payload.id}/`;
        let response = await axios.patch(apiEndpoint, payload);
        response = response.data;
      } else {
        let response = await axios.post(apiEndpoint, payload);
        response = response.data;
      }
      this.setState({
        drawerOpen: false,
        editMode: false,
        editableItem: {
          name: '',
          zone: '',
          head: '',
        },
      });
      this.componentDidMount();
    } catch (error) {
      console.log(error);
    }
  }

  async onDeleteButtonPress(rowData) {
    try {
      let apiEndpoint = apiHost + '/departments/' + rowData.id + '/';
      let response = await axios.delete(apiEndpoint);
      response = response.data;
      console.log(response);
      this.componentDidMount();
    } catch (error) {
      console.log(error);
    }
  }
}

export default withStyles(styles)(Departments);
