import { Container } from '@material-ui/core';
import React from 'react';
import LoginForm from '../components/login/LoginForm';
import Layout from '../components/shared/Layout';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default LoginPage;
