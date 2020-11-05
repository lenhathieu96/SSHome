import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {useNotify} from '../../../Hooks/useNotify';

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

  const BSBlueToothRef = useRef();
  const BSVoiceRef = useRef();

  const hardwareController = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [nearbyDevices, setNearbyDevices] = useState([]);
  const [isScanning, setScanning] = useState(false);

  useEffect(() => {
    if (hardwareController.WFConnection) {
      getUserProflie();
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardwareController.WFConnection]);

  useEffect(() => {
    if (hardwareController.BLController) {
      BleManager.start({showAlert: false});
      setUpBLConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.log(BLStoreDevice, 'store');
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
            console.log(device);
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
      Alert.alert('Cảnh Báo', 'Vui lòng kiểm tra kết nối bluetooth');
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
      <Weather />
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
        isScanning={isScanning}
        connectDevice={connectBLDevice}
        handleStopScan={handleStopScan}
      />
      <BSVoice ref={BSVoiceRef} />
      <LoadingModal isVisible={isLoading} />
    </RootContainer>
  );
}
