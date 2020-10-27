import React, {useState, useRef} from 'react';
import {View, Animated, Switch, TouchableWithoutFeedback} from 'react-native';

import IconButton from '../../../../Components/IconButton';
import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function DeviceButton(props) {
  const [isActive, setActive] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const activeColor = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [0.3, 1],
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(!isActive);
        Animated.timing(scrollX, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}>
      <Animated.View style={[styles.btnContainer, {opacity: activeColor}]}>
        <View style={styles.deviceInfoContainer}>
          <BoldText style={styles.deviceName}>{'Đèn 1'}</BoldText>
          <Text>{isActive ? 'Bật' : 'Tắt'}</Text>
        </View>
        <View style={styles.deviceStatusContainer}>
          <Switch
            style={styles.switch}
            value={isActive}
            trackColor={{true: 'white', false: 'grey'}}
            thumbColor={Color.secondary}
          />
          <View />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
