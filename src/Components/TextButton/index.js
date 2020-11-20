import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles/index.css';

import PropTypes from 'prop-types';

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

function TextButton(props) {
  const {style, textStyle, onPress, text, disabled} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.TextButton, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

export default TextButton;
