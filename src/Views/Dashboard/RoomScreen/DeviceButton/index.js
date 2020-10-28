import React, {useState, useRef} from 'react';
import {View, Switch, TouchableWithoutFeedback} from 'react-native';

import IconButton from '../../../../Components/IconButton';
import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  const [isActive, setActive] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(!isActive);
      }}>
      <View
        style={[
          styles.btnContainer,
          {backgroundColor: isActive ? Color.secondary : Color.background},
        ]}>
        <View style={styles.deviceInfoContainer}>
          <BoldText style={styles.deviceName}>{'Đèn 1'}</BoldText>
          <Text>{isActive ? 'Bật' : 'Tắt'}</Text>
        </View>
        <View style={styles.deviceStatusContainer}>
          <Switch
            style={styles.switch}
            value={isActive}
            trackColor={{true: 'white', false: 'white'}}
            thumbColor={isActive ? Color.secondary : Color.background}
          />
          <View />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
