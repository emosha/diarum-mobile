import React from 'react';
import FormInput from '../../components/FormInput/FormInput';

describe('FormInput', () => {
  let Component;
  const props = {
    error: null,
    touched: false,
    icon: 'key',
    type: 'name',
    placeholder: 'Name',
    onBlur: jest.fn(),
    onChangeText: jest.fn(),
    returnKeyType: 'next',
    inputRef: null,
  };

  beforeAll(() => {
    Component = mount(<FormInput {...props} />);
  });

  it('renders correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('does not show error message when input has not been touched but has an error', () => {
    const ComponentWithError = mount(<FormInput {...props} touched={false} error="an error" />);

    expect(ComponentWithError.find('Text').at(1).length).toBeFalsy();
  });

  it('shows error message when input has been touched and has an error', () => {
    const ComponentWithError = mount(<FormInput {...props} touched error="an error" />);

    expect(ComponentWithError.find('Text').at(1).length).toBeTruthy();
    expect(ComponentWithError.find('Text').at(1).text()).toEqual('an error');
  });
});
