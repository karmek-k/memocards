import axios, { AxiosRequestConfig } from 'axios';

export function getRequestFactory<T>(url: string, jwt?: string) {
  return async () => {
    const config: AxiosRequestConfig = {};
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    const res = await axios.get<T>(url, config);
    return res.data;
  };
}
