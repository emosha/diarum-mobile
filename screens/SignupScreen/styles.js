import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 30,
    paddingBottom: 6,
    paddingHorizontal: 10,
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
    fontSize: 25,
  },
  buttonContainerStyle: {
    marginTop: 70,
  },
  buttonStyle: {
    height: 70,
    width: 200,
  },
});

export default styles;
