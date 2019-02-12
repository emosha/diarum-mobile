import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';

import Loader from '../../components/Loader/Loader';

export default class AuthLoadingScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    await this.bootstrapApp();
  }

  componentDidCatch() {
    this.props.navigation.navigate('Welcome');
  }

  /**
   * Bootstraps application
   *
   * @returns {void}
   */
  bootstrapApp = async () => {
    await this.loadFonts();
    const screen = await this.getNextScreen();

    this.props.navigation.navigate(screen);
  }

  /**
   * Get next screen
   *
   * @returns {string} next screen
   */
  getNextScreen = async () => {
    const alreadyOpened = await this.alreadyOpened();
    const loggedInUser = await this.checkUserAuthStatus();
    const unAuthScreen = alreadyOpened ? 'Signup' : 'Welcome';

    return loggedInUser ? 'App' : unAuthScreen;
  }

  /**
   * Checks user authentication status
   *
   * @returns {Object} user
   */
  checkUserAuthStatus = async () => {
    const userString = await AsyncStorage.getItem('@DIARUM:USER');
    const user = JSON.parse(userString);

    return user;
  }

  /**
   * Checks if app was previously opened
   *
   * @returns {boolean} alreadyOpened
   */
  async alreadyOpened() {
    const value = await AsyncStorage.getItem('@DIARUM:ALREADYOPEN');

    if (!value) {
      await AsyncStorage.setItem('@DIARUM:ALREADYOPEN', 'true');
      return false;
    }

    return true;
  }

  /**
   * Load app fonts
   *
   * @returns {void}
   */
  async loadFonts() {
    await Font.loadAsync({
      'open-sans-light': require('../../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
      'open-sans-italic': require('../../assets/fonts/Open_Sans/OpenSans-Italic.ttf'),
      'open-sans-regular': require('../../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      'open-sans-semi-bold': require('../../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
      'open-sans-bold': require('../../assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
      'open-sans-extra-bold': require('../../assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf'),
    });
  }

  render() {
    return (
      <Fragment>
        <Loader size="large" color="#5D59CB" />
      </Fragment>
    );
  }
}
