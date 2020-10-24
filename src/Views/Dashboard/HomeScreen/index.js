import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import BLEManager from 'react-native-ble-manager';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';

import {setUserProfile} from '../../../Redux/ActionCreators/userActions';
import {
  getMasterProfile,
  getMemberProfile,
  handleLogout,
} from '../../../Api/userAPI';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';

import Header from './Header';
import RoomList from './RoomList';
import BSBlueToothSearching from './BSBlueTooth';

import {
  setBLConnection,
  setInternetConnection,
} from '../../../Redux/ActionCreators/hardwareActions';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function HomeScreen({navigation}) {
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const dispatch = useDispatch();
  const [nearbyDevices, setNearbyDevices] = useState([]);

  const BSBlueToothRef = useRef();
  const hardwareController = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  useEffect(() => {
    listenConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserProflie();
    if (hardwareController.BLController) {
      setUpBLConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardwareController.BLConnection, hardwareController.WFConnection]);

  const getUserProflie = async () => {
    const currentUser = auth().currentUser;
    const userRole = await AsyncStorage.getItem('userRole');

    const User =
      userRole === 'Master'
        ? await getMasterProfile(currentUser.uid)
        : await getMemberProfile(currentUser.phoneNumber);

    dispatch(setUserProfile(User));
  };

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

  const setUpBLConnection = async () => {
    if (hardwareController.BLConnection) {
      const BLDevice = await AsyncStorage.getItem('BLDevice');
      if (BLDevice) {
      } else {
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
      }
    } else {
      BSBlueToothRef.current.snapTo(1);
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
      <Header />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <RoomList navigation={navigation} data={userProfile.availableRoom} />
        <IconButton
          iconName="microphone"
          iconColor={Color.primary}
          iconSize={fontSize.bigger}
          style={styles.floatButton}
          onPress={() => {}}
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
