import PropTypes from 'prop-types';

import { client } from '../../App';
import { users } from './data';
import { SIGNUP } from '../../graphql/queries/user';

export default [
  {
    request: {
      query: SIGNUP,
      variables: users.userOne,
    },
    result: {
      data: {
        createUser: {
          user: {
            id: '1',
            name: 'Olisa',
            username: 'olisa',
            email: 'olisa@emodi.com',
          },
          token: 'mock token',
        },
      },
    },
  },
];

export const apolloContext = {
  context: {
    client,
  },
  childContextTypes: {
    client: PropTypes.object,
  },
};
