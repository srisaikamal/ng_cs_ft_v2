import React from "react";
import {
  withStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

const styles = (theme) => ({
  paper: {
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
            onChange={event => this.setState({ email: event.target.value })}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={event => this.setState({ password: event.target.value })}
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

        </div>
      </Container>
    );
  }

  async onSignInButtonPress() {
    const email = this.state.email;
    const password = this.state.password;

    window.location = '/landing/';
  }
}

export default withStyles(styles)(SignIn);
