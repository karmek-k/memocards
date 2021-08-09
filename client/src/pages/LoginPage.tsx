import { Container } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import LoginForm, { LoginInputs } from '../components/login/LoginForm';
import Layout from '../components/shared/Layout';

const LoginPage: React.FC = () => {
  const [inputs, setInputs] = useState<LoginInputs>({
    username: '',
    password: ''
  });

  return (
    <Layout>
      <Container maxWidth="sm">
        <LoginForm setInputsCallback={setInputs} />
      </Container>
    </Layout>
  );
};

export default LoginPage;
