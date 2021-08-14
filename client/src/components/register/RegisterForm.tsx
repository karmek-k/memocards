import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  LinearProgress,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { userSchema } from '../../schemas/user';
import useStyles from '../shared/styles/form';

export interface RegisterInputs {
  username: string;
  password: string;
}

interface Props {
  setInputsCallback: React.Dispatch<React.SetStateAction<RegisterInputs>>;
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

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.centerText}>
        Register
      </Typography>
      {/* {props.error && (
        <Typography
          variant="body1"
          color="error"
          className={classes.centerText}
        >
          There was an error while logging in. Please check your credentials.
        </Typography>
      )} */}
      <form className={classes.form} onSubmit={handleSubmit(console.log)}>
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
          // disabled={props.loggingIn}
          className={classes.marginTop}
        >
          Submit
        </Button>
      </form>
      {/* {props.loggingIn && <LinearProgress className={classes.marginTop} />} */}
    </Paper>
  );
};

export default RegisterForm;
