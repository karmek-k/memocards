import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/shared/Layout';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    margin: '1.5rem 0',
    textAlign: 'center'
  },
  button: {
    borderRadius: 87,
    padding: '1.5rem 5rem',
    margin: '0 1.5rem'
  },
  buttonContainer: {
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'row'
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
        <div className={classes.buttonContainer}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            className={classes.button}
          >
            Get started
          </Button>
          <Button
            size="large"
            variant="outlined"
            component={Link}
            to="/login"
            className={classes.button}
          >
            Log in
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
