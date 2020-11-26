import React from 'react';
import {Animated, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';

import Text, {BoldText} from '../../../../Components/Text';
import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function RoomButton(props) {
  const {onPress, onLongPress, roomData, opacity, translateY} = props;
  return (
    <TouchableWithoutFeedback
      onLongPress={() => onLongPress(roomData)}
      onPress={() => onPress(roomData)}>
      <Animated.View
        style={[styles.BtnContainer, {transform: [{translateY}], opacity}]}>
        <SharedElement id={`item.${roomData.id}.photo`}>
          <FastImage
            source={{uri: roomData.background}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imgBg}
          />
        </SharedElement>
        <LinearGradient
          colors={['white', Color.background]}
          style={styles.roomNameContainer}>
          <BoldText style={styles.roomTitle}>{roomData.name}</BoldText>
        </LinearGradient>
        <LinearGradient
          colors={[Color.background, 'white']}
          style={styles.descContainer}>
          <Icon name="activity" />
          <Text>
            {roomData.devices ? Object.keys(roomData.devices).length : 0} Thiết
            Bị
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
