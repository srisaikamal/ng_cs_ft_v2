import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography, withStyles
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React from "react";
// Local
import { apiHost } from "../../config";

const styles = (theme) => ({
  paper: {
    flex: 1,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
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
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">

        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>

          <Typography component="h1" variant="h4">
            Sign In
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            onChange={event => this.setState({ email: event.target.value, error: null })}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={event => this.setState({ password: event.target.value, error: null })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onSignInButtonPress}
          >
            <b>Sign In</b>
          </Button>

          {
            this.state.error && <Alert severity="error">{this.state.error}</Alert>
          }
        </div>
      </Container>
    );
  }

  async onSignInButtonPress() {
    const email = this.state.email;
    const password = this.state.password;

    const requestBody = {
      'operation': 'login',
      'username': email,
      'password': password,
    };
    const apiEndpoint = apiHost + '/auth/';

    try {
      let response = await axios.post(apiEndpoint, requestBody);
      response = response.data;
      let accessToken = response['token'];
      axios.defaults.headers.common['Authorization'] = `Token ${accessToken}`;
      window.location = '/landing';
      // console.log('[onSignInButtonPress] : ' + JSON.stringify(response));
    } catch (error) {
      let errorMessage = JSON.stringify(error.response.data['error']);
      this.setState({ error: errorMessage });
    }
  }
}

export default withStyles(styles)(SignIn);
