import {
  Paper,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/user';
import useStyles from '../shared/styles/form';

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
      <Typography className={classes.centerText + ' ' + classes.marginTop}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register">
          Click here to register.
        </Link>
      </Typography>
      {props.loggingIn && <LinearProgress className={classes.marginTop} />}
    </Paper>
  );
};

export default LoginForm;
