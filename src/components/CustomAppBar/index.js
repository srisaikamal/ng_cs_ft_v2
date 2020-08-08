import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import axios from 'axios';
import React from 'react';

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
});

class CustomAppBar extends React.PureComponent {
  render() {
    const {
      classes,
      title,
      trailingIcon,
      onTrailingIconPress,
      leadingIcon,
      onLeadingIconPress,
    } = this.props;

    return (
      <AppBar position='static'>
        <Toolbar>
          {leadingIcon ? (
            <IconButton
              onClick={onLeadingIconPress}
              edge='start'
              color='inherit'
            >
              {leadingIcon}
            </IconButton>
          ) : (
            <div />
          )}

          <Typography variant='h6' className={classes.title}></Typography>

          <IconButton
            onClick={() => {
              localStorage.removeItem('current_account');
              delete axios.defaults.headers.common['Authorization'];
              window.location = '/';
            }}
            edge='start'
            color='inherit'
          >
            {trailingIcon}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
