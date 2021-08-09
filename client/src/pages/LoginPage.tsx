import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import LoginForm, { LoginInputs } from '../components/login/LoginForm';
import Layout from '../components/shared/Layout';
import login from '../functions/login';
import { useAppDispatch } from '../hooks/redux';
import userSlice from '../redux/slices/userSlice';

const LoginPage: React.FC = () => {
  const [inputs, setInputs] = useState<LoginInputs>({
    username: '',
    password: ''
  });
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

  return (
    <Layout>
      <Container maxWidth="sm">
        <LoginForm
          setInputsCallback={setInputs}
          loggingIn={loggingIn}
          error={error}
        />
      </Container>
    </Layout>
  );
};

export default LoginPage;
