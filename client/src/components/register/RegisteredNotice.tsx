import { Container, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const RegisteredNotice: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3">
        You have been successfully registered
      </Typography>
      <Typography>
        Go to the{' '}
        <Link component={RouterLink} to="/login">
          login page.
        </Link>
      </Typography>
    </Container>
  );
};

export default RegisteredNotice;
