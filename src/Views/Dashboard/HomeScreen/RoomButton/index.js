import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Text, {BoldText} from '../../../../Components/Text';

import livingRoomIcon from '../../../../Assets/Images/livingroom.png';
import bedRoomIcon from '../../../../Assets/Images/bedroom.png';
import bathRoomIcon from '../../../../Assets/Images/bathroom.png';
import kitchenIcon from '../../../../Assets/Images/kitchen.png';

import styles from './styles/index.css';

export default function RoomButton({navigation, roomData}) {
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
    <TouchableOpacity
      style={styles.BtnContainer}
      onPress={() => navigation.navigate('Room', {roomData})}>
      <Image source={roomIcon} />
      <BoldText>{roomData.name}</BoldText>
      <Text> {roomData.deviceQuantity} thiết bị </Text>
    </TouchableOpacity>
  );
}
