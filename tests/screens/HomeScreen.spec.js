import React from 'react';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';

describe('HomeScreen', () => {
  let Component;

  beforeAll(() => {
    Component = mount(<HomeScreen />);
  });

  it('renders correctly', () => {
    expect(Component).toMatchSnapshot();
  });
});
