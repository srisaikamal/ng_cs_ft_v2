import { colors, Paper, withStyles } from '@material-ui/core';
import {
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
} from '@material-ui/icons';
import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';
import moment from 'moment';
// Local
import { apiHost } from '../../../../../config';

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
});

function convertObjectKeyToTableColumnObject(arr, tableData) {
  let resultsArr = [];
  arr.forEach((columnName) => {
    let lookUpMap = {};

    tableData.forEach((row) => {
      let val = row[columnName];
      lookUpMap[val] = val;
    });

    let obj = {
      field: columnName,
      title: columnName,
      lookup: lookUpMap,
      headerStyle: {
        //backgroundColor: colors.orange[500],
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
      },
    };

    if (columnName === 'id') {
      obj['cellStyle'] = {
        //backgroundColor: colors.orange[500],
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
      };
    }

    resultsArr.push(obj);
  });
  return resultsArr;
}

class DataTable extends React.PureComponent {
  state = {
    tableData: [],
  };

  render() {
    const {
      classes,
      selectedJob,
      selectedJobCdrList,
      selectedColumns,
    } = this.props;

    let title = `${selectedJob['category']} `;
    if (selectedJob['category'] === 'Location') {
      let valuesArr = selectedJob['query'].split(',');
      let tempString = `Lat: ${valuesArr[0]}, Long: ${valuesArr[1]}, Dist: ${valuesArr[2]}`;
      title += tempString;
    } else if (selectedJob['category'] === 'LAC/Cell-ID') {
      let valuesArr = selectedJob['query'].split(',');
      let tempString = `LAC: ${valuesArr[0]}, Cell-ID: ${valuesArr[1]}, Dist: ${valuesArr[2]}`;
      title += tempString;
    } else {
      title += selectedJob['query'];
    }

    return (
      <div>
        <MaterialTable
          icons={tableIcons}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          options={{
            grouping: true,
            exportButton: true,
            paging: true,
            filtering: true,
            search: true,
          }}
          columns={convertObjectKeyToTableColumnObject(
            selectedColumns,
            selectedJobCdrList
          )}
          title='Table Data'
          data={selectedJobCdrList}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DataTable);
