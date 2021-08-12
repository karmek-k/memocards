import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import Layout from '../components/shared/Layout';
import useDeck from '../hooks/resources/useDeck';

interface Params {
  deckId: string;
}

const DeckOverviewPage: React.FC = () => {
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
      <p>{Object.keys(deck)}</p>
    </Layout>
  );
};

export default DeckOverviewPage;
