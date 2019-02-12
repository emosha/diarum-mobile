import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    bottom: '-5%',
  },
  buttonStyle: {
    backgroundColor: '#F5BDBA',
    borderRadius: 0,
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonContainerStyle: {
    marginTop: 35,
  },
  buttonTitleStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#5d59cb',
    fontWeight: '300',
    letterSpacing: 2.5,
    fontFamily: 'open-sans-regular',
  },
  paginationDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(93, 89, 203, 0.92)',
  },
});

export default styles;
