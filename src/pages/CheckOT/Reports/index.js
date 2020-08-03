import {
  withStyles,
  Slide,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  IconButton,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import {
  TableChart,
  Timeline,
  People,
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  Delete,
  Map,
} from '@material-ui/icons';
import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Local
import { drawerWidth, apiHost } from '../../../config';

import DataMapContent from './Content/DataMap';
import DataTableContent from './Content/DataTable';
import HandsetHistoryContent from './Content/HandsetHistory';
import LinkTreeContent from './Content/LinkTree';

import DataMapQuery from './Query/DataMap';
import DataTableQuery from './Query/DataTable';
import HandsetHistoryQuery from './Query/HandsetHistory';
import LinkTreeQuery from './Query/LinkTree';

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
  leftdrawer: {
    height: window.innerHeight,
    backgroundColor: '#7395AE',
  },
  rightdrawer: {
    height: window.innerHeight,
    backgroundColor: '#7395AE',
  },
  widgetListItem: {
    marginRight: 24,
  },
});

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.getMainContent = this.getMainContent.bind(this);
    this.getLeftDrawer = this.getLeftDrawer.bind(this);
    this.getRightDrawer = this.getRightDrawer.bind(this);
    this.getJobsTableComponent = this.getJobsTableComponent.bind(this);
    this.getWidgetsListComponent = this.getWidgetsListComponent.bind(this);
    this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
    this.getDefaultCase = this.getDefaultCase.bind(this);
    this.fetchJobsForCase = this.fetchJobsForCase.bind(this);
    this.fetchCdrForJob = this.fetchCdrForJob.bind(this);
  }

  state = {
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    activeWidget: 'Handset',
    selectedCaseJobsList: [],
    selectedJob: null,
    selectedJobCdrList: [],
    newJob: {
      id: -1,
      case: -1,
      category: 'IMSI',
      status: '',
      latitude: -1,
      longitude: -1,
      distance: -1,
      lac: -1,
      cellId: -1,
      startTime: new Date(),
      endTime: new Date(),
      query: '',
    },
    dataTableSelectedColumns: ['id', 'callingnumber', 'callednumber'],
    allCdrColumns: [],
  };

  render() {
    const { classes } = this.props;

    let leftDrawerSize = this.state.leftDrawerOpen ? 3 : 1;
    let rightDrawerSize = this.state.rightDrawerOpen ? 3 : 1;
    let mainContentSize = 12 - (leftDrawerSize + rightDrawerSize);

    let height = window.innerHeight;
    if (mainContentSize === 6) {
      height = window.innerHeight / 1.5;
    } else if (mainContentSize === 8) {
      height = window.innerHeight / 1.3;
    }

    return (
      <div>
        <Grid container>
          <Grid item md={leftDrawerSize}>
            {this.getLeftDrawer()}
          </Grid>
          <Grid item md={mainContentSize} style={{ padding: 16 }}>
            {this.state.selectedJob && this.getMainContent(height)}
          </Grid>
          <Grid item md={rightDrawerSize}>
            {this.getRightDrawer()}
          </Grid>
        </Grid>
      </div>
    );
  }

  getMainContent(height) {
    switch (this.state.activeWidget) {
      case 'Handset':
        return <HandsetHistoryContent />;
      case 'Map':
        return (
          <DataMapContent
            selectedJob={this.state.selectedJob}
            selectedJobCdrList={this.state.selectedJobCdrList}
          />
        );
      case 'Linktree':
        return (
          <LinkTreeContent
            height={height}
            selectedJob={this.state.selectedJob}
            selectedJobCdrList={this.state.selectedJobCdrList}
          />
        );
      default:
        return (
          <DataTableContent
            selectedJob={this.state.selectedJob}
            selectedJobCdrList={this.state.selectedJobCdrList}
            selectedColumns={this.state.dataTableSelectedColumns}
          />
        );
    }
  }

  getLeftDrawer() {
    const { classes } = this.props;

    let leftDrawerOpen = this.state.leftDrawerOpen;

    return (
      <div>
        <Paper className={classes.leftdrawer} elevation={4}>
          <div style={{ textAlign: 'right' }}>
            <IconButton
              onClick={() => this.setState({ leftDrawerOpen: !leftDrawerOpen })}
            >
              {leftDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          {leftDrawerOpen ? (
            <div style={{ padding: 8 }}>
              <ExpansionPanel className={classes.expansion} defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    component='h5'
                    variant='h5'
                    style={{ marginBottom: 32 }}
                  >
                    <b>Jobs</b>
                  </Typography>
                </ExpansionPanelSummary>
                {this.getJobsTableComponent()}
              </ExpansionPanel>
            </div>
          ) : (
            <div />
          )}

          {leftDrawerOpen ? (
            <div />
          ) : (
            <div
              style={{
                textAlign: 'center',
                marginTop: window.innerHeight / 5,
                paddingBottom: window.innerHeight / 3.2,
              }}
            >
              <span style={{ fontSize: 21, textAlign: 'center' }}>
                J<br />
                O<br />
                B<br />
                S<br />
              </span>
            </div>
          )}
        </Paper>
      </div>
    );
  }
  getJobsTableComponent() {
    const { classes } = this.props;

    return (
      <MaterialTable
        icons={tableIcons}
        style={{ marginTop: 32, marginRight: 16 }}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          grouping: false,
          exportButton: false,
          paging: true,
          rowStyle: (rowData) => ({
            backgroundColor:
              this.state.selectedJob.id === rowData.id ? '#EEE' : '#FFF',
          }),
        }}
        columns={[
          {
            title: 'ID',
            field: 'id',
            type: 'numeric',
            align: 'left',
            width: 8,
          },
          { title: 'Category', field: 'category' },
          {
            title: 'Query',
            field: 'query',
            render: (rowData) => {
              let jobCategory = rowData['category'];
              let resultantHtmlElement = null;
              if (jobCategory === 'Location') {
                let queryArr = rowData['query'].split(',');
                resultantHtmlElement = (
                  <span>
                    <b>Latitude: </b>
                    {queryArr[0]}
                    <br />
                    <b>Longitude: </b>
                    {queryArr[1]}
                    <br />
                    <b>Distance: </b>
                    {queryArr[2]}
                    <br />
                  </span>
                );
              } else if (jobCategory === 'LAC/Cell-ID') {
                let queryArr = rowData['query'].split(',');
                resultantHtmlElement = (
                  <span>
                    <b>LAC: </b>
                    {queryArr[0]}
                    <br />
                    <b>Cell-ID: </b>
                    {queryArr[1]}
                    <br />
                    <b>Distance: </b>
                    {queryArr[2]}
                    <br />
                  </span>
                );
              } else resultantHtmlElement = rowData['query'];
              return resultantHtmlElement;
            },
          },
          {
            title: 'Start Time',
            field: 'startTime',
            align: 'center',
            render: (rowData) => moment(rowData['startTime']).format('L'),
          },
          {
            title: 'End Time',
            field: 'endTime',
            align: 'center',
            render: (rowData) => moment(rowData['endTime']).format('L'),
          },
        ]}
        data={this.state.selectedCaseJobsList}
        title=''
        onRowClick={(event, selectedRow) => this.fetchCdrForJob(selectedRow)}
      />
    );
  }

  getRightDrawer() {
    const { classes } = this.props;

    let rightDrawerOpen = this.state.rightDrawerOpen;

    return (
      <div>
        <Paper className={classes.rightdrawer} elevation={4}>
          <div style={{ textAlign: 'left' }}>
            <IconButton
              onClick={() =>
                this.setState({ rightDrawerOpen: !rightDrawerOpen })
              }
            >
              {rightDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>

          {rightDrawerOpen ? (
            <div style={{ padding: 16 }}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    component='h5'
                    variant='h5'
                    style={{ marginBottom: 32 }}
                  >
                    <b>Query</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.state.activeWidget === 'Handset' ? (
                    <HandsetHistoryQuery />
                  ) : (
                    <div />
                  )}

                  {this.state.activeWidget === 'Map' ? (
                    <DataMapQuery />
                  ) : (
                    <div />
                  )}

                  {this.state.activeWidget === 'Linktree' ? (
                    <LinkTreeQuery />
                  ) : (
                    <div />
                  )}

                  {this.state.activeWidget === 'Table' ? (
                    <DataTableQuery
                      allColumns={this.state.allCdrColumns}
                      selectedColumns={this.state.dataTableSelectedColumns}
                      onChange={(event, newVal) =>
                        this.setState({ dataTableSelectedColumns: newVal })
                      }
                    />
                  ) : (
                    <div />
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    component='h5'
                    variant='h5'
                    style={{ marginBottom: 24, marginTop: 32 }}
                  >
                    <b>Widgets</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.getWidgetsListComponent()}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ) : (
            <div />
          )}

          {rightDrawerOpen ? (
            <div />
          ) : (
            <div
              style={{
                textAlign: 'center',
                marginTop: window.innerHeight / 7,
                paddingBottom: window.innerHeight / 5.8,
              }}
            >
              <span style={{ fontSize: 21, textAlign: 'center' }}>
                W<br />
                I<br />
                D<br />
                G<br />
                E<br />
                T<br />
                S<br />
              </span>
            </div>
          )}
        </Paper>
      </div>
    );
  }

  getWidgetsListComponent() {
    const { classes } = this.props;

    return (
      <Grid container spacing={4}>
        <Grid item md={2} className={classes.widgetListItem}>
          <IconButton
            onClick={() => this.setState({ activeWidget: 'Handset' })}
          >
            <Timeline />
          </IconButton>
          <br />
          Handset History
        </Grid>

        <Grid item md={2} className={classes.widgetListItem}>
          <IconButton onClick={() => this.setState({ activeWidget: 'Map' })}>
            <Map />
          </IconButton>
          <br />
          Map
        </Grid>

        <Grid item md={2} className={classes.widgetListItem}>
          <IconButton
            onClick={() => this.setState({ activeWidget: 'Linktree' })}
          >
            <People />
          </IconButton>
          <br />
          Linktree
        </Grid>

        <Grid item md={2} className={classes.widgetListItem}>
          <IconButton onClick={() => this.setState({ activeWidget: 'Table' })}>
            <TableChart />
          </IconButton>
          <br />
          Table
        </Grid>
      </Grid>
    );
  }

  async componentDidMount() {
    const { selectedCase } = this.props;

    await this.getAllCdrColumns();
    await this.getDefaultCase();
    //await this.fetchCdrForJob(this.state.selectedJob);
  }

  async getAllCdrColumns() {
    try {
      const apiEndpoint = apiHost + '/cdr/columns/';
      let response = await axios.get(apiEndpoint);
      response = response.data;
      this.setState({ allCdrColumns: response });
    } catch (error) {
      console.log(error);
    }
  }

  async getDefaultCase() {
    try {
      const apiEndpoint = apiHost + '/cases/';
      let response = await axios.get(apiEndpoint);
      response = response.data;
      response.every(async (caseItem, index) => {
        let caseName = caseItem['name'];
        if (caseName === 'DEFAULT_CASE_CHECK_OT') {
          this.setState({ selectedCase: caseItem });
          await this.fetchJobsForCase(caseItem);
          return false;
        }
        return true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchJobsForCase(selectedCase) {
    try {
      this.setState({ selectedCase: selectedCase });
      const apiEndpoint = apiHost + '/jobs/?case=' + selectedCase.id;
      let response = await axios.get(apiEndpoint);
      response = response.data;
      response = response.filter(
        (jobItem, index) => jobItem['status'] === 'FINISHED'
      );
      this.setState({
        selectedCaseJobsList: response,
        selectedJob: response[0],
      });
      await this.fetchCdrForJob(response[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async onDeleteButtonPress(rowData) {
    try {
      const apiEndpoint = apiHost + '/jobs/' + rowData.id + '/';
      let response = await axios.delete(apiEndpoint);
      response = response.data;
      this.resetToDefault();
      this.fetchJobsForCase(this.state.selectedCase);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchCdrForJob(selectedJob) {
    this.setState({ selectedJob: selectedJob });
    let selectedJobCdrList = [];
    try {
      let apiEndpoint = apiHost + '/cdr/?job=' + selectedJob.id;
      let response = await axios.get(apiEndpoint);
      response = response.data;
      let currentPage = response['current'];
      let totalPages = response['total_pages'];
      let results = response['results'];
      selectedJobCdrList = selectedJobCdrList.concat(results);
      if (currentPage < totalPages) {
        for (let i = currentPage + 1; i <= totalPages; i++) {
          apiEndpoint = `${apiHost}/cdr/?job=${selectedJob.id}&page=${i}`;
          response = await axios.get(apiEndpoint);
          response = response.data;
          results = response['results'];
          selectedJobCdrList = selectedJobCdrList.concat(results);
        }
      }
      this.setState({ selectedJobCdrList: selectedJobCdrList });
    } catch (error) {
      console.log(error);
    }
  }
}

export default withStyles(styles)(Reports);
