import React from 'react';
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen';

describe('WelcomeScreen', () => {
  let Component;
  let instance;
  const mock = jest.fn();
  const props = {
    navigation: { navigate: mock },
  };

  beforeAll(() => {
    Component = mount(<WelcomeScreen {...props} />);
    instance = Component.instance();
  });

  it('renders correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('renders slide image correctly', () => {
    instance.renderSlideImage({
      item: {
        imageSrc: require('../../assets/images/diarum-welcome-screen-one.png'),
      },
    });

    expect(Component.find('Image')).toBeTruthy();
  });

  it('updates active slide index in state when image is snapped to', () => {
    expect(instance.state.activeSlide).toBe(0);

    instance.handleSnapToItem(2);

    expect(instance.state.activeSlide).toBe(2);
  });

  it('calls navigate prop when navigateToSignup method is called', () => {
    instance.navigateToSignup();

    expect(mock).toHaveBeenCalledWith('Signup');
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
