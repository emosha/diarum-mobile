import React from 'react';
import { AsyncStorage } from 'react-native';

import mocks from '../helpers/mocks';
import AuthLoadingScreen from '../../screens/AuthLoadingScreen/AuthLoadingScreen';

jest.mock('expo', () => ({
  Font: {
    loadAsync() {
      return null;
    },
  },
}));

describe('AuthLoadingScreen', () => {
  let Component;
  let instance;
  const getProps = navigate => ({
    navigation: {
      navigate,
    },
  });

  beforeAll(() => {
    const props = getProps(jest.fn());
    Component = mount(
      <AuthLoadingScreen navigation={props.navigation} />,
    );

    instance = Component.instance();
  });

  it('renders correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('navigates to the welcome screen if App has never been open', async () => {
    await instance.bootstrapApp();

    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('Welcome');
  });

  it('navigates to the signup screen if App has been open but user is not authenticated', async () => {
    await AsyncStorage.setItem('@DIARUM:ALREADYOPEN', 'true');

    const props = getProps(jest.fn());
    const newInstance = await mount(
      <AuthLoadingScreen navigation={props.navigation} />,
    ).instance();

    await newInstance.bootstrapApp();

    expect(newInstance.props.navigation.navigate).toHaveBeenCalledWith('Signup');
  });

  it('navigates to the Home page if App has been open and user is authenticated', async () => {
    const props = getProps(jest.fn());
    const { createUser: { user } } = mocks[0].result.data;

    await AsyncStorage.setItem('@DIARUM:ALREADYOPEN', 'true');
    await AsyncStorage.setItem('@DIARUM:USER', JSON.stringify(user));

    const newInstance = await mount(
      <AuthLoadingScreen navigation={props.navigation} />,
    ).instance();

    await newInstance.bootstrapApp();

    expect(newInstance.props.navigation.navigate).toHaveBeenCalledWith('App');
  });

  it('navigates to the welcome screen if an error occurs', async () => {
    await instance.componentDidCatch();

    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('Welcome');
  });
});
