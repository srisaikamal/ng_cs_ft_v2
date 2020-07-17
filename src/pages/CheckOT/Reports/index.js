import {
    Drawer,
    withStyles
} from '@material-ui/core';
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
    ViewColumn
} from '@material-ui/icons';
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


class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.getDrawer = this.getDrawer.bind(this);
    }

    state = {
        drawerOpen: false,
        tableData: [
            {
                id: 1,
                name: 'Bomb blast at Place X',
                description: 'Sample description',
                category: 'Bomb Blast',
                status: 'Open',
                users: ['Abhishek', 'Darshan'],
            },
            {
                id: 2,
                name: 'Robbery at Place X',
                description: 'Sample description',
                category: 'Robbery',
                status: 'Open',
                users: ['Srikanth'],
            },
            {
                id: 3,
                name: 'Bomb blast at Place X',
                description: 'Sample description',
                category: 'Bomb Blast',
                status: 'Close',
                users: ['Abhishek', 'Darshan'],
            },
            {
                id: 4,
                name: 'Robbery at Place X',
                description: 'Sample description',
                category: 'Robbery',
                status: 'Close',
                users: ['Srikanth'],
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
                    })
                }
            >
            </Drawer>
        );
    }
};

export default withStyles(styles)(Reports);
