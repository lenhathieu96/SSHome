import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  Dimensions,
  Animated,
  Text,
} from 'react-native';

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
  const {roomData, pictureUri} = route.params;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [customHeader, setCustomHeader] = useState(false);
  const [bgHeader, setBgHeader] = useState(livingRoomHeader);
  const [isBtnChangeVisible, setBtnChangeVisible] = useState(false);
  const [listDevices, setListDevices] = useState(deviceData);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (pictureUri) {
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
        <BoldText style={styles.deviceTitle}>Danh Sách Thiết Bị</BoldText>
        <Animated.FlatList
          style={styles.listDevice}
          contentContainerStyle={{alignItems: 'flex-end'}}
          data={listDevices}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={ITEM_SIZE}
          //speed of scroll, normal is 0.9
          decelerationRate={0.5}
          bounces={false}
          horizontal
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -(0.2 * ITEM_SIZE), 0],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
            });
            if (!item.name) {
              return (
                <View
                  style={{
                    width: SPACER_SIZE,
                  }}
                />
              );
            }
            return (
              <DeviceButton
                opacity={opacity}
                translateY={translateY}
                index={index}
                name={item.name}
                status={item.status}
                onChangeDeviceStatus={onChangeDeviceStatus}
              />
            );
          }}
        />
      </View>

      <View style={styles.footerContainer}>
        <IconButton
          iconName="sync-alt"
          iconColor={'black'}
          iconSize={fontSize.larger}
        />
        <IconButton
          iconName="microphone"
          iconColor={Color.primary}
          iconSize={fontSize.biggest}
          style={styles.floatButton}
        />
        <IconButton
          iconName="plus"
          iconColor={'black'}
          iconSize={fontSize.huge}
        />
      </View>
    </RootContainer>
  );
}
