import React from 'react';
import { AsyncStorage } from 'react-native';
import { MockedProvider } from 'react-apollo/test-utils';

import SignupScreen from '../../screens/SignupScreen/SignupScreen';
import mapFieldValues from '../../utils/mapFieldValues';
import mocks, { apolloContext } from '../helpers/mocks';

describe('SignupScreen', () => {
  let GraphQLComponent;
  let Component;
  let instance;
  const values = [];
  const props = {
    values: mapFieldValues(values, ''),
    touched: mapFieldValues(values, false),
    errors: mapFieldValues(values, null),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    handleSubmit: jest.fn(),
    dirty: false,
    navigation: {
      navigate: jest.fn(),
    },
  };

  beforeAll(() => {
    GraphQLComponent = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupScreen {...props} />
      </MockedProvider>,
    );

    Component = mount(<SignupScreen {...props} />, apolloContext);

    instance = Component.find('SignupScreen').instance();
  });

  describe('Component', () => {
    it('renders component correctly', () => {
      expect(Component).toMatchSnapshot();
    });

    it('updates field value when field is changed', () => {
      instance.handleChange('name')('Olisa');

      expect(instance.props.values.name).toEqual('Olisa');
    });

    it('does not show an error if field value is valid', () => {
      instance.handleChange('username')('oleesir');
      instance.handleSubmitEditing('username', 'email')();

      expect(instance.state.errors.username).toEqual(null);
    });

    it('shows an error if field value is invalid', () => {
      instance.handleChange('email')('');
      instance.handleSubmitEditing('email', 'password')();

      expect(instance.state.errors.email).toEqual('email is required');
    });

    it('does not call create user function if password is invalid', () => {
      const createUser = jest.fn();
      instance.handleChange('password')('');
      instance.handleSubmitEditingPassword(createUser)();

      expect(createUser).not.toHaveBeenCalledTimes(1);
    });

    it('calls create user function if password is valid', () => {
      const createUser = jest.fn();
      instance.handleChange('name')('Olisa');
      instance.handleChange('username')('olisa');
      instance.handleChange('email')('olisa@emodi.com');
      instance.handleChange('password')('oleesirsir');
      instance.handleSubmitEditingPassword(createUser)();

      expect(createUser).toHaveBeenCalledTimes(1);
    });

    it('should not submit invalid form', () => {
      const createUser = jest.fn();
      instance.handleChange('name')('');
      instance.handleChange('username')('');
      instance.handleChange('email')('olisa@emodi.com');
      instance.handleChange('password')('oleesirsir');
      instance.handleSubmitEditingPassword(createUser)();

      expect(instance.state.errors.name).toEqual('name is required');
      expect(instance.state.errors.username).toEqual('username is required');
    });

    it('maps error messages to respective fields when form is submitted and graphQLErrors field errors occur', () => {
      const graphQLErrors = [
        {
          code: {
            type: 'BAD_USER_INPUT',
            details: [
              {
                field: 'username',
                message: 'username already exists',
              },
              {
                field: 'email',
                message: 'email already exists',
              },
            ],
          },
        },
      ];

      instance.mapErrorMessage({ graphQLErrors });

      expect(instance.state.errors.username).toEqual('username already exists');
      expect(instance.state.errors.email).toEqual('email already exists');
    });

    it('sets error in state if non USER INPUT graphql error occurs', () => {
      instance.mapErrorMessage({ graphQLErrors: ['an error'] });

      expect(instance.state.error).toEqual('Something happened, please try again');
    });

    it('updates error message in state if network error occurs', () => {
      const networkError = 'error';

      instance.mapErrorMessage({ networkError });

      expect(instance.state.error).toEqual('Something happened, please try again');
    });

    it('submits form and updates user value in async storage', async () => {
      const { createUser } = mocks[0].result.data;
      instance.updateAuthStorage({ createUser });

      const user = await AsyncStorage.getItem('@DIARUM:USER');
      const token = await AsyncStorage.getItem('@DIARUM:TOKEN');

      expect(JSON.parse(user)).toEqual(createUser.user);
      expect(token).toEqual(createUser.token);
    });

    it('sets error message in state if any error is caught', () => {
      instance.componentDidCatch();

      expect(instance.state.error).toEqual('Something happened, please try again');
    });
  });

  describe('GraphQLComponent', () => {
    it('renders connected component correctly', () => {
      expect(GraphQLComponent).toMatchSnapshot();
    });

    // it('submits form and updates user value in async storage', async () => {
    //   instance.handleChange('name')('Olisa');
    //   instance.handleChange('username')('olisa');
    //   instance.handleChange('email')('olisa@emodi.com');
    //   instance.handleChange('password')('oleesirsir');

    //   const button = GraphQLComponent.find('Button');

    //   button.props().onPress();

    //   expect(button.props().loading).toBeTruthy();
    // });
  });
});
