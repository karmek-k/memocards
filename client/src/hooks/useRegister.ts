import { useEffect, useState } from 'react';
import { RegisterInputs } from '../components/register/RegisterForm';
import register from '../functions/register';

const useRegister = (inputs: RegisterInputs) => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!inputs.username || !inputs.password || done) {
      return;
    }

    setError(false);
    setRegistering(true);
    register(inputs)
      .then(() => setDone(true))
      .catch(setError)
      .finally(() => setRegistering(false));
  }, [inputs, done]);

  return {
    done,
    error,
    registering
  };
};

export default useRegister;
