import React from 'react';
import AppNavigator from '../../components/AppNavigator';

test('renders correctly', () => {
  const tree = mount(<AppNavigator />);
  expect(tree).toMatchSnapshot();
});
