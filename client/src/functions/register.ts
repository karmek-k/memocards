import { RegisterInputs } from '../components/register/RegisterForm';
import User from '../interfaces/User';
import api from './api';

const register = (inputs: RegisterInputs): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    api
      .post<User>('/user', {
        username: inputs.username,
        password: inputs.password
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
};

export default register;
