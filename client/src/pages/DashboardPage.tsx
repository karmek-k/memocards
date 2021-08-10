import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import React from 'react';
import Layout from '../components/shared/Layout';

const useStyles = makeStyles({
  centeredText: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  decksPaper: {
    padding: '1.25rem'
  },
  overviewHeader: {
    paddingTop: '1.25rem'
  },
  overviewText: {
    lineHeight: '2rem'
  }
});

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <Typography variant="h1" className={classes.centeredText}>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <Typography
              variant="h3"
              className={classes.centeredText + ' ' + classes.overviewHeader}
            >
              Overview
            </Typography>
            <Typography variant="body1" className={classes.overviewText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
              minima officiis quam, distinctio delectus inventore sunt!
              Obcaecati dolor maiores rem possimus, similique fugiat, qui
              numquam molestiae ipsum nulla nihil optio. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Magnam minima officiis quam,
              distinctio delectus inventore sunt! Obcaecati dolor maiores rem
              possimus, similique fugiat, qui numquam molestiae ipsum nulla
              nihil optio.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.decksPaper}>
              <Typography variant="h3" className={classes.centeredText}>
                Decks
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
