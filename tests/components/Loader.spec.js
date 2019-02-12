import React from 'react';
import Loader from '../../components/Loader/Loader';

test('renders correctly', () => {
  const tree = mount(<Loader size="40" color="red" />);
  expect(tree).toMatchSnapshot();
});
