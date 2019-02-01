import React from 'react';
import SlideImage from '../../components/SlideImage/SlideImage';

test('renders correctly', () => {
  const tree = renderer.create(<SlideImage />).toJSON();
  expect(tree).toMatchSnapshot();
});
