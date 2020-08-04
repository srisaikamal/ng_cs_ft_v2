import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  withStyles,
  Card,
  CardContent,
} from '@material-ui/core';

import { LockOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React from 'react';
// Local
import { apiHost } from '../../config';
import Background from '../../assets/images/bg.jpeg';
const styles = (theme) => ({
  paper: {
    flex: 1,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
  card: {
    minWidth: 275,
  },
  container: {
    marginTop: 100,
    marginLeft: 500,
    //position: 'absolute',
  },

  root: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);
  }

  state = {
    email: '',
    password: '',
    error: null,
    loading: false,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Container component='main' maxWidth='xs' className={classes.container}>
          <CssBaseline />
          <Card className={classes.card} variant='outlined'>
            <CardContent>
              <div className={classes.paper}>
                <Typography component='h1' variant='h4'>
                  Sign In
                </Typography>

                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Email Address'
                  autoFocus
                  onChange={(event) =>
                    this.setState({ email: event.target.value, error: null })
                  }
                />

                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Password'
                  type='password'
                  onChange={(event) =>
                    this.setState({ password: event.target.value, error: null })
                  }
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={this.onSignInButtonPress}
                >
                  <b>Sign In</b>
                </Button>

                {this.state.error && (
                  <Alert severity='error'>{this.state.error}</Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  async onSignInButtonPress() {
    const email = this.state.email;
    const password = this.state.password;

    const requestBody = {
      operation: 'login',
      username: email,
      password: password,
    };
    const apiEndpoint = apiHost + '/auth/';

    try {
      let response = await axios.post(apiEndpoint, requestBody);
      response = response.data;
      let accessToken = response['token'];
      axios.defaults.headers.common['Authorization'] = `Token ${accessToken}`;
      localStorage.setItem('current_account', JSON.stringify(response));
      window.location = '/landing';
      // console.log('[onSignInButtonPress] : ' + JSON.stringify(response));
    } catch (error) {
      let errorMessage = JSON.stringify(error.response);
      this.setState({ error: 'Invalid Credentials' });
    }
  }
}

export default withStyles(styles)(SignIn);
