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

import Header from './Header';
import Weather from './Weather';
import RoomList from './RoomList';
import BSBlueTooth from './BSBlueTooth';
import BSVoice from './BSVoice';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
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

  const [isLoading, setLoading] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState([]);
  const [isScanning, setScanning] = useState(false);

  useEffect(() => {
    if (hardware.WFEnabled) {
      getUserProflie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.WFEnabled]);

  useEffect(() => {
    if (hardware.BLController) {
      BleManager.start({showAlert: false});
      setUpBLEnabled();
      return () => {
        bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral');
        bleManagerEmitter.removeListener('BleManagerStopScan');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.BLEnabled, hardware.BLController]);

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

  const setUpBLEnabled = async () => {
    if (hardware.BLEnabled) {
      const BLStoreDevice = await AsyncStorage.getItem('ESP');
      if (BLStoreDevice) {
        const BLDevice = JSON.parse(BLStoreDevice);
        await connectBLDevice(BLDevice);
        BSBlueToothRef.current.snapTo(1);
      } else {
        hanldeStartScan();
      }
    } else {
      BSBlueToothRef.current.snapTo(1);
      alert('Vui lòng kiểm tra trạng thái bluetooth');
    }
  };

  const connectBLDevice = async (device) => {
    setLoading(true);
    BleManager.connect(device.id);
    let timeOut = setTimeout(async () => {
      await BleManager.isPeripheralConnected(device.id).then(
        async (isConnnected) => {
          setLoading(false);
          if (isConnnected) {
            const DeviceData = JSON.stringify(device);
            await AsyncStorage.setItem('ESP', DeviceData);
            notify('Kết nối thành công', true);
            BSBlueToothRef.current.snapTo(1);
          } else {
            notify('Kết nối thất bại', false);
          }
          clearTimeout(timeOut);
        },
      );
    }, 5000);

    //
    // setLoading(false);

    // setLoading(false);
    // console.log('connect fail', error);
  };

  const hanldeStartScan = () => {
    let devices = [];
    BSBlueToothRef.current.snapTo(0);
    bleManagerEmitter.addListener('BleManagerStopScan', () => {
      console.log('scan stopped');
      setNearbyDevices(devices);
      setScanning(false);
    });
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (device) => {
      let duplicateDevice = devices.filter((item) => item.id === device.id);
      if (duplicateDevice.length === 0) {
        devices.push(device);
      }
    });

    BleManager.scan([], 15, false).then(function () {
      return console.log('start scanning');
    }, setScanning(true));
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
    if (!hardware.WFEnabled && !hardware.BLController) {
      alert('Vui lòng kiểm tra trạng thái wifi');
    } else if (!hardware.BLEnabled && hardware.BLController) {
      alert('Vui lòng kiểm tra trạng thái bluetooth');
    } else {
      navigation.navigate('Room', {room: roomData});
    }
  };

  return (
    <RootContainer safeArea={false} style={{justifyContent: 'space-between'}}>
      <Header navigation={navigation} hanldeStartScan={hanldeStartScan} />
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
          onPress={() =>
            hardware.WFEnabled
              ? BSVoiceRef.current.snapTo(0)
              : alert('Vui lòng kiểm tra trạng thái wifi')
          }
        />
      </SafeAreaView>
      {/* BSBlueTooth */}
      <BSBlueTooth
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        isScanning={isScanning}
        connectDevice={connectBLDevice}
        hanldeStartScan={hanldeStartScan}
        handleStopScan={handleStopScan}
      />
      <BSVoice ref={BSVoiceRef} />
      <LoadingModal isVisible={isLoading} />
    </RootContainer>
  );
}
