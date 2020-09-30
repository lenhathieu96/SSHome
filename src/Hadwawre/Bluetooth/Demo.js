import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {BoldText} from './src/Components/Text';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function Demo() {
  const [deviceConnection, setDeviceConnection] = useState({});
  const [nearbyDevices, setNearbyDevices] = useState([]);
  const [isScanning, setScanning] = useState(false);
  useEffect(() => {
    BleManager.start({showAlert: false});

    if (Platform.OS === 'android') {
      checkPermission();
      BleManager.enableBluetooth();
    }
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (device) => {
      handleDiscoverPeripheral(device);
    });
    bleManagerEmitter.addListener('BleManagerStopScan', () =>
      setScanning(false),
    );
    // BleManager.scan([], 15, true)
    //   .then('start scanning')
    //   .catch((error) => console.log('Error when scanning', error));
    return bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral');
  }, []);

  const checkPermission = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ).then((result) => {
      if (result) {
        BleManager.start({showAlert: false});
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ).then((result) => {
          if (result) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
  };
  const handleDiscoverPeripheral = (device) => {
    let tempDeviceList = nearbyDevices;
    let duplicateDevice = tempDeviceList.filter(
      (item) => item.id === device.id,
    );
    if (duplicateDevice.length === 0) {
      tempDeviceList.push(device);
      setNearbyDevices(tempDeviceList);
    }
  };
  const startScan = () => {
    if (!isScanning) {
      setNearbyDevices([]);
      BleManager.scan([], 15, true).then(() => {
        console.log('Scanning...');
        setScanning(true);
      });
    }
  };
  const stopScan = () => {
    BleManager.stopScan().then(() => {
      console.log('Scan stopped');
    });
    setScanning(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: index % 2 === 0 ? 'gray' : 'white',
          padding: 10,
          borderRadius: 20,
        }}>
        <Text>ID: {item.id}</Text>
        <Text>Tên: {item.name === null ? 'No Name' : item.name}</Text>
        <Text>
          {item.advertising.isConnectable
            ? 'Có thể kết nối'
            : 'Không thể kết nối'}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{padding: 10, flex: 1}}>
      <Text>
        Trạng Thái Kết Nối:{' '}
        {Object.keys(deviceConnection).length > 0
          ? `Đang kết nối với${deviceConnection.name}`
          : 'Chưa có thiết bị nào được kết nối'}
      </Text>

      <TouchableOpacity
        onPress={() => (isScanning ? stopScan() : startScan())}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
          width: 200,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <BoldText style={{color: 'white'}}>
          {isScanning ? 'Dừng Tìm' : 'Tìm Kiếm'}
        </BoldText>
      </TouchableOpacity>
      <Text>Danh Sách Thiết Bị Lân Cận: </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={nearbyDevices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
