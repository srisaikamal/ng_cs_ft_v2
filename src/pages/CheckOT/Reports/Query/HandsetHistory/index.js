import React from 'react';
import { withStyles, TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import {} from '@material-ui/lab';

const styles = (theme) => ({});

class HandsetHistory extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <TextField
          fullWidth
          label='Enter MSISDN'
          defaultValue='9867543287'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(HandsetHistory);
