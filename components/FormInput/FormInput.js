import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAIcon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import styles from './styles';

const FormInput = (props) => {
  const error = props.touched && props.error;

  return (
      <View style={styles.container}>
        <Input
          ref={props.inputRef}
          placeholder={props.placeholder}
          inputStyle={styles.input}
          inputContainerStyle={{ ...styles.inputContainer, ...(error && styles.errorInput) }}
          shake={true}
          textContentType={props.type}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          onBlur={this.onBlur}
          onChangeText={props.onChangeText}
          errorMessage={error ? props.error : null}
          containerStyle={styles.containerStyle}
          enablesReturnKeyAutomatically
          leftIcon={
            <Icon
              name={props.icon}
              size={24}
              style={styles.formIcon}
            />
          }
          rightIcon={
            props.iconRight
            && <FontAIcon
              name={props.iconRight}
              size={24}
              style={styles.formIcon}
              backgroundColor="transparent"
              onPress={props.togglePassword}
            />
          }
          blurOnSubmit={false}
          {...props}
        />
      </View>
  );
};

FormInput.defaultProps = {
  error: null,
  touched: null,
  disabled: false,
  secureTextEntry: false,
  keyboardType: 'default',
};

FormInput.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  error: PropTypes.string,
  touched: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  iconRight: PropTypes.string,
  type: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  returnKeyType: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  togglePassword: PropTypes.func,
};

export default FormInput;
