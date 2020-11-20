import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import * as fontSize from '../../Utils/FontSize';
import styles from './styles/index.css';

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
};

function IconButton(props) {
  const {onPress, iconName, style, disabled, iconSize, iconColor} = props;
  return (
    <Icon.Button
      iconStyle={styles.icon}
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      name={iconName}
      backgroundColor="transparent"
      underlayColor="transparent"
      borderRadius={50}
      color={iconColor ? iconColor : 'white'}
      size={iconSize ? iconSize : fontSize.bigger}
    />
  );
}

export default IconButton;
