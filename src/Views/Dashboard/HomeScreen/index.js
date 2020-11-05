/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import BLEManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

import {setUserProfile} from '../../../Redux/ActionCreators/userActions';
import {getMasterProfile, getMemberProfile} from '../../../Api/userAPI';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';
import NotifyModal from '../../../Components/Modal/NotificationModal';
import LoadingModal from '../../../Components/Modal/LoadingModal';

import Header from './Header';
import RoomList from './RoomList';
import BSBlueTooth from './BSBlueTooth';
import BSVoice from './BSVoice';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const BSBlueToothRef = useRef();
  const BSVoiceRef = useRef();

  const hardwareController = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  const [showNotify, setShowNotify] = useState(false);
  const [textNotify, setTextNotify] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [nearbyDevices, setNearbyDevices] = useState([]);

  useEffect(() => {
    if (hardwareController.WFConnection) {
      getUserProflie();
    }
  }, [hardwareController.WFConnection]);

  useEffect(() => {
    if (hardwareController.BLController) {
      BLEManager.start({showAlert: false});
      setUpBLConnection();
    }
  }, [hardwareController.BLConnection, hardwareController.BLController]);

  const getUserProflie = async () => {
    const currentUser = auth().currentUser;
    const userRole = await AsyncStorage.getItem('userRole');
    const response =
      userRole === 'Master'
        ? await getMasterProfile(currentUser.uid)
        : await getMemberProfile(currentUser.phoneNumber);
    console.log(response.message);
    if (response.result) {
      dispatch(setUserProfile(response.data));
    }
    setLoading(false);
  };

  const setUpBLConnection = async () => {
    if (hardwareController.BLConnection) {
      const BLStoreDevice = await AsyncStorage.getItem('ESP');
      if (BLStoreDevice) {
        const BLDevice = JSON.parse(BLStoreDevice);
        await connectBLDevice(BLDevice);
      } else {
        //clear old data
        setNearbyDevices([]);
        let devices = [];
        BSBlueToothRef.current.snapTo(0);
        bleManagerEmitter.addListener('BleManagerStopScan', () => {
          console.log('scan stopped');
          setNearbyDevices(devices);
        });
        bleManagerEmitter.addListener(
          'BleManagerDiscoverPeripheral',
          (device) => {
            let duplicateDevice = devices.filter(
              (item) => item.id === device.id,
            );
            if (duplicateDevice.length === 0) {
              devices.push(device);
            }
          },
        );
        BLEManager.scan([], 15, false).then(() =>
          console.log('start scanning'),
        );
      }
    } else {
      BSBlueToothRef.current.snapTo(1);
      Alert.alert('Cảnh Báo', 'Vui lòng kiểm tra kết nối bluetooth');
    }
  };

  const connectBLDevice = async (device) => {
    try {
      await BLEManager.connect(device.id);
      const DeviceData = JSON.stringify(device);
      await AsyncStorage.setItem('ESP', DeviceData);
      showNotification('Kết nối thành công');
      BSBlueToothRef.current.snapTo(0);
    } catch (error) {
      console.log('connect fail', error);
      showNotification('Kết nối thất bại');
    }
  };

  const handleStopScan = () => {
    BLEManager.stopScan();
  };

  const showNotification = (notitfy) => {
    setShowNotify(true);
    setTextNotify(notitfy);
    setTimeout(() => {
      setShowNotify(false);
      setTextNotify('');
    }, 1000);
  };

  const onLongPressRoom = async (roomID) => {
    // const homeID = await AsyncStorage.getItem('homeID');
    // const userRole = await AsyncStorage.getItem('userRole');
    // if(userRole==='Master'){
    //   const response = await deleteRoom(homeID, roomID);
    // }
  };

  return (
    <RootContainer safeArea={false} style={{justifyContent: 'space-between'}}>
      {/* Info Container */}
      <Header />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <RoomList
          navigation={navigation}
          data={userProfile.availableRooms}
          onLongPress={onLongPressRoom}
        />

        <IconButton
          style={styles.floatButton}
          iconName="mic"
          iconColor={Color.primary}
          onPress={() => BSVoiceRef.current.snapTo(0)}
        />
      </SafeAreaView>
      {/* BSBlueTooth */}
      <BSBlueTooth
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        connectDevice={connectBLDevice}
        handleStopScan={handleStopScan}
      />
      <BSVoice ref={BSVoiceRef} />
      <LoadingModal isVisible={isLoading} />
      <NotifyModal isVisible={showNotify} title={textNotify} />
    </RootContainer>
  );
}
