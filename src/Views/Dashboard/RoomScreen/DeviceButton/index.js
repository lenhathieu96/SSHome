import React from 'react';
import {View, Switch, TouchableWithoutFeedback} from 'react-native';

import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  const {device, onChangeStatus, onDelete} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        onChangeStatus(device, device.status === 'on' ? 'off' : 'on')
      }
      onLongPress={() => onDelete(device)}>
      <View
        style={[
          styles.btnContainer,
          {
            backgroundColor:
              device.status === 'on' ? Color.secondary : Color.background,
          },
        ]}>
        <View style={styles.deviceInfoContainer}>
          <BoldText style={styles.deviceName}>{device.name}</BoldText>
          <Text>{device.status === 'on' ? 'Bật' : 'Tắt'}</Text>
        </View>
        <View style={styles.deviceStatusContainer}>
          <Switch
            style={styles.switch}
            value={device.status === 'on' ? true : false}
            trackColor={{true: 'white', false: 'white'}}
            thumbColor={
              device.status === 'on' ? Color.secondary : Color.background
            }
          />
          <View />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
