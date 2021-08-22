import { Container, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/shared/Layout';

const ReviewPage: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography>Review page</Typography>
      </Container>
    </Layout>
  );
};

export default ReviewPage;
