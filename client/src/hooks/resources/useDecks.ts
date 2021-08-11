import Deck from '../../interfaces/Deck';

const useDecks = () => {
  const mockDeck: Deck = {
    id: 1,
    name: 'Mock Deck',
    description: 'Example description',
    private: true
  };

  return [mockDeck];
};

export default useDecks;
