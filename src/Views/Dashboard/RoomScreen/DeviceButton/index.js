import React from 'react';
import {View, Switch, TouchableWithoutFeedback} from 'react-native';

import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  const {device, onChangeStatus, onDelete} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => onChangeStatus(device, device.status === 0 ? 1 : 0)}
      onLongPress={() => onDelete(device)}>
      <View
        style={[
          styles.btnContainer,
          {
            backgroundColor:
              device.status === 1 ? Color.secondary : Color.background,
          },
        ]}>
        <View style={styles.deviceInfoContainer}>
          <BoldText style={styles.deviceName}>{device.name}</BoldText>
          <Text>{device.status === 1 ? 'Bật' : 'Tắt'}</Text>
        </View>
        <View style={styles.deviceStatusContainer}>
          <Switch
            style={styles.switch}
            value={device.status === 1 ? true : false}
            trackColor={{true: 'white', false: 'white'}}
            thumbColor={
              device.status === 1 ? Color.secondary : Color.background
            }
          />
          <View />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
