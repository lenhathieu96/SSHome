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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';

import {setUserProfile} from '../../../Redux/ActionCreators/userActions';
import {getMasterProfile, handleLogout} from '../../../Api/userAPI';

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

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [nearbyDevices, setNearbyDevices] = useState([]);

  const BSBlueToothRef = useRef();
  const connectionStatus = useSelector((state) => state.hardware);

  useEffect(() => {
    listenConnection();
    GetUserProflie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function GetUserProflie() {
    const currentUser = auth().currentUser;
    const userRole = await AsyncStorage.getItem('userRole');
    //Master role
    if (userRole === 'Master') {
      const MasterUser = await getMasterProfile(currentUser.uid);
      dispatch(setUserProfile(MasterUser));
    }
    //Member role
    else if (userRole === 'Member') {
      const homeID = await AsyncStorage.getItem('homeID');
      firestore()
        .collection('Home')
        .doc(homeID)
        .collection('Member')
        .where('phone', '==', auth().currentUser.phoneNumber)
        .onSnapshot((document) => {
          const UserData = document.docs[0];
          if (UserData) {
            let MemberUser = {
              name: UserData.data().name,
              phone: UserData.data().phone,
              email: UserData.data().email,
            };
            dispatch(setUserProfile(MemberUser));
          } else {
            handleLogout();
          }
        });
    }
  }
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
      <Header />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <RoomList navigation={navigation} />
        <IconButton
          iconName="microphone"
          iconColor={Color.primary}
          iconSize={fontSize.biggest}
          style={styles.floatButton}
          onPress={() => {
            let signupForm = {
              name: 'leeChongwei',
              phone: '+8432652065851',
              availableRoom: ['121', '123', '41231'],
            };
          }}
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
