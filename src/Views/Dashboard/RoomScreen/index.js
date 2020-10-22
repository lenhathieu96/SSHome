import React, {useEffect, useState, useRef} from 'react';
import {View, ImageBackground, Dimensions, Animated} from 'react-native';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import DeviceButton from './DeviceButton';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';
import livingRoomHeader from '../../../Assets/Images/livingRoomHeader.png';
import bedRoomHeader from '../../../Assets/Images/bedroomHeader.png';
import kitchenHeader from '../../../Assets/Images/kitchenHeader.png';
import bathRoomHeader from '../../../Assets/Images/bathroomHeader.png';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';
import Color from '../../../Utils/Color';

const deviceData = [
  {},
  {
    name: 'Đèn 1',
    status: false,
  },
  {
    name: 'Đèn 2',
    status: true,
  },
  {
    name: 'Đèn 3',
    status: false,
  },
  {
    name: 'Đèn 3',
    status: false,
  },
  {
    name: 'Đèn 5',
    status: false,
  },
  {
    name: 'Đèn 4',
    status: false,
  },
  {},
];

const {width} = Dimensions.get('window');

const ITEM_SIZE = 0.6 * width;
const SPACER_SIZE = (width - ITEM_SIZE) / 2;

export default function RoomDetailScreen({navigation, route}) {
  const {roomData, pictureUri, imgBG} = route.params;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [customHeader, setCustomHeader] = useState(false);
  const [bgHeader, setBgHeader] = useState(livingRoomHeader);
  const [isBtnChangeVisible, setBtnChangeVisible] = useState(false);
  const [listDevices, setListDevices] = useState(deviceData);

  useEffect(() => {
    if (route.params?.pictureUri) {
      setCustomHeader(true);
      setBgHeader(route.params.pictureUri);
      setBtnChangeVisible(true);
    } else {
      switch (roomData.roomtypeID) {
        case 0:
          setBgHeader(livingRoomHeader);
          break;
        case 1:
          setBgHeader(bedRoomHeader);
          break;
        case 2:
          setBgHeader(kitchenHeader);
          break;
        case 3:
          setBgHeader(bathRoomHeader);
          break;
        default:
          setBgHeader(livingRoomHeader);
          break;
      }
    }
  }, [route.params?.pictureUri, roomData.roomtypeID]);

  //control device
  const onChangeDeviceStatus = (index, status) => {
    let devices = [...listDevices];
    devices[index].status = status;
    setListDevices(devices);
  };

  const onConfirmPicture = () => {
    setBtnChangeVisible(false);
  };

  return (
    <ImageBackground source={imgBG}>
    
    </ImageBackground>
  );
}
