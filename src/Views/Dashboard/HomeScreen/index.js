import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Alert,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import BLEManager from 'react-native-ble-manager';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import RootContainer from '../../../Components/RootContainer';
import Text, {BoldText} from '../../../Components/Text';
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
  {
    name: 'Phòng Tắm',
    roomtypeID: 3,
    deviceQuantity: 8,
  },
];

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HomeScreen({navigation}) {
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
      {/* Header */}
      <SafeAreaView style={[styles.headerContainer, {height: 80}]}>
        <Icon.Button
          name="bar-chart-2"
          style={[styles.headerButton, {transform: [{rotate: '90deg'}]}]}
          size={fontSize.bigger}
          backgroundColor="transparent"
          color={connectionStatus.WFConnection ? Color.primary : Color.unactive}
          onPress={() => navigation.openDrawer()}
          underlayColor="transparent"
          activeOpacity={0.4}
        />
        <BoldText style={styles.headerTitle}>SSHOME</BoldText>
        <Icon.Button
          name="wifi"
          style={styles.headerButton}
          size={fontSize.bigger}
          color={connectionStatus.WFConnection ? Color.green : Color.unactive}
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.4}
          onPress={() => setUpBLConnection()}
        />
      </SafeAreaView>
      {/* Info Container */}
      <View style={styles.infoContainer}>
        <View styles={styles.weatherContainer}>
          <Icon
            name="cloud-drizzle"
            size={fontSize.bigger}
            color={Color.primary}
            style={{alignSelf: 'center'}}
          />
          <Text> Mưa</Text>
        </View>
        <View styles={styles.weatherContainer}>
          <View style={styles.txtWeatherContainer}>
            <BoldText style={styles.txtWeather}>{32}</BoldText>
            <Text>°C</Text>
          </View>
          <Text> Ngoài Trời</Text>
        </View>
        <View styles={styles.weatherContainer}>
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <RoomButton navigation={navigation} roomData={item} />
          )}
          style={styles.roomlist}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
      {/* BSBlueTooth */}
      <BSBlueToothSearching
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        stopSearchingBLDevices={stopSearchingBLDevices}
      />
    </RootContainer>
  );
}
