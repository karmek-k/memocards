import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Link
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Deck from '../../interfaces/Deck';
import { Link as RouterLink } from 'react-router-dom';

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
          {deck.description ?? <i>No description given.</i>}
        </Typography>
        <Typography>
          <Link component={RouterLink} to={`/deck/${deck.id}`}>
            Deck overview
          </Link>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeckItem;
