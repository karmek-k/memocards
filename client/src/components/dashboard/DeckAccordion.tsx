import React from 'react';
import Deck from '../../interfaces/Deck';
import DeckItem from './DeckItem';

interface Props {
  decks: Deck[];
}

const DeckAccordion: React.FC<Props> = ({ decks }) => {
  return (
    <>
      {decks.map(deck => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </>
  );
};

export default DeckAccordion;
