import React from 'react';
import { Font } from 'expo';

import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    /* eslint-disable */
    await Font.loadAsync({
      'open-sans-light': require('./assets/fonts/Open_Sans/OpenSans-Light.ttf'),
      'open-sans-italic': require('./assets/fonts/Open_Sans/OpenSans-Italic.ttf'),
      'open-sans-regular': require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      'open-sans-semi-bold': require('./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
      'open-sans-bold': require('./assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
      'open-sans-extra-bold': require('./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded && <WelcomeScreen />;
  }
}
