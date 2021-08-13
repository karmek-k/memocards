import api from './api';

export function getRequestFactory<T>(url: string, jwt: string | null) {
  return async () => {
    const { data } = await api.get<T>(url, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    return data;
  };
}
