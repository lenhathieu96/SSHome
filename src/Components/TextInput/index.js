import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PropTypes from 'prop-types';

import Text from '../Text';

import Color from '../../Utils/Color';
import * as fontSize from '../../Utils/FontSize';
import styles from './styles/index.css';

const TextField = React.forwardRef((props, ref) => {
  const {label, style, iconName, onIconPress, ...otherProps} = props;
  const [isFocus, setFocus] = useState(false);

  return (
    <View
      style={[
        isFocus ? styles.inputContainer_Focus : styles.inputContainer_unFocus,
        style,
      ]}>
      <Text style={isFocus ? styles.label_Focus : styles.label_unFocus}>
        {label.toUpperCase()}
      </Text>
      <TextInput
        ref={ref}
        {...otherProps}
        style={{flex: 1}}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <Icon.Button
        name={iconName}
        size={fontSize.larger}
        onPress={onIconPress}
        color={Color.primary}
        backgroundColor="transparent"
        underlayColor="transparent"
      />
    </View>
  );
});

export default TextField;

TextField.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object || PropTypes.array,
};
