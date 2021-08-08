import { Container, Link, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/shared/Layout';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Layout>
      <Container>
        <Typography variant="h3">Page not found</Typography>
        <Link component={RouterLink} to="/">
          Go to the home page?
        </Link>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
