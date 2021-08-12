import axios, { AxiosRequestConfig } from 'axios';

function getResource<T>(url: string, jwt?: string): Promise<T> {
  const config: AxiosRequestConfig = {};
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  return axios.get<T>(url, config).then(res => res.data);
}

export default getResource;
