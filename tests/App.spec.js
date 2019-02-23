import React from 'react';
import App from '../App';

describe('App', () => {
  let Component;
  let instance;

  beforeAll(() => {
    Component = mount(<App />);
    instance = Component.instance();
  });

  it('renders correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('sets showAlert and options values in state when showDropdownAlert method is called', () => {
    const options = {
      type: 'error',
      title: 'Error',
      message: 'an error',
    };

    expect(instance.state).toEqual({
      showAlert: false,
      options: {},
    });

    instance.showDropdownAlert(true, options);

    expect(instance.state).toEqual({
      options,
      showAlert: true,
    });
  });
});
