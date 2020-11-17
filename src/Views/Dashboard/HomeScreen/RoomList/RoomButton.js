import React from 'react';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import roomBackground from '../../../../Assets/Images/roomBackground1.jpg';
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
        <ImageBackground
          source={
            roomData.background
              ? {
                  uri: roomData.background,
                }
              : roomBackground
          }
          borderRadius={30}
          style={styles.imgBg}
          resizeMode="cover">
          <BoldText style={styles.roomTitle}>{roomData.name}</BoldText>
          <View style={styles.descContainer}>
            <Icon
              name="activity"
              size={fontSize.normal}
              color={Color.secondary}
            />
            <Text style={{color: Color.secondary}}>{`${
              roomData.hasOwnProperty('devices')
                ? Object.keys(roomData.devices).length
                : 0
            } thiết bị`}</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
