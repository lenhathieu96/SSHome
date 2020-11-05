import React from 'react';
import {View, Switch, TouchableWithoutFeedback} from 'react-native';

import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  const {device, onChangeStatus, onDelete} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => onChangeStatus(device, !device.status)}
      onLongPress={() => onDelete(device)}>
      <View
        style={[
          styles.btnContainer,
          {backgroundColor: device.status ? Color.secondary : Color.background},
        ]}>
        <View style={styles.deviceInfoContainer}>
          <BoldText style={styles.deviceName}>{device.name}</BoldText>
          <Text>{device.status ? 'Bật' : 'Tắt'}</Text>
        </View>
        <View style={styles.deviceStatusContainer}>
          <Switch
            style={styles.switch}
            value={device.status}
            trackColor={{true: 'white', false: 'white'}}
            thumbColor={device.status ? Color.secondary : Color.background}
          />
          <View />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
