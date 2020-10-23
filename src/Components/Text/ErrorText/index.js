import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styles from './styles/index.css';

ErrorText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

function ErrorText({text, style, children, ...otherProps}) {
  return (
    <Text
      style={[styles.fontSkin, style]}
      allowFontScaling={false}
      {...otherProps}>
      {text ? text : children}
    </Text>
  );
}

export default ErrorText;
