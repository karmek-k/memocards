import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  paper: {
    padding: '2rem'
  },
  formHeader: {
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: '1.5rem'
  }
});

const LoginForm: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.formHeader}>
        Log in
      </Typography>
      <form className={classes.form} onSubmit={console.log}>
        <TextField name="username" label="Username" />
        <TextField name="password" type="password" label="Password" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
