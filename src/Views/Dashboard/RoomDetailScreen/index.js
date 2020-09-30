import React, {useEffect, useState} from 'react';
import {View, ImageBackground, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import RootContainer from '../../../Components/RootContainer';
import Text from '../../../Components/Text';
import {BoldText} from '../../../Components/Text';
import DeviceButton from './DeviceButton';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';
import livingRoomHeader from '../../../Assets/Images/livingRoomHeader.png';
import bedRoomHeader from '../../../Assets/Images/bedroomHeader.png';
import kitchenHeader from '../../../Assets/Images/kitchenHeader.png';
import bathRoomHeader from '../../../Assets/Images/bathroomHeader.png';
import TextButton from '../../../Components/TextButton';

const deviceData = [
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
    name: 'Đèn 4',
    status: true,
  },
];

export default function RoomDetailScreen({navigation, route}) {
  const {roomData, pictureUri} = route.params;

  const [customHeader, setCustomHeader] = useState(false);
  const [bgHeader, setBgHeader] = useState(livingRoomHeader);
  const [isBtnChangeVisible, setBtnChangeVisible] = useState(false);
  const [listDevices, setListDevices] = useState(deviceData);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (pictureUri) {
        console.log('got picture uri');
        setCustomHeader(true);
        setBgHeader(pictureUri);
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
    });
    return unsubscribe;
  }, [navigation, pictureUri, roomData.roomtypeID]);

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
    <RootContainer safeArea={false}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={customHeader ? {uri: bgHeader} : bgHeader}
          style={styles.headerBg}
          resizeMode="stretch"
          imageStyle={styles.imgBg}
        />
        <View style={styles.titleContainer}>
          {isBtnChangeVisible ? (
            <TextButton
              text="Lưu thay đổi"
              onPress={() => onConfirmPicture()}
              style={styles.btnChangeBg}
              textStyle={styles.txtBtnChangeBg}
            />
          ) : null}
          <BoldText style={styles.title}>{roomData.name}</BoldText>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          numColumns={2}
          data={listDevices}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listDevice}
          renderItem={({item, index}) => (
            <DeviceButton
              index={index}
              name={item.name}
              status={item.status}
              onChangeDeviceStatus={onChangeDeviceStatus}
            />
          )}
        />
      </View>
    </RootContainer>
  );
}
