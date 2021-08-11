import Deck from '../../interfaces/Deck';
import axios from 'axios';
import { useQuery } from 'react-query';
import useJwt from '../useJwt';

const getDecks = (jwt: string) => {
  return () => {
    return axios
      .get<Deck[]>('/deck', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => res.data);
  };
};

const useDecks = () => {
  const jwt = useJwt() ?? '';

  const { data, isError, isLoading } = useQuery('decks', getDecks(jwt));

  if (isLoading) {
    return null;
  }

  if (isError) {
    throw new Error();
  }

  return data ?? [];
};

export default useDecks;
