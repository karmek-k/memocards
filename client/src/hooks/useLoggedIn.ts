import useJwt from './useJwt';

const useLoggedIn = () => {
  return useJwt() !== null;
};

export default useLoggedIn;
