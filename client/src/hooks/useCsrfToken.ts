import { useQuery } from 'react-query';
import axios from 'axios';

const getCsrfToken = async () => {
  await axios.get<void>('/csrf-token');
};

const useCsrfToken = () => {
  const { isError, isSuccess } = useQuery<void>('csrfToken', getCsrfToken);

  return new Promise<boolean>((resolve, reject) => {
    if (isError) {
      return reject(false);
    }

    if (isSuccess) {
      return resolve(true);
    }
  });
};

export default useCsrfToken;
