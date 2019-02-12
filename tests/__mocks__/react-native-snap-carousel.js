import React from 'react';
import { View, Text } from 'react-native';

export default class Carousel extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <View>
        <Text>Carousel</Text>
      </View>
    );
  }
}

export class Pagination extends React.Component {
  render() {
    return (
      <View>
        <Text>Pagination</Text>
      </View>
    );
  }
}
