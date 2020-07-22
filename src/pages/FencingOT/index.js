import React from 'react';
import { forwardRef } from 'react';
import {
    withStyles,
    Tabs,
    Tab,
    Chip,
} from '@material-ui/core';
import {
    Home,
    ExitToApp,
    AddBox,
    Clear,
    DeleteOutline,
    ChevronLeft,
    ChevronRight,
    Edit,
    Remove,
    ViewColumn,
    SaveAlt,
    FilterList,
    ArrowDownward,
    Check,
    FirstPage,
    LastPage,
    Search,
} from '@material-ui/icons';
import MaterialTable from "material-table";
// Local
import CustomAppBar from '../../components/CustomAppBar';
import Cases from './Cases';
import Reports from './Reports';

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

class FencingOT extends React.Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    state = {
        activeTab: 'Cases',
        selectedCase: {
            id: -1,
            name: '',
            description: '',
            category: '',
            status: '',
            users: [],
        }
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                {
                    this.getContent()
                }
            </div>
        );
    }

    getHeader() {
        let casesTabTitle = 'Cases';
        if (this.state.selectedCase.id !== -1) {
            casesTabTitle += ` <${this.state.selectedCase.name}>`;
        }


        return (
            <div>
                <CustomAppBar
                    title='Fencing OT'
                    leadingIcon={<Home />}
                    onLeadingIconPress={() => window.location = '/landing'}
                    trailingIcon={<ExitToApp />}
                    onTrailingIconPress={() => window.location = '/'}
                />
                <Tabs
                    style={{ backgroundColor: '#3f51b5' }}
                    variant='fullWidth'
                    centered
                    value={this.state.activeTab}
                    onChange={(event, newVal) => this.setState({ activeTab: newVal })}
                >
                    <Tab label={<b style={{ color: 'white' }}>{casesTabTitle}</b>} value='Cases' />
                    {
                        this.state.selectedCase.id !== -1 ?
                            <Tab label={<b style={{ color: 'white' }}>Reports</b>} value='Reports' />
                            : <div />
                    }
                </Tabs>
            </div>
        );
    }

    getContent() {
        switch (this.state.activeTab) {
            case 'Cases':
                return <Cases
                    selectedCase={this.state.selectedCase}
                    onRowSelect={(event, selectedRow) => this.setState({ selectedCase: selectedRow, })}
                />;
            default:
                return <Reports
                    selectedCase={this.state.selectedCase}
                />;
        }
    }
};

export default withStyles(styles)(FencingOT);
