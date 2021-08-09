import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/login';

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

export interface LoginInputs {
  username: string;
  password: string;
}

interface Props {
  setInputsCallback: React.Dispatch<React.SetStateAction<LoginInputs>>;
}

const LoginForm: React.FC<Props> = ({ setInputsCallback }) => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInputs> = setInputsCallback;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.formHeader}>
        Log in
      </Typography>
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
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
