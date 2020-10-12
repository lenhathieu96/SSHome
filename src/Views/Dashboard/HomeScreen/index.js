import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  NativeModules,
  NativeEventEmitter,
  Dimensions,
  Animated,
} from 'react-native';

import {useHeaderHeight} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import BLEManager from 'react-native-ble-manager';
import NetInfo from '@react-native-community/netinfo';

import RootContainer from '../../../Components/RootContainer';
import Text, {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';
import BSBlueToothSearching from './BSBlueTooth';
import RoomButton from './RoomButton';

import {
  setBLConnection,
  setInternetConnection,
} from '../../../Redux/ActionCreators/hardwareActions';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

const data = [
  {},
  {
    name: 'Phòng Khách',
    roomtypeID: 0,
    deviceQuantity: 4,
  },
  {
    name: 'Phòng Ngủ',
    roomtypeID: 1,
    deviceQuantity: 5,
  },
  {
    name: 'Phòng Bếp',
    roomtypeID: 2,
    deviceQuantity: 6,
  },
  {
    name: 'Phòng Tắm',
    roomtypeID: 3,
    deviceQuantity: 8,
  },

  {
    name: 'Phòng Tắm',
    roomtypeID: 3,
    deviceQuantity: 8,
  },
  {},
];

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HomeScreen({navigation}) {
  const {width} = Dimensions.get('window');

  const ITEM_SIZE = 0.7 * width;
  const SPACER_SIZE = (width - ITEM_SIZE) / 2;
  const scrollX = useRef(new Animated.Value(0)).current;

  const headerHeight = useHeaderHeight();
  const [nearbyDevices, setNearbyDevices] = useState([]);

  const BSBlueToothRef = useRef();

  const dispatch = useDispatch();
  const connectionStatus = useSelector((state) => state.hardware);

  useEffect(() => {
    listenConnection();
  }, []);

  //listener Internet and Bluetooth connection
  const listenConnection = async () => {
    BLEManager.checkState();
    bleManagerEmitter.addListener('BleManagerDidUpdateState', (args) => {
      let status = args.state;
      switch (status) {
        case 'off':
          dispatch(setBLConnection(false));
          break;
        case 'on':
          dispatch(setBLConnection(true));
          break;
        default:
          break;
      }
    });

    NetInfo.addEventListener((state) => {
      dispatch(setInternetConnection(state.isConnected));
    });
  };

  const setUpBLConnection = () => {
    if (connectionStatus.BLConnection) {
      BSBlueToothRef.current.snapTo(0);
      bleManagerEmitter.addListener('BleManagerStopScan', () =>
        console.log('scan stopped'),
      );
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        (device) => {
          let duplicateDevice = nearbyDevices.filter(
            (item) => item.id === device.id,
          );
          if (duplicateDevice.length === 0) {
            nearbyDevices.push(device);
            setNearbyDevices([...nearbyDevices]);
          }
        },
      );
      BLEManager.scan([], 15, true).then(() => {
        console.log('Scanning...');
        // setScanning(true);
      });
    } else {
      Alert.alert('Vui Lòng Kiểm Tra Trạng Thái BLuetooth');
    }
  };

  const stopSearchingBLDevices = () => {
    BLEManager.stopScan().then(() => console.log('scan set stopped'));
    BSBlueToothRef.current.snapTo(1);
    bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral');
    setNearbyDevices([]);
  };
  return (
    <RootContainer>
      {/* Info Container */}
      <View style={[styles.infoContainer, {marginTop: headerHeight}]}>
        <View style={styles.weatherContainer}>
          <Icon
            name="cloud-drizzle"
            size={fontSize.bigger}
            color={Color.primary}
            style={{alignSelf: 'center'}}
          />
          <Text> Mưa</Text>
        </View>
        <View style={styles.weatherContainer}>
          <View style={styles.txtWeatherContainer}>
            <BoldText style={styles.txtWeather}>{32}</BoldText>
            <Text>°C</Text>
          </View>
          <Text> Ngoài Trời</Text>
        </View>
        <View style={styles.weatherContainer}>
          <View style={styles.txtWeatherContainer}>
            <BoldText style={styles.txtWeather}>{26}</BoldText>
            <Text>°C</Text>
          </View>
          <Text> Trong Nhà</Text>
        </View>
      </View>

      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <Animated.FlatList
          style={styles.roomlist}
          contentContainerStyle={{alignItems: 'flex-end'}}
          data={data}
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
              <RoomButton
                navigation={navigation}
                roomData={item}
                opacity={opacity}
                translateY={translateY}
              />
            );
          }}
        />
        <IconButton
          iconName="microphone"
          iconColor={Color.primary}
          iconSize={fontSize.biggest}
          style={styles.floatButton}
        />
      </SafeAreaView>

      {/* BSBlueTooth */}
      <BSBlueToothSearching
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        stopSearchingBLDevices={stopSearchingBLDevices}
      />
    </RootContainer>
  );
}
