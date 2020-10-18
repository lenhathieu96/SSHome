import React, {useEffect, useState} from 'react';
import {Image, Animated, View} from 'react-native';

import Text, {BoldText} from '../../../../Components/Text';
import IconButton from '../../../../Components/IconButton';

import livingRoomIcon from '../../../../Assets/Images/livingroom.png';
import bedRoomIcon from '../../../../Assets/Images/bedroom.png';
import bathRoomIcon from '../../../../Assets/Images/bathroom.png';
import kitchenIcon from '../../../../Assets/Images/kitchen.png';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function RoomButton(props) {
  const {navigation, roomData, opacity, translateY} = props;
  const [roomIcon, setRoomIcon] = useState(livingRoomIcon);
  useEffect(() => {
    switch (roomData.roomtypeID) {
      case 0:
        setRoomIcon(livingRoomIcon);
        break;
      case 1:
        setRoomIcon(bedRoomIcon);
        break;
      case 2:
        setRoomIcon(kitchenIcon);
        break;
      case 3:
        setRoomIcon(bathRoomIcon);
        break;
      default:
        setRoomIcon(livingRoomIcon);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[styles.BtnContainer, {transform: [{translateY}], opacity}]}>
      <View style={styles.contentContainer}>
        <Image source={roomIcon} />
        <BoldText>{roomData.name}</BoldText>
        <Text> {roomData.deviceQuantity} thiết bị </Text>
        <IconButton
          style={styles.btnGetIn}
          iconName="door-open"
          iconColor="white"
          iconSize={fontSize.biggest}
          onPress={() => navigation.navigate('Room', {roomData})}
        />
      </View>
    </Animated.View>
  );
}
