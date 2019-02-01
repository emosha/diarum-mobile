import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  imageStyle: {
    height: '100%',
    width: imageWidth,
  },
});

export default styles;
