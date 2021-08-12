import React from 'react';
import { useParams } from 'react-router';
import Layout from '../components/shared/Layout';

interface Params {
  deckId: string;
}

const DeckOverviewPage: React.FC = () => {
  const { deckId } = useParams<Params>();

  return <Layout></Layout>;
};

export default DeckOverviewPage;
