/* eslint-disable react-hooks/exhaustive-deps */
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
import {getMasterProfile, getMemberProfile} from '../../../Api/userAPI';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';
import NotifyModal from '../../../Components/Modal/NotificationModal';
import LoadingModal from '../../../Components/Modal/LoadingModal';

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
  const BSBlueToothRef = useRef();

  const hardwareController = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  const [showNotify, setShowNotify] = useState(false);
  const [textNotify, setTextNotify] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [nearbyDevices, setNearbyDevices] = useState([]);
  //demo=================================================================
  const [deviceData, setDeviceData] = useState({});
  const [showUID, setShowUID] = useState(false);

  useEffect(() => {
    BLEManager.start({showAlert: false});
    listenConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserProflie();
    if (hardwareController.BLController) {
      setUpBLConnection();
    }
  }, [
    hardwareController.BLConnection,
    hardwareController.WFConnection,
    hardwareController.BLController,
  ]);

  const getUserProflie = async () => {
    const currentUser = auth().currentUser;
    const userRole = await AsyncStorage.getItem('userRole');

    const User =
      userRole === 'Master'
        ? await getMasterProfile(currentUser.uid)
        : await getMemberProfile(currentUser.phoneNumber);

    dispatch(setUserProfile(User));
    setLoading(false);
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
      setLoading(true);
      const BLStoreDevice = await AsyncStorage.getItem('ESP');
      if (BLStoreDevice) {
        console.log('start connect stored device');
        const BLDevice = JSON.parse(BLStoreDevice);
        await connectBLDevice(BLDevice);
      } else {
        BSBlueToothRef.current.snapTo(0);
        bleManagerEmitter.addListener('BleManagerStopScan', () => {
          setLoading(false);
          showNotification('Đã quét xong');
        });
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
          console.log('Start Scanning...');
        });
      }
    } else {
      BSBlueToothRef.current.snapTo(1);
      Alert.alert('Vui Lòng Kiểm Tra Trạng Thái BLuetooth');
    }
  };

  const connectBLDevice = async (device) => {
    try {
      console.log(device.id);
      await BLEManager.connect(device.id);
      const DeviceData = JSON.stringify(device);
      await AsyncStorage.setItem('ESP', DeviceData);
      showNotification('Kết nối thành công');
      BLEManager.retrieveServices(
        device.id,
        device.advertising.serviceUUIDs,
      ).then((peripheralInfo) => {
        setDeviceData(peripheralInfo);
        setShowUID(true);
      });
      BSBlueToothRef.current.snapTo(0);
    } catch (error) {
      console.log('connect fail', error);
      showNotification('Kết nối thất bại');
    }
  };

  const showNotification = (notitfy) => {
    setShowNotify(true);
    setTextNotify(notitfy);
    setTimeout(() => {
      setShowNotify(false);
      setTextNotify('');
    }, 1000);
  };
  return (
    <RootContainer safeArea={false} style={{justifyContent: 'space-between'}}>
      {/* Info Container */}
      <Header />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <RoomList navigation={navigation} data={userProfile.availableRooms} />

        <IconButton
          style={styles.floatButton}
          iconName="mic"
          iconColor={Color.primary}
          onPress={() => {}}
        />
      </SafeAreaView>
      {/* BSBlueTooth */}
      <BSBlueToothSearching
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        connectDevice={connectBLDevice}
        showUID={showUID}
        deviceData={deviceData}
      />
      <LoadingModal isVisible={isLoading} />
      <NotifyModal isVisible={showNotify} title={textNotify} />
    </RootContainer>
  );
}
