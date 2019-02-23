import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import {
  ImageBackground, View, Keyboard, AsyncStorage, ScrollView,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Mutation } from 'react-apollo';

import styles from './styles';
import AppStyles from '../../App.styles';
import { userQuery } from '../../graphql/queries';
import FormInput from '../../components/FormInput/FormInput';
import validationSchema from '../../utils/validation/validationSchema';

class SignupScreen extends React.Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      showDropdownAlert: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    error: null,
    errors: {
      name: null,
      username: null,
      email: null,
      password: null,
    },
    touched: {
      name: false,
      username: false,
      email: false,
      password: false,
    },
    showPassword: false,
  }

  componentDidCatch() {
    this.setGlobalError();
  }

  /**
   * Clears error in state and calls Formik's onChange handler
   *
   * @param {string} type field
   *
   * @returns {func}
   */
  handleChange = type => (value) => {
    this.setState({
      error: null,
      errors: {
        ...this.state.errors,
        [type]: null,
      },
    }, () => this.props.handleChange(type)(value));
  }

  /**
   * Handles form input submit editing
   *
   * @param {string} field
   * @param {object} nextField
   *
   * @returns {function} focus
   */
  handleSubmitEditing = (field, nextField) => () => {
    const isValidInput = this.props.values[field] !== '' && !this.props.errors[field];

    this.setTouchedState(field);

    if (!isValidInput) {
      this.setErrorState(field);
      this[field].focus();
      return;
    }

    this[nextField].focus();
  }

  /**
   * Handles password field submit editing
   *
   * @param {function} createUser createUser mutation
   *
   * @returns {function} handleSubmit || focus
   */
  handleSubmitEditingPassword = createUser => () => {
    const isValidInput = this.props.values.password !== '' && !this.props.errors.password;
    this.setTouchedState('password');

    if (!isValidInput) {
      this.setErrorState('password');
      this.password.focus();
      return;
    }

    this.handleSubmit(createUser, this.props.values)();
  }

  /**
   * Hides keyboard and awaits mutation
   *
   * @param {function} nutation createUser mutation
   * @param {object} data data to submit
   *
   * @returns {void}
   */
  handleSubmit = (mutation, data) => async () => {
    Keyboard.dismiss();
    await mutation({ variables: { data } });
  }

  /**
   * Checks if form is valid
   *
   * @returns {bool} true or false
   */
  isValidForm = () => {
    let isValidForm = true;
    Object.keys(this.props.values).forEach((field) => {
      if (this.props.values[field] === '' || (this.props.values[field] && this.props.errors[field])) {
        isValidForm = false;
      }
    });

    return isValidForm;
  }

  /**
   * Sets global error in state
   *
   * @returns {void}
   */
  setGlobalError = () => {
    this.props.screenProps.showDropdownAlert(true, { type: 'error', title: 'Error', message: 'Something happened, please try again' });
    this.setState({
      error: 'Something happened, please try again',
    });
  }

  /**
   * Sets form input ref
   *
   * @param {string} field
   *
   * @returns {void}
   */
  setInputRef = field => (ref) => {
    this[field] = ref;
  }

  /**
   * Sets field error state
   *
   * @param {string} field field
   *
   * @returns {void}
   */
  setErrorState = (field) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [field]: this.props.errors[field] || `${field} is required`,
      },
    });
  }

  /**
   * Sets field touched state
   *
   * @param {string} field field
   *
   * @returns {void}
   */
  setTouchedState = (field) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true,
      },
    });
  }

  /**
   * Gets error state
   *
   * @param {string} type field
   *
   * @returns {string | null}
   */
  getErrorState = type => this.props.errors[type] || this.state.errors[type]

  /**
   * Sets touched state
   *
   * @param {string} type field
   *
   * @returns {boolean}
   */
  getTouchedState = type => this.props.touched[type] || this.state.touched[type]

  /**
   * Toggles password view
   *
   * @returns {void}
   */
  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  /**
   * Map error message
   *
   * @param {object} errors
   *
   * @returns {void}
   */
  mapErrorMessage = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      /* eslint-disable */
      graphQLErrors.map((error) => {
        if (error.code && error.code.type === 'BAD_USER_INPUT') {
          const fieldErrors = error.code.details.reduce((errObj, err) => {
            errObj[err.field] = err.message;

            return errObj;
          }, {});

          this.setState({
            errors: {
              ...this.state.errors,
              ...fieldErrors,
            },
          });
        } else {
          this.setGlobalError();
        }
      });
    }

    if (networkError) {
      this.setGlobalError();
    }
  }

  /**
   * Updatess auth storage
   *
   * @param {object} result mutation result
   *
   * @returns {void}
   */
  updateAuthStorage = async ({ createUser }) => {
    const { user, token } = createUser;

    this.props.navigation.navigate('App');
    await AsyncStorage.setItem('@DIARUM:USER', JSON.stringify(user));
    await AsyncStorage.setItem('@DIARUM:TOKEN', token);
  }

  render() {
    const { values, handleBlur, dirty } = this.props;
    const { SIGNUP } = userQuery;
    const isValidForm = this.isValidForm();

    return (
      <Mutation
        mutation={SIGNUP}
        onError={this.mapErrorMessage}
        onCompleted={this.updateAuthStorage}
      >
        {(createUser, { loading }) => (
          <ScrollView>
            <ImageBackground source={require('../../assets/images/diarum-welcome.png')} style={styles.imageBackground}>
              <View style={styles.container}>
                <View style={AppStyles.authTop}>
                  <Text style={styles.header}>SIGN UP</Text>
                  <FormInput
                    placeholder="Name"
                    icon="user"
                    type="name"
                    onChangeText={this.handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    touched={this.getTouchedState('name')}
                    error={this.getErrorState('name')}
                    returnKeyType="next"
                    inputRef={this.setInputRef('name')}
                    onSubmitEditing={this.handleSubmitEditing('name', 'username')}
                  />
                  <FormInput
                    placeholder="Username"
                    icon="smileo"
                    type="username"
                    onChangeText={this.handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    touched={this.getTouchedState('username')}
                    error={this.getErrorState('username')}
                    returnKeyType="next"
                    inputRef={this.setInputRef('username')}
                    onSubmitEditing={this.handleSubmitEditing('username', 'email')}
                  />
                  <FormInput
                    placeholder="Email"
                    icon="mail"
                    type="emailAddress"
                    keyboardType="email-address"
                    onChangeText={this.handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    touched={this.getTouchedState('email')}
                    error={this.getErrorState('email')}
                    returnKeyType="next"
                    inputRef={this.setInputRef('email')}
                    onSubmitEditing={this.handleSubmitEditing('email', 'password')}
                  />
                  <FormInput
                    placeholder="Password"
                    icon="key"
                    type="password"
                    onChangeText={this.handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    touched={this.getTouchedState('password')}
                    error={this.getErrorState('password')}
                    returnKeyType="done"
                    inputRef={this.setInputRef('password')}
                    onSubmitEditing={this.handleSubmitEditingPassword(createUser)}
                    iconRight={this.state.showPassword ? 'eye-slash' : 'eye'}
                    secureTextEntry={!this.state.showPassword}
                    togglePassword={this.togglePassword}
                  />
                </View>
                <View style={AppStyles.authBottom}>
                  <Button
                    raised
                    title="SIGN UP"
                    buttonStyle={[AppStyles.buttonStyle, styles.buttonStyle]}
                    containerStyle={styles.buttonContainerStyle}
                    titleStyle={AppStyles.buttonTitleStyle}
                    disabledStyle={AppStyles.disabledButtonStyle}
                    disabledTitleStyle={AppStyles.buttonTextColor}
                    loadingProps={{ color: '#5d59cb' }}
                    onPress={this.handleSubmit(createUser, this.props.values)}
                    disabled={!dirty || loading || !isValidForm}
                    loading={loading}
                  />
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        ) }
      </Mutation>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    username: '',
    email: '',
    password: '',
  }),
  validationSchema: validationSchema.signup,
  displayName: 'SignupScreen',
})(SignupScreen);
