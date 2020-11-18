import React from 'react';
import {Animated, View, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';

import Text, {BoldText} from '../../../../Components/Text';
import Color from '../../../../Utils/Color';
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
        <SharedElement id={`item.${roomData.id}.photo`}>
          <FastImage
            source={{uri: roomData.background}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imgBg}
          />
        </SharedElement>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
