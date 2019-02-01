import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styles from './styles';

export default class SlideImage extends React.Component {
  static propTypes = {
    imageSrc: PropTypes.string,
  }

  render() {
    return (<Image
      source={{ uri: this.props.imageSrc }}
      style={styles.imageStyle}
    />);
  }
}
