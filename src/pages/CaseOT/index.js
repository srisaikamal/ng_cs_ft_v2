import React from 'react';
import {
    withStyles,
    Tabs,
    Tab,
} from '@material-ui/core';
import {
    Home,
    ExitToApp,
} from '@material-ui/icons';
// Local
import CustomAppBar from '../../components/CustomAppBar';
import Cases from './Cases';
import CaseIntel from './CaseIntel';

const styles = (theme) => ({
    tabs: {
        backgroundColor: theme.palette.primary.main,
    }
});

class CaseOT extends React.Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    state = {
        activeTab: 'Cases',
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                {this.getContent()}
            </div>
        );
    }

    getHeader() {
        const {
            classes
        } = this.props;

        return (
            <div>
                <CustomAppBar
                    title='Case OT'
                    leadingIcon={<Home />}
                    onLeadingIconPress={() => window.location = '/landing'}
                    trailingIcon={<ExitToApp />}
                    onTrailingIconPress={() => window.location = '/'}
                />
                <Tabs
                    className={classes.tabs}
                    variant='fullWidth'
                    centered
                    value={this.state.activeTab}
                    onChange={(event, newVal) => this.setState({ activeTab: newVal })}
                >
                    <Tab label={<b style={{ color: 'white' }}>Cases</b>} value='Cases' />
                    <Tab label={<b style={{ color: 'white' }}>Case Intel</b>} value='Case-Intel' />
                </Tabs>
            </div>
        );
    }

    getContent() {
        return (
            <div>
                {this.state.activeTab === 'Cases' ? <Cases /> : <div />}
                {this.state.activeTab === 'Case-Intel' ? <CaseIntel /> : <div />}
            </div>
        );
    }
};

export default withStyles(styles)(CaseOT);
