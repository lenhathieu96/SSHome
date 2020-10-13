import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  NativeModules,
  NativeEventEmitter,
  Dimensions,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
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
import {color} from 'react-native-reanimated';

const data = [
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
];

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const pathX = '357';
const pathY = '675';
const pathA = '689';
const pathB = '706';

export default function HomeScreen({navigation}) {
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
      <View style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <FlatList
          data={data}
          contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'flex-start'}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <RoomButton navigation={navigation} roomData={item} />
          )}
          style={styles.roomlist}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
      <View style={styles.floatBtnContainer}>
        <IconButton
          iconName="microphone"
          iconSize={fontSize.biggest}
          iconColor={Color.primary}
          style={styles.btnMic}
        />
      </View>
      <View style={styles.footer} />
      {/* BSBlueTooth */}
      <BSBlueToothSearching
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        stopSearchingBLDevices={stopSearchingBLDevices}
      />
    </RootContainer>
  );
}
