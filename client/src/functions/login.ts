import axios from 'axios';
import { LoginInputs } from '../components/login/LoginForm';

interface TokenResponse {
  token: string;
}

const login = (inputs: LoginInputs): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    axios
      .post<TokenResponse>('/user/token', {
        username: inputs.username,
        password: inputs.password
      })
      .then(res => resolve(res.data.token))
      .catch(reject);
  });
};

export default login;
