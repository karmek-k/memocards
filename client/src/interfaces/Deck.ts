import User from './User';

interface Deck {
  id: number;
  name: string;
  description: string | null;
  private: boolean;
  author?: User;
}

export default Deck;
