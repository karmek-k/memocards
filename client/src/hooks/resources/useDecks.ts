import { useQuery } from 'react-query';
import useJwt from '../useJwt';
import { getRequestFactory } from '../../functions/requestFactories';
import Deck from '../../interfaces/Deck';

const useDecks = () => {
  const { data, isError, isLoading } = useQuery(
    'decks',
    getRequestFactory<Deck[]>('/deck', useJwt())
  );

  if (isLoading) {
    return null;
  }

  if (isError) {
    throw new Error();
  }

  return data ?? [];
};

export default useDecks;
