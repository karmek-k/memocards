import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Deck from '../../interfaces/Deck';

interface Props {
  deck: Deck;
}

const DeckItem: React.FC<Props> = ({ deck }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`deck-${deck.id}`}
        id={`deck-${deck.id}`}
      >
        <Typography>{deck.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {deck.description && <i>No description given.</i>}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeckItem;
