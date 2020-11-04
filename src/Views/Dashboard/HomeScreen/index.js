/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
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
import BSVoice from './BSVoice';

import {
  setBLConnection,
  setInternetConnection,
} from '../../../Redux/ActionCreators/hardwareActions';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';

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
  //demo=================================================================
  const [deviceData, setDeviceData] = useState({});
  const [deviceID, setDeviceID] = useState();
  const [showUID, setShowUID] = useState(false);

  useEffect(() => {
    // BLEManager.start({showAlert: false});
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
    // BLEManager.checkState();
    // bleManagerEmitter.addListener('BleManagerDidUpdateState', (args) => {
    //   let status = args.state;
    //   switch (status) {
    //     case 'off':
    //       dispatch(setBLConnection(false));
    //       break;
    //     case 'on':
    //       dispatch(setBLConnection(true));
    //       break;
    //     default:
    //       break;
    //   }
    // });

    NetInfo.addEventListener((state) => {
      dispatch(setInternetConnection(state.isConnected));
    });
  };

  const setUpBLConnection = async () => {
    // if (hardwareController.BLConnection) {
    //   setLoading(true);
    //   const BLStoreDevice = await AsyncStorage.getItem('ESP');
    //   if (BLStoreDevice) {
    //     console.log('start connect stored device');
    //     const BLDevice = JSON.parse(BLStoreDevice);
    //     await connectBLDevice(BLDevice);
    //   } else {
    //     BSBlueToothRef.current.snapTo(0);
    //     bleManagerEmitter.addListener('BleManagerStopScan', () => {
    //       setLoading(false);
    //       showNotification('Đã quét xong');
    //     });
    //     bleManagerEmitter.addListener(
    //       'BleManagerDiscoverPeripheral',
    //       (device) => {
    //         let duplicateDevice = nearbyDevices.filter(
    //           (item) => item.id === device.id,
    //         );
    //         if (duplicateDevice.length === 0) {
    //           nearbyDevices.push(device);
    //           setNearbyDevices([...nearbyDevices]);
    //         }
    //       },
    //     );
    //     BLEManager.scan([], 15, true).then(() => {
    //       console.log('Start Scanning...');
    //     });
    //   }
    // } else {
    //   BSBlueToothRef.current.snapTo(1);
    //   Alert.alert('Vui Lòng Kiểm Tra Trạng Thái BLuetooth');
    // }
  };

  const connectBLDevice = async (device) => {
    // try {
    //   console.log(device.id);
    //   await BLEManager.connect(device.id);
    //   const DeviceData = JSON.stringify(device);
    //   await AsyncStorage.setItem('ESP', DeviceData);
    //   showNotification('Kết nối thành công');
    //   setDeviceID(device.id);
    //   BLEManager.retrieveServices(
    //     device.id,
    //     device.advertising.serviceUUIDs,
    //   ).then((peripheralInfo) => {
    //     setDeviceData(peripheralInfo);
    //     setShowUID(true);
    //   });
    //   BSBlueToothRef.current.snapTo(0);
    // } catch (error) {
    //   console.log('connect fail', error);
    //   showNotification('Kết nối thất bại');
    // }
  };

  const sendData = async () => {
    // const peripheralInfo = await BLEManager.retrieveServices(deviceID);
    // console.log('peripheralInfo first for writing', peripheralInfo);
    // let str = 'test';
    // let bytes = bytesCounter.count(str); // count the number of bytes
    // let data = stringToBytes(str);
    // if (!peripheralInfo) {
    //   return;
    // }
    // try {
    //   await BLEManager.write(
    //     deviceID,
    //     '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
    //     'beb5483e-36e1-4688-b7f5-ea07361b26a8',
    //     data,
    //     bytes,
    //   );
    //   Alert.alert('Kết Quả', 'Thành Công');
    //   // console.log(`Settings written on device ${DEVICE_UUID}`);
    //   // this.setState({ settings: [...settingsArray] });
    // } catch (error) {
    //   Alert.alert('Kết Quả', error);
    // }
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
      <BSBlueToothSearching
        ref={BSBlueToothRef}
        listDevice={nearbyDevices}
        connectDevice={connectBLDevice}
        showUID={showUID}
        deviceData={deviceData}
        sendData={sendData}
      />
      <BSVoice ref={BSVoiceRef} />
      <LoadingModal isVisible={isLoading} />
      <NotifyModal isVisible={showNotify} title={textNotify} />
    </RootContainer>
  );
}
