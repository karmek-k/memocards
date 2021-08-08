import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/shared/Layout';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.75rem'
  },
  text: {
    margin: '1.5rem 0',
    textAlign: 'center'
  },
  button: {
    borderRadius: 87,
    padding: '1.5rem 5rem',
    marginTop: '3rem'
  }
});

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.container}>
        <Typography variant="h1" className={classes.text}>
          Learn things the smart way.
        </Typography>
        <Typography variant="h4" className={classes.text}>
          Vel mollitia perspiciatis neque eaque commodi qui. Voluptas nihil ad
          maiores. Animi quisquam in iste sit debitis at.
        </Typography>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Get started
        </Button>
      </Container>
    </Layout>
  );
};

export default IndexPage;
