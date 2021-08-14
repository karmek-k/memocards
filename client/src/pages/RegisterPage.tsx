import { Container } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm, {
  RegisterInputs
} from '../components/register/RegisterForm';
import Layout from '../components/shared/Layout';
import useLoggedIn from '../hooks/useLoggedIn';

const RegisterPage: React.FC = () => {
  const [inputs, setInputs] = useState<RegisterInputs>({
    username: '',
    password: ''
  });

  const loggedIn = useLoggedIn();

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout>
      <Container maxWidth="sm">
        <RegisterForm setInputsCallback={setInputs} />
      </Container>
    </Layout>
  );
};

export default RegisterPage;
