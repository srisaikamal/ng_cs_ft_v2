import React from 'react';
import {
  withStyles,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import {} from '@material-ui/lab';

const styles = (theme) => ({});

class HandsetHistory extends React.PureComponent {
  render() {
    let id = 0;
    const { classes } = this.props;
    function createData(name, calories) {
      id += 1;
      return { id, name, calories };
    }
    const rows = [
      createData('9800987675', 7786543876),
      createData('9800987675', 1234567890),
      createData('7786543876', 1234567890),
      createData('9800987675', 2222222222),
      createData('2222222222', 7786543876),
      createData('1234567890', 1111111111),
    ];

    return (
      <div>
        {/*  <TextField
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
        */}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Calling Number</TableCell>
                <TableCell>Called Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.calories}</TableCell>
                  <TableCell align='right'>{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(HandsetHistory);
