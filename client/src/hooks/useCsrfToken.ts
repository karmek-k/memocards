import { useQuery } from 'react-query';
import api from '../functions/api';

const getCsrfToken = async () => {
  await api.get<void>('/csrf-token');
};

const useCsrfToken = () => {
  const { isError, isSuccess } = useQuery<void>('csrfToken', getCsrfToken, {
    retry: false,
    refetchOnWindowFocus: false
  });

  return new Promise<boolean>((resolve, reject) => {
    if (isError) {
      return reject('Could not fetch the CSRF token');
    }

    if (isSuccess) {
      return resolve(true);
    }
  });
};

export default useCsrfToken;
