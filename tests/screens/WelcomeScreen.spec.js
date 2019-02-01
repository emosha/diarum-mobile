import React from 'react';
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen';

jest.mock('react-native-snap-carousel');

test('renders correctly', () => {
  const tree = renderer.create(<WelcomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
