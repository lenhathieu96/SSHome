import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styles from './Styles/index.css';

MavenProBoldText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

function MavenProBoldText({text, style, children, ...otherProps}) {
  return (
    <Text
      style={[styles.fontSkin, style]}
      allowFontScaling={false}
      {...otherProps}>
      {text ? text : children}
    </Text>
  );
}

export default MavenProBoldText;
