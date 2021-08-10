import { useEffect, useState } from 'react';
import { LoginInputs } from '../components/login/LoginForm';
import login from '../functions/login';
import userSlice from '../redux/slices/userSlice';
import { useAppDispatch } from './redux';

const useLogin = (inputs: LoginInputs) => {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!inputs.username || !inputs.password) {
      return;
    }

    setLoggingIn(true);
    setError(false);
    login(inputs)
      .then(jwt => dispatch(userSlice.login(jwt)))
      .catch(() => setError(true))
      .finally(() => setLoggingIn(false));
  }, [inputs, dispatch]);

  return {
    loggingIn,
    error
  };
};

export default useLogin;
