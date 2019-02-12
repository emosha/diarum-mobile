import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styles from './styles';

export default class SlideImage extends React.Component {
  static propTypes = {
    imageSrc: PropTypes.any.isRequired,
  }

  render() {
    return (
      <Image
        source={this.props.imageSrc}
        style={styles.imageStyle}
      />
    );
  }
}
