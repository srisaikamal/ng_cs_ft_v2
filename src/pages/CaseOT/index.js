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
                    style={{ backgroundColor: '#3f51b5' }}
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
