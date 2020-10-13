import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

import styles from './styles/index.css';

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

function IconButton(props) {
  const {onPress, iconName, style, disabled, iconSize, iconColor} = props;
  return (
    <TouchableOpacity
      style={[styles.iconButton, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon
        name={iconName}
        color={iconColor ? iconColor : 'white'}
        size={iconSize}
      />
    </TouchableOpacity>
  );
}

export default IconButton;
