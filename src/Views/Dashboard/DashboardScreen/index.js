import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BLEManager from 'react-native-ble-manager';
import NetInfo from '@react-native-community/netinfo';

import Text, {BoldText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';

import {
  setBLConnection,
  setInternetConnection,
} from '../../../Redux/ActionCreators/hardwareActions';

import RoomButton from './RoomButton';

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
];
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function Dashboard({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    listenConnection();
  }, []);

  //listener Internet and Bluetooth connection
  const listenConnection = () => {
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

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Info Container */}
      <View style={styles.infoContainer}>
        <View styles={styles.weatherContainer}>
          <Icon
            name="cloud-showers-heavy"
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
      <View style={styles.listContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <RoomButton navigation={navigation} roomData={item} />
          )}
          contentContainerStyle={styles.roomlist}
          numColumns={2}
        />
        <TextButton
          text="Thêm Phòng"
          onPress={() => navigation.navigate('addroomScr')}
          style={styles.btnAddRoom}
        />
      </View>
    </SafeAreaView>
  );
}
