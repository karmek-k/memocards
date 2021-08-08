import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

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

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.formHeader}>
        Log in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
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
