import {
  CircularProgress,
  Container,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import Layout from '../components/shared/Layout';
import useDeck from '../hooks/resources/useDeck';

interface Params {
  deckId: string;
}

const useStyles = makeStyles({
  textCentered: {
    textAlign: 'center'
  }
});

const DeckOverviewPage: React.FC = () => {
  const classes = useStyles();

  const { deckId } = useParams<Params>();
  const deck = useDeck(Number.parseInt(deckId));

  if (!deck) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className={classes.textCentered}>
        <Typography variant="h3">{deck.name}</Typography>
        <Typography variant="subtitle1">
          Created by {deck.author?.username ?? 'Unknown User'}
        </Typography>
      </Container>
    </Layout>
  );
};

export default DeckOverviewPage;
