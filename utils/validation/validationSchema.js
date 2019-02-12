import * as yup from 'yup';

const validationSchema = {
  signup: yup.object().shape({
    name: yup
      .string().trim()
      .required('name is required')
      .min(2, 'name should be between 2 and 100 characters')
      .max(100, 'name should be between 2 and 100 characters'),
    email: yup
      .string().trim().lowercase()
      .required('email is required')
      .email('email address is invalid'),
    username: yup
      .string().trim()
      .required('username is required')
      .min(2, 'username should be between 2 and 40 characters')
      .max(100, 'username should be between 2 and 40 characters')
      .matches(/^[0-9a-zA-Z]+$/, 'username should contain only numbers and letters'),
    password: yup
      .string().trim()
      .required('password is required')
      .min(8, 'password should be more than 8 characters'),
    imageUrl: yup
      .string().trim()
      .url('url is invalid'),
  }),
};

export default validationSchema;
