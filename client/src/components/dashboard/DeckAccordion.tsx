import { Typography } from '@material-ui/core';
import React from 'react';
import Deck from '../../interfaces/Deck';
import DeckItem from './DeckItem';

interface Props {
  decks: Deck[];
}

const DeckAccordion: React.FC<Props> = ({ decks }) => {
  if (decks.length === 0) {
    return <Typography>No decks</Typography>;
  }

  return (
    <>
      {decks.map(deck => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </>
  );
};

export default DeckAccordion;
