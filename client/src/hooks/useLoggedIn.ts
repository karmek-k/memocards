import { useAppSelector } from './redux';

const useLoggedIn = () => {
  return useAppSelector(state => state.user.token) !== null;
};

export default useLoggedIn;
