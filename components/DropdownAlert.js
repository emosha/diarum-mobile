import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-native-dropdownalert';

export default class DropdownAlert extends React.Component {
  static propTypes = {
    showAlert: PropTypes.bool.isRequired,
    options: PropTypes.shape({
      type: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
      interval: PropTypes.number,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.showAlert) {
      this.showAlert(this.props.options);
    }
  }

  /**
   * Triggers allert
   *
   * @param {object} options
   *
   * @returns {void}
   */
  showAlert = ({
    type, title, message, interval = 4000,
  }) => {
    this.dropdown.current.alertWithType(type, title, message, interval);
  }

  render() {
    return (
      <Alert
        ref={this.dropdown}
        testID="dropdown-alert"
      />
    );
  }
}
