import React, {useEffect, useState} from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';

import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function RoomButton(props) {
  const {navigation, roomData, opacity, translateY} = props;

  return (
    <Animated.View
      style={[styles.BtnContainer, {transform: [{translateY}], opacity}]}>
      <TouchableOpacity
        style={styles.BtnContainer}
        onPress={() => navigation.navigate('Room', {room: roomData})}>
        <SharedElement id={`item.${roomData.id}.photo`}>
          <FastImage
            source={{
              uri: roomData.background,
            }}
            style={styles.imgBg}
            resizeMode={FastImage.resizeMode.cover}
          />
        </SharedElement>
        <BoldText style={styles.roomTitle}>{roomData.name}</BoldText>
        <View style={styles.descContainer}>
          <Icon name="activity" size={fontSize.normal} />
          <Text>{`${Object.keys(roomData.devices).length} thiết bị`}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
