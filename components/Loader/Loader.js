import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

export default class Loader extends React.Component {
  static propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={this.props.size} color={this.props.color} />
      </View>
    );
  }
}
