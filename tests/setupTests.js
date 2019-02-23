/*eslint-disable */
import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }

  originalConsoleError(message);
};

import React from 'react';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage';
import { mount, shallow } from 'enzyme';
import Carousel from 'react-native-snap-carousel';

global.React = React;
global.renderer = renderer;
global.mount = mount;
global.shallow = shallow;

jest.mock('NativeAnimatedHelper');
jest.useFakeTimers();

const mockAsyncStorage = new MockAsyncStorage();
class mockScrollView {
  render() {
    console.log(props);

    return <Carousel>{props.children}</Carousel>;
  }
};
jest.mock('AsyncStorage', () => mockAsyncStorage);
jest.mock('ScrollView', () => {
  const MockScrollView = require.requireMock('ScrollViewMock');
  const React = require('React');
  const RealScrollView = require.requireActual('ScrollView');

  class ScrollView extends React.Component {
    scrollTo() {
    }

    render() {
      return (
        <MockScrollView {...this.props} />
      );
    }
  }

  ScrollView.propTypes = RealScrollView.propTypes;
  return ScrollView;
});
