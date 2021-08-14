import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userSchema } from '../../schemas/user';
import useStyles from '../shared/styles/form';

export interface RegisterInputs {
  username: string;
  password: string;
}

interface Props {
  setInputsCallback: React.Dispatch<React.SetStateAction<RegisterInputs>>;
  registering: boolean;
  error: boolean;
}

const RegisterForm: React.FC<Props> = props => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<RegisterInputs>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit: SubmitHandler<RegisterInputs> = props.setInputsCallback;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.centerText}>
        Register
      </Typography>
      {props.error && (
        <Typography
          variant="body1"
          color="error"
          className={classes.centerText}
        >
          There was an error while registering. Please pick a different
          username.
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
          disabled={props.registering}
          className={classes.marginTop}
        >
          Submit
        </Button>
      </form>
      <Typography className={classes.centerText + ' ' + classes.marginTop}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Log in instead.
        </Link>
      </Typography>
      {props.registering && <LinearProgress className={classes.marginTop} />}
    </Paper>
  );
};

export default RegisterForm;
