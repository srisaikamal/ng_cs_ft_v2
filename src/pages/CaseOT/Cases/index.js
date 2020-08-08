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
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  Paper,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  List,
  ListItemIcon,
  Divider,
  ListItemLink,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
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
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/Inbox';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';
import ChipInput from 'material-ui-chip-input';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
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
    width: '60%',

    align: 'center',
  },
  title: {
    padding: 10,
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
    dialogOpen: false,
    dialogOpen1: false,
    editMode: false,
    targets: [],
    targets1: [],
    targets2: [],
    chipname: '',
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
  };

  handleDelete = () => {
    this.setState({
      dialogOpen: true,
    });
  };
  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };
  handleClose1 = () => {
    this.setState({
      drawerOpen: false,
    });
  };
  handleClick = (data) => {
    if (data === 'MSISDN') {
      this.setState({
        chipname: 'MSISDN',
      });
    } else if (data === 'IMEI') {
      this.setState({
        chipname: 'IMEI',
      });
    } else {
      this.setState({
        chipname: 'LOCATIONS',
      });
    }
  };
  handleAddChip = (chip) => {
    if (this.state.chipname === 'MSISDN') {
      if (this.state.targets.indexOf(chip) == -1) {
        let targets = this.state.targets;
        targets.push(chip);
        this.setState({ targets: targets });
      }
    } else if (this.state.chipname === 'IMEI') {
      if (this.state.targets1.indexOf(chip) == -1) {
        let targets1 = this.state.targets1;
        targets1.push(chip);
        this.setState({ targets1: targets1 });
      }
    } else {
      if (this.state.targets2.indexOf(chip) == -1) {
        let targets2 = this.state.targets2;
        targets2.push(chip);
        this.setState({ targets2: targets2 });
      }
    }
  };

  handleDeleteChip = (chip, index) => {
    if (this.state.chipname === 'MSISDN') {
      if (this.state.targets.indexOf(chip) !== -1) {
        let targets = this.state.targets;
        targets.splice(index, 1);
        this.setState({ targets: targets });
      }
    } else if (this.state.chipname === 'IMEI') {
      if (this.state.targets1.indexOf(chip) !== -1) {
        let targets1 = this.state.targets1;
        targets1.splice(index, 1);
        this.setState({ targets1: targets1 });
      }
    } else {
      if (this.state.targets2.indexOf(chip) !== -1) {
        let targets2 = this.state.targets2;
        targets2.splice(index, 1);
        this.setState({ targets2: targets2 });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const targetNames = ['MSISDN', 'IMEI', 'LOCATIONS'];
    function createData(MSISDN, IMEI, LOCATIONS) {
      return { MSISDN, IMEI, LOCATIONS };
    }
    const rows = [
      createData(' MSISDN'),
      createData('IMEI'),
      createData('LOCATIONS'),
    ];
    return (
      <div className={classes.drawerdiv}>
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
            onClick={() =>
              this.setState({
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
              })
            }
          >
            <span style={{ fontSize: 21, color: 'white' }}>
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
                actionsColumnIndex: -1,
                paging: false,
                grouping: true,
              }}
              columns={[
                {
                  title: 'ID',
                  field: 'id',
                  type: 'numeric',
                  align: 'left',
                  width: 16,
                },
                { title: 'Name', field: 'name' },
                { title: 'Description', field: 'description' },
                { title: 'Category', field: 'category' },
                {
                  title: 'Status',
                  field: 'status',
                  render: (rowData) => (
                    <span
                      style={{
                        color: rowData.status === 'Open' ? 'green' : 'red',
                      }}
                    >
                      {rowData.status}
                    </span>
                  ),
                },
                {
                  title: 'accounts',
                  field: 'accounts',
                  grouping: false,
                  render: (rowData) => (
                    <div>
                      {rowData.accounts.map((user, index) => (
                        <Chip
                          key={index}
                          label={user}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  ),
                },
                {
                  title: 'Targets',
                  field: 'targets',
                  grouping: false,
                  render: (rowData) => (
                    <div>
                      {/* {rowData.targets.map((target, index) => (
                        <Chip
                          key={index}
                          label={target}
                          className={classes.chip}
                        />
                     ))}*/}
                      <Chip
                        label='Add Target'
                        onDelete={this.handleDelete}
                        color='secondary'
                        deleteIcon={<Add />}
                        clickable
                      />
                      <div style={{ width: 200 }}>
                        <Dialog
                          aria-labelledby='customized-dialog-title'
                          open={this.state.dialogOpen}
                          onClose={this.handleClose}
                          //className={classes.drawer}
                          classes={{
                            paper: classes.drawerPaper,
                          }}
                        >
                          <AppBar
                            position='static'
                            style={{
                              backgroundColor: '#18202c',
                            }}
                          >
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
                                    Targets
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

                          <DialogContent
                            style={{ paddingLeft: 0, height: 500 }}
                          >
                            {/*{targetNames.map((target) => {*/}

                            <SplitterLayout
                              primaryIndex={0}
                              primaryMinSize={200}
                              secondaryMinSize={400}
                              style={{ width: '45%' }}
                            >
                              <div>
                                {targetNames.map((target) => {
                                  return (
                                    <List
                                      component='nav'
                                      aria-label='main mailbox folders'
                                      onClick={this.handleClick.bind(
                                        null,
                                        target
                                      )}
                                    >
                                      <ListItem button>
                                        <ListItemIcon>
                                          <InboxIcon />
                                        </ListItemIcon>

                                        <ListItemText primary={target} />
                                      </ListItem>
                                    </List>
                                  );
                                })}
                                {/* <Card className={classes.card}>
                                  {targetNames.map((target) => {
                                    return (
                                      <CardContent key={target}>
                                        <Typography
                                          className={classes.title}
                                          color='textSecondary'
                                          gutterBottom
                                        >
                                          {target}
                                        </Typography>
                                      </CardContent>
                                    );
                                  })} 
                                </Card>*/}
                              </div>
                              <div>
                                {this.state.chipname === 'MSISDN' ? (
                                  <div>
                                    <Typography>
                                      {this.state.chipname}

                                      <ChipInput
                                        defaultValue={[]}
                                        fullWidth
                                        value={this.state.targets}
                                        onAdd={(chip) =>
                                          this.handleAddChip(chip)
                                        }
                                        onDelete={(chip, index) =>
                                          this.handleDeleteChip(chip, index)
                                        }
                                      />
                                    </Typography>

                                    <List className={classes.root}>
                                      {this.state.targets.map((target) => {
                                        return (
                                          <ListItem
                                            //key={value}
                                            role={undefined}
                                            dense
                                            button
                                          >
                                            <ListItemIcon>
                                              <Checkbox
                                                edge='start'
                                                tabIndex={-1}
                                                disableRipple
                                              />
                                            </ListItemIcon>
                                            <ListItemText
                                              //id={labelId}
                                              primary={target}
                                            />
                                          </ListItem>
                                        );
                                      })}
                                    </List>
                                  </div>
                                ) : (
                                  <Typography />
                                )}
                                {this.state.chipname === 'IMEI' ? (
                                  <div>
                                    <Typography>
                                      {this.state.chipname}
                                      <ChipInput
                                        defaultValue={[]}
                                        fullWidth
                                        value={this.state.targets1}
                                        onAdd={(chip) =>
                                          this.handleAddChip(chip)
                                        }
                                        onDelete={(chip, index) =>
                                          this.handleDeleteChip(chip, index)
                                        }
                                      />
                                    </Typography>

                                    <List className={classes.root}>
                                      {this.state.targets1.map((target) => {
                                        return (
                                          <ListItem
                                            //key={value}
                                            role={undefined}
                                            dense
                                            button
                                          >
                                            <ListItemIcon>
                                              <Checkbox
                                                edge='start'
                                                tabIndex={-1}
                                                disableRipple
                                              />
                                            </ListItemIcon>
                                            <ListItemText
                                              //id={labelId}
                                              primary={target}
                                            />
                                          </ListItem>
                                        );
                                      })}
                                    </List>
                                  </div>
                                ) : (
                                  <Typography />
                                )}
                                {this.state.chipname === 'LOCATIONS' ? (
                                  <div>
                                    <Typography>
                                      {this.state.chipname}
                                      <ChipInput
                                        defaultValue={[]}
                                        fullWidth
                                        value={this.state.targets2}
                                        onAdd={(chip) =>
                                          this.handleAddChip(chip)
                                        }
                                        onDelete={(chip, index) =>
                                          this.handleDeleteChip(chip, index)
                                        }
                                      />
                                    </Typography>

                                    <List className={classes.root}>
                                      {this.state.targets2.map((target) => {
                                        return (
                                          <ListItem
                                            //key={value}
                                            role={undefined}
                                            dense
                                            button
                                          >
                                            <ListItemIcon>
                                              <Checkbox
                                                edge='start'
                                                tabIndex={-1}
                                                disableRipple
                                              />
                                            </ListItemIcon>
                                            <ListItemText
                                              //id={labelId}
                                              primary={target}
                                            />
                                          </ListItem>
                                        );
                                      })}
                                    </List>
                                  </div>
                                ) : (
                                  <Typography />
                                )}
                              </div>
                            </SplitterLayout>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ),
                },
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

                    selectedCaseAccountNames.forEach((accountName) => {
                      accountsObjectsList.forEach((accountObject) => {
                        if (accountName === accountObject['name']) {
                          editableItemAccounts.push(accountObject);
                        }
                      });
                    });

                    editableItem['accounts'] = editableItemAccounts;

                    this.setState({
                      drawerOpen: true,
                      editableItem: editableItem,
                      editMode: true,
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
                },
              ]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  getDrawer() {
    const { classes } = this.props;
    return (
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={this.state.drawerOpen}
        onClose={this.handleClose1}
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
                  className={classes.title}
                  component='h5'
                  variant='h5'
                >
                  {this.state.editMode ? 'Edit Case' : 'Add Case'}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label='close'
                  className={classes.closeButton}
                  onClick={this.handleClose1}
                  color='inherit'
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <TextField
            label='Case Name'
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

          <TextField
            label='Case Description'
            fullWidth
            multiline
            style={{ marginTop: 16 }}
            value={this.state.editableItem.description}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  description: event.target.value,
                },
              })
            }
          />
          <br />
          <TextField
            label='Case Type'
            multiline
            fullWidth
            style={{ marginTop: 16 }}
            value={this.state.editableItem.description}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  description: event.target.value,
                },
              })
            }
          />
          <br />
          <TextField
            fullWidth
            label='Team Lead'
            multiline
            style={{ marginTop: 16 }}
            value={this.state.editableItem.description}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  description: event.target.value,
                },
              })
            }
          />
          <br />

          <TextField
            fullWidth
            label='Accounts'
            multiline
            style={{ marginTop: 16 }}
            value={this.state.editableItem.description}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  description: event.target.value,
                },
              })
            }
          />
          <br />
          <br />

          <TextField
            id='date'
            label='Start Date'
            fullWidth
            type='date'
            defaultValue='2020-08-03'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            id='date'
            label='Close Date'
            fullWidth
            type='date'
            defaultValue='2020-08-05'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            label='Department Zone'
            multiline
            style={{ marginTop: 16 }}
            fullWidth
            value={this.state.editableItem.description}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  description: event.target.value,
                },
              })
            }
          />
          <br />
          <TextField
            label='Department Name'
            multiline
            style={{ marginTop: 16 }}
            fullWidth
            value={this.state.editableItem.description}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  description: event.target.value,
                },
              })
            }
          />
          <br />
          <FormControl style={{ marginTop: 16, minWidth: 548 }}>
            <InputLabel id='category-label'>Resolution</InputLabel>
            <Select
              labelId='category-label'
              value={this.state.editableItem.category}
              onChange={(event) =>
                this.setState({
                  editableItem: {
                    ...this.state.editableItem,
                    category: event.target.value,
                  },
                })
              }
            >
              <MenuItem value={'Unresolved'}>Unresolved</MenuItem>
              <MenuItem value={'Suspended'}>Suspended</MenuItem>
              <MenuItem value={'Resolved'}>Unresolved</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ marginTop: 16, minWidth: 548 }}>
            <InputLabel id='category-label'>Case Status</InputLabel>
            <Select
              labelId='category-label'
              value={this.state.editableItem.category}
              onChange={(event) =>
                this.setState({
                  editableItem: {
                    ...this.state.editableItem,
                    category: event.target.value,
                  },
                })
              }
            >
              <MenuItem value={'Open'}>Unresolved</MenuItem>
              <MenuItem value={'Suspended'}>Suspended</MenuItem>
              <MenuItem value={'Closed'}>Unresolved</MenuItem>
            </Select>
          </FormControl>
          <br />

          <Button
            variant='contained'
            color='primary'
            fullWidth
            style={{
              marginTop: 32,
              marginLeft: -3,
              backgroundColor: '#18202c',
            }}
            startIcon={this.state.editMode ? <Edit /> : <Add />}
            onClick={this.onCreateOrEditButtonPress}
          >
            {this.state.editMode ? 'Update' : 'Create'}
          </Button>
        </DialogContent>
      </Dialog>
    );
    /* return (
      <Drawer
        anchor={this.state.drawerPosition}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.state.drawerOpen}
        onClose={() => this.resetToDefault()}
      >
        <Typography component='h5' variant='h5'>
          {this.state.editMode ? 'Edit Case' : 'Add Case'}
        </Typography>

        <TextField
          label='Case Name'
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
          label='Case Description'
          multiline
          style={{ marginTop: 16 }}
          value={this.state.editableItem.description}
          onChange={(event) =>
            this.setState({
              editableItem: {
                ...this.state.editableItem,
                description: event.target.value,
              },
            })
          }
        />
        <TextField
          label='Case Type'
          multiline
          style={{ marginTop: 16 }}
          value={this.state.editableItem.description}
          onChange={(event) =>
            this.setState({
              editableItem: {
                ...this.state.editableItem,
                description: event.target.value,
              },
            })
          }
        />
        <TextField
          label='Team Lead'
          multiline
          style={{ marginTop: 16 }}
          value={this.state.editableItem.description}
          onChange={(event) =>
            this.setState({
              editableItem: {
                ...this.state.editableItem,
                description: event.target.value,
              },
            })
          }
        />
        <br />
        <TextField
          id='date'
          label='Start Date'
          type='date'
          defaultValue='2020-08-03'
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          id='date'
          label='Close Date'
          type='date'
          defaultValue='2020-08-05'
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Department Zone'
          multiline
          style={{ marginTop: 16 }}
          value={this.state.editableItem.description}
          onChange={(event) =>
            this.setState({
              editableItem: {
                ...this.state.editableItem,
                description: event.target.value,
              },
            })
          }
        />
        <TextField
          label='Department Name'
          multiline
          style={{ marginTop: 16 }}
          value={this.state.editableItem.description}
          onChange={(event) =>
            this.setState({
              editableItem: {
                ...this.state.editableItem,
                description: event.target.value,
              },
            })
          }
        />
        <FormControl style={{ marginTop: 16 }}>
          <InputLabel id='category-label'>Resolution</InputLabel>
          <Select
            labelId='category-label'
            value={this.state.editableItem.category}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  category: event.target.value,
                },
              })
            }
          >
            <MenuItem value={'Unresolved'}>Unresolved</MenuItem>
            <MenuItem value={'Suspended'}>Suspended</MenuItem>
            <MenuItem value={'Resolved'}>Unresolved</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ marginTop: 16 }}>
          <InputLabel id='category-label'>Case Status</InputLabel>
          <Select
            labelId='category-label'
            value={this.state.editableItem.category}
            onChange={(event) =>
              this.setState({
                editableItem: {
                  ...this.state.editableItem,
                  category: event.target.value,
                },
              })
            }
          >
            <MenuItem value={'Open'}>Unresolved</MenuItem>
            <MenuItem value={'Suspended'}>Suspended</MenuItem>
            <MenuItem value={'Closed'}>Unresolved</MenuItem>
          </Select>
        </FormControl>
       
        <Button
          variant='contained'
          color='primary'
          fullWidth
          style={{ marginTop: 10 }}
          startIcon={this.state.editMode ? <Edit /> : <Add />}
          onClick={this.onCreateOrEditButtonPress}
        >
          {this.state.editMode ? 'Update' : 'Create'}
        </Button>
      </Drawer>
    ); */
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
      response = response.filter(
        (caseItem, index) => caseItem['name'] !== 'DEFAULT_CASE_CHECK_OT'
      );
      response.forEach((caseItem, index) => {
        let accountsForCase = caseItem['accounts'];
        let accountNamesForCase = [];
        accountsForCase.forEach((accountId) => {
          accountNamesForCase.push(
            this.state.accountIdNameLookupMap[accountId]
          );
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

      response.forEach((account) => {
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
      payload.accounts.forEach((account) => {
        accountsIds.push(account['id']);
      });
      payload.accounts = accountsIds;

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
}

export default withStyles(styles)(Cases);
