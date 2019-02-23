import React from 'react';
import DropdownAlert from '../../components/DropdownAlert';

describe('DropdownAlert', () => {
  let Component;
  let instance;
  const alertWithType = jest.fn();
  const props = {
    showAlert: false,
    options: {
      type: 'error',
      title: 'Error',
      message: 'an error',
      interval: 2000,
    },
  };

  beforeAll(() => {
    Component = mount(<DropdownAlert {...props} />);
    instance = Component.instance();
    instance.dropdown.current = { alertWithType };
  });

  it('renders correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('calls alertWithType when showAlert prop updates to true', () => {
    Component.setProps({
      showAlert: true,
    });

    expect(alertWithType).toHaveBeenCalledTimes(1);
    expect(alertWithType).toHaveBeenCalledWith('error', 'Error', 'an error', 2000);
  });

  it('sets alert interval to 4000 when no interval is provided', () => {
    Component.setProps({
      showAlert: true,
      options: {
        type: 'error',
        title: 'Error',
        message: 'an error',
      },
    });

    expect(alertWithType).toHaveBeenCalledTimes(2);
    expect(alertWithType).toHaveBeenCalledWith('error', 'Error', 'an error', 4000);
  });

  it('does not call alertWithType again when showAlert prop updates to false', () => {
    expect(alertWithType).toHaveBeenCalledTimes(2);

    Component.setProps({
      showAlert: false,
    });

    expect(alertWithType).toHaveBeenCalledTimes(2);
  });
});
