import React from 'react';
import {Animated, View, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';

import Text, {BoldText} from '../../../../Components/Text';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function RoomButton(props) {
  const {onPress, onLongPress, roomData, opacity, translateY} = props;
  return (
    <TouchableWithoutFeedback
      onLongPress={() => onLongPress(roomData.id)}
      onPress={() => onPress(roomData)}>
      <Animated.View
        style={[styles.BtnContainer, {transform: [{translateY}], opacity}]}>
        <FastImage
          source={{
            uri: roomData.background,
          }}
          style={styles.imgBg}
          resizeMode={FastImage.resizeMode.cover}
        />

        <BoldText style={styles.roomTitle}>{roomData.name}</BoldText>
        <View style={styles.descContainer}>
          <Icon name="activity" size={fontSize.normal} />
          <Text>{`${
            roomData.hasOwnProperty('devices')
              ? Object.keys(roomData.devices).length
              : 0
          } thiết bị`}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
