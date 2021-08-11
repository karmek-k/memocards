import { useAppSelector } from './redux';

const useJwt = () => {
  return useAppSelector(state => state.user.token);
};

export default useJwt;
