import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import IconButton from '../../../../Components/IconButton';
import Text from '../../../../Components/Text';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  const {index, name, status, onChangeDeviceStatus} = props;

  return (
    <View style={styles.btnContainer}>
      <View style={styles.iconContainer}>
        <Icon name="lightbulb" size={2.5 * fontSize.biggest} color="yellow" />
        <Text style={styles.deviceName}>{name}</Text>
      </View>
      <View style={styles.controlContainer}>
        <IconButton
          iconName="power-off"
          iconColor="white"
          style={status ? styles.btnPowerOff : styles.btnPowerOn}
          onPress={() => onChangeDeviceStatus(index, !status)}
        />
        <Text style={status ? styles.deviceStatusOn : styles.deviceStatusOff}>
          {status ? 'On' : 'Off'}
        </Text>
      </View>
    </View>
  );
}
