import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    fontWeight: '300',
    letterSpacing: 2.5,
    fontFamily: 'open-sans-regular',
    textAlign: 'center',
    color: '#5D59CB',
    marginBottom: 20,
    fontSize: 35,
  },
  buttonContainerStyle: {
    marginTop: 90,
  },
  buttonStyle: {
    height: 70,
    width: 200,
  },
});

export default styles;
