import axios from 'axios';

const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : 'http://localhost:8000';

export default axios.create({
  baseURL: apiBaseUrl
});
