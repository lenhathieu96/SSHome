import React from 'react';
import {View, Animated, Switch} from 'react-native';

import IconButton from '../../../../Components/IconButton';
import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  return (
    <View style={styles.btnContainer}>
      <View style={styles.deviceInfoContainer}>
        <BoldText style={styles.deviceName}>{'Đèn 1'}</BoldText>
        <Text>Bật</Text>
      </View>
      <View style={styles.deviceStatusContainer}>
        <Switch
          style={styles.switch}
          value={true}
          trackColor={{true: 'white', false: 'grey'}}
          thumbColor={Color.secondary}
        />
        <View />
      </View>
    </View>
  );
}
