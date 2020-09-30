import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import color from '../../Utils/Color';

import styles from './styles/index.css';

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  iconColor: PropTypes.string,
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
        color={iconColor ? iconColor : color.primary}
        size={iconSize}
      />
    </TouchableOpacity>
  );
}

export default IconButton;
