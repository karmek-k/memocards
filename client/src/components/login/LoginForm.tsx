import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  LinearProgress
} from '@material-ui/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/login';

const useStyles = makeStyles({
  paper: {
    padding: '2rem'
  },
  centerText: {
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  marginTop: {
    marginTop: '1.5rem'
  }
});

export interface LoginInputs {
  username: string;
  password: string;
}

interface Props {
  setInputsCallback: React.Dispatch<React.SetStateAction<LoginInputs>>;
  loggingIn: boolean;
  error: boolean;
}

const LoginForm: React.FC<Props> = props => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInputs> = props.setInputsCallback;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.centerText}>
        Log in
      </Typography>
      {props.error && (
        <Typography
          variant="body1"
          color="error"
          className={classes.centerText}
        >
          There was an error while logging in. Please check your credentials.
        </Typography>
      )}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register('username')}
        />
        <TextField
          type="password"
          error={!!errors.password}
          label="Password"
          helperText={errors.password?.message}
          {...register('password')}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={props.loggingIn}
          className={classes.marginTop}
        >
          Submit
        </Button>
      </form>
      {props.loggingIn && <LinearProgress className={classes.marginTop} />}
    </Paper>
  );
};

export default LoginForm;
