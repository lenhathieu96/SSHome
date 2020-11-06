import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, NativeModules, NativeEventEmitter} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {useNotify, useAlert} from '../../../Hooks/useModal';

import {setUserProfile} from '../../../Redux/ActionCreators/userActions';
import {getMasterProfile, getMemberProfile} from '../../../Api/userAPI';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';
import LoadingModal from '../../../Components/Modal/LoadingModal';

import Weather from './Weather';
import RoomList from './RoomList';
import BSBlueTooth from './BSBlueTooth';
import BSVoice from './BSVoice';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const notify = useNotify();
  const alert = useAlert();

  const BSBlueToothRef = useRef();
  const BSVoiceRef = useRef();

  const hardware = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [nearbyDevices, setNearbyDevices] = useState([]);
  const [isScanning, setScanning] = useState(false);

  useEffect(() => {
    if (hardware.WFConnection) {
      getUserProflie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.WFConnection]);

  useEffect(() => {
    if (hardware.BLController) {
      BleManager.start({showAlert: false});
      setUpBLConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.BLConnection, hardware.BLController]);

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
    if (hardware.BLConnection) {
      const BLStoreDevice = await AsyncStorage.getItem('ESP');
      if (BLStoreDevice) {
        const BLDevice = JSON.parse(BLStoreDevice);
        await connectBLDevice(BLDevice);
        BSBlueToothRef.current.snapTo(1);
      } else {
        //clear old data
        let devices = [];
        BSBlueToothRef.current.snapTo(0);
        bleManagerEmitter.addListener('BleManagerStopScan', () => {
          console.log('scan stopped');
          setNearbyDevices(devices);
          setScanning(false);
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

        BleManager.scan([], 15, false).then(function () {
          return console.log('start scanning');
        }, setScanning(true));
      }
    } else {
      BSBlueToothRef.current.snapTo(1);
      alert('Vui lòng kiểm tra trạng thái bluetooth');
    }
  };

  const connectBLDevice = async (device) => {
    try {
      setLoading(true);
      await BleManager.connect(device.id);
      const DeviceData = JSON.stringify(device);
      setLoading(false);
      await AsyncStorage.setItem('ESP', DeviceData);
      notify('Kết nối thành công');
      BSBlueToothRef.current.snapTo(1);
    } catch (error) {
      setLoading(false);
      console.log('connect fail', error);
      notify('Kết nối thất bại');
    }
  };

  const handleStopScan = () => {
    BleManager.stopScan();
  };

  const onRoomLongPress = async (roomID) => {
    // const homeID = await AsyncStorage.getItem('homeID');
    // const userRole = await AsyncStorage.getItem('userRole');
    // if(userRole==='Master'){
    //   const response = await deleteRoom(homeID, roomID);
    // }
  };

  const onRoomPress = (roomData) => {
    if (!hardware.WFConnection && !hardware.BLController) {
      alert('Vui lòng kiểm tra trạng thái wifi');
    } else if (!hardware.BLConnection && hardware.BLController) {
      alert('Vui lòng kiểm tra trạng thái bluetooth');
    } else {
      navigation.navigate('Room', {room: roomData});
    }
  };

  return (
    <RootContainer safeArea={false} style={{justifyContent: 'space-between'}}>
      {/* Info Container */}
      <Weather />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <RoomList
          onRoomPress={onRoomPress}
          data={userProfile.availableRooms}
          onRoomLongPress={onRoomLongPress}
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
        isScanning={isScanning}
        connectDevice={connectBLDevice}
        handleStopScan={handleStopScan}
      />
      <BSVoice ref={BSVoiceRef} />
      <LoadingModal isVisible={isLoading} />
    </RootContainer>
  );
}
