import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styles from './styles/index.css';
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';

NumberText.propTypes = {
  text: PropTypes.number,
  style: PropTypes.object,
};

function NumberText({value, style, ...otherProps}) {
  return (
    <Text
      style={[styles.fontSkin, style]}
      allowFontScaling={false}
      {...otherProps}>
      {new Intl.NumberFormat('vi-VN').format(value)}
    </Text>
  );
}

export default NumberText;
