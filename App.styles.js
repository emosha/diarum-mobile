import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  authTop: {
    flex: 2,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  authBottom: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
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
  disabledButtonStyle: {
    backgroundColor: '#DEEFED',
  },
  buttonTextColor: {
    color: '#5d59cb',
  },
});

export const InputStyles = StyleSheet.create({
  formError: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginTop: -13,
  },
  formIcon: {
    color: '#5D59CB',
    marginRight: 10,
  },
  input: {
    color: '#333',
    fontSize: 20,
  },
  inputContainer: {
    borderColor: '#5D59CB',
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginVertical: 0,
  },
  errorInput: {
    borderColor: 'red',
  },
  containerStyle: {
    marginBottom: 25,
    height: 65,
  },
  errorStyle: {
    color: 'red',
  },
});

export default AppStyles;
