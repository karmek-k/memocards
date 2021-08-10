import { Container } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm, { LoginInputs } from '../components/login/LoginForm';
import Layout from '../components/shared/Layout';
import useLoggedIn from '../hooks/useLoggedIn';
import useLogin from '../hooks/useLogin';

const LoginPage: React.FC = () => {
  const [inputs, setInputs] = useState<LoginInputs>({
    username: '',
    password: ''
  });

  const { loggingIn, error } = useLogin(inputs);
  const loggedIn = useLoggedIn();

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

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
