import {
    withStyles,
    Slide,
    Paper,
    Grid,
    Card,
    CardContent,
    IconButton,
    Typography,
    Chip,
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
import MaterialTable from "material-table";
// Local


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

const styles = theme => ({
    chip: {
        margin: theme.spacing(0.5),
    },
});

function convertObjectKeyToTableColumnObject(arr) {
    let resultsArr = [];
    arr.forEach(element => {
        let obj = {
            field: element,
            title: element
        }
        resultsArr.push(obj);
    });
    return resultsArr;
}

class DataTable extends React.PureComponent {
    render() {
        const {
            classes,
            tableData,
            selectedColumns,
        } = this.props;

        return (
            <div>
                <MaterialTable
                    icons={tableIcons}
                    components={{
                        Container: props => <Paper {...props} elevation={0} />
                    }}
                    options={{
                        grouping: true,
                        exportButton: true,
                        paging: false,
                    }}
                    columns={convertObjectKeyToTableColumnObject(selectedColumns)}
                    data={tableData}
                    title='Data Table'
                />
            </div>
        );
    }
}

export default withStyles(styles)(DataTable);
