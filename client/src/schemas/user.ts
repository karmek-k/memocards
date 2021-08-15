import * as yup from 'yup';

const loginSchemaShape = {
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(5).max(100)
};

export const loginSchema = yup.object().shape(loginSchemaShape);

const registerSchemaShape = {
  ...loginSchemaShape,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'passwords do not match')
};

export const registerSchema = yup.object().shape(registerSchemaShape);
