import React from 'react';
import SlideImage from '../../components/SlideImage/SlideImage';

test('renders correctly', () => {
  const tree = mount(<SlideImage imageSrc={require('../../assets/images/diarum-welcome-screen-one.png')} />);
  expect(tree).toMatchSnapshot();
});
