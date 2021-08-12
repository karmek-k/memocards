import { useQuery } from 'react-query';
import { getRequestFactory } from '../../functions/requestFactories';
import Deck from '../../interfaces/Deck';
import useJwt from '../useJwt';

const useDeck = (deckId: number) => {
  const { data, isError, isLoading } = useQuery(
    ['deck', deckId],
    getRequestFactory<Deck>(`/deck/${deckId}`, useJwt())
  );

  if (isLoading) {
    return null;
  }

  if (isError) {
    throw new Error();
  }

  return data;
};

export default useDeck;
