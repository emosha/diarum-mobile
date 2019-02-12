import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      name
      email
      token
    }
  }
`;

export default { SIGNUP, ME };
