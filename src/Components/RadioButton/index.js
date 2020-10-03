import React from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';

import Text from '../Text';

import styles from './styles/index.css';

export default function RadioButtons(props) {
  const {title, option, value, disabled, customStyle, onChange} = props;
  return (
    <View style={[styles.radioContainer, customStyle]}>
      <Text style={styles.textStyle}>{title}</Text>
      <RadioButton
        disabled={disabled}
        value={value}
        status={value === option ? 'checked' : 'unchecked'}
        onPress={() => onChange()}
      />
    </View>
  );
}
