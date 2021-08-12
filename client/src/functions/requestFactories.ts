import axios from 'axios';

export function getRequestFactory<T>(url: string, jwt: string | null) {
  return async () => {
    const { data } = await axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    return data;
  };
}
