import React from 'react';
import {
    withStyles,
    TextField
} from '@material-ui/core';
import {
    Autocomplete
} from '@material-ui/lab';

const styles = theme => ({

});

class LinkTree extends React.PureComponent {
    render() {
        const {
            classes,
            allColumns,
            selectedColumns,
            onChange,
        } = this.props;

        return (
            <div>
                <Autocomplete
                    style={{ marginTop: 16 }}
                    multiple
                    options={allColumns}
                    getOptionLabel={(option) => option}
                    value={selectedColumns}
                    onChange={onChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Users"
                        />
                    )}
                />
            </div>
        );
    }
};

export default withStyles(styles)(LinkTree);
