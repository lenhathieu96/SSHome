import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styles from './Styles/index.css';

MavenProText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

function MavenProText({text, style, children, ...otherProps}) {
  return (
    <Text
      style={[styles.fontSkin, style]}
      allowFontScaling={false}
      {...otherProps}>
      {text ? text : children}
    </Text>
  );
}

export default MavenProText;
