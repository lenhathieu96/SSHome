import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {stringToBytes} from 'convert-string';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';
import BLEManager from 'react-native-ble-manager';
import bytesCounter from 'bytes-counter';
import {useAlert} from '../../../Hooks/useModal';

import RootContainer from '../../../Components/RootContainer';
import Text, {BoldText} from '../../../Components/Text';
import DeviceButton from './DeviceButton';
import IconButton from '../../../Components/IconButton';
import LoadingModal from '../../../Components/Modal/LoadingModal';
import ConfirmModal from '../../../Components/Modal/ConfirmDelModal';
import BSAddNewDevice from './BSAddNewDevice';

import {
  updateRoomBackground,
  updateStatusDevice,
  addNewDevice,
  deleteDevice,
} from '../../../Api/roomAPI';
import {updateRoomAvatar} from '../../../Redux/ActionCreators/userActions';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';
import AsyncStorage from '@react-native-community/async-storage';

export default function RoomDetailScreen({navigation, route}) {
  const {room} = route.params;
  const BSRef = useRef();
  const alert = useAlert();

  const [homeID, setHomeID] = useState('');
  const [devices, setDevices] = useState([]);
  const [chosenDevice, chooseDevice] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const hardware = useSelector((state) => state.hardware);
  const localRooms = useSelector((state) => state.user.availableRooms);

  useEffect(() => {
    getHomeID();
    //Wifi control
    if (hardware.WFConnection) {
      const onValueChange = database()
        .ref(`${homeID}/${room.id}`)
        .on('value', (snapshot) => {
          let result = [{}];
          let deviceList = snapshot.val().devices;
          for (let device in deviceList) {
            result.unshift(deviceList[device]);
          }
          setLoading(false);
          setDevices(result);
        });
      return () =>
        database().ref(`${homeID}/${room.id}`).off('value', onValueChange);
    }
    //get local rooms devices
    else {
      let index = localRooms.findIndex((localRoom) => localRoom.id === room.id);
      if (index >= 0) {
        let result = [{}];
        let deviceList = localRooms[index].devices;
        for (let device in deviceList) {
          result.unshift(deviceList[device]);
        }
        setLoading(false);
        setDevices(result);
      }
    }
  }, [homeID, localRooms, room.id, hardware.WFConnection]);

  const getHomeID = async () => {
    const homeIDStorage = await AsyncStorage.getItem('homeID');
    if (homeIDStorage) {
      setHomeID(homeIDStorage);
    }
  };

  //Change room background
  const onChangeRoomBackground = () => {
    const options = {
      title: 'Chọn Hình',
      takePhotoButtonTitle: 'Chụp ảnh',
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện ảnh',
      cancelButtonTitle: 'Hủy',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setLoading(true);
        let source = {uri: response.uri};
        const res = await updateRoomBackground(homeID, source.uri, room.id);
        if (res.result) {
          console.log('upload success');
          dispatch(updateRoomAvatar(room.id, res.uri));
          navigation.goBack();
        }
        setLoading(false);
      }
    });
  };

  // Change status device
  const onChangeStatus = async (device, status) => {
    //Bluetooth control
    if (hardware.isBLController) {
      const BLStoreDevice = await AsyncStorage.getItem('ESP');
      const BLDevice = JSON.parse(BLStoreDevice);
      BLEManager.isPeripheralConnected(BLDevice.id).then(
        async (isConnected) => {
          if (isConnected) {
            const peripheralInfo = await BLEManager.retrieveServices(
              BLDevice.id,
              BLDevice.advertising.serviceUUIDs,
            );
            if (peripheralInfo) {
              let str = `${device.port}-${status}`;
              let bytes = bytesCounter.count(str); // count the number of bytes
              let data = stringToBytes(str);
              try {
                await BLEManager.write(
                  BLDevice.id,
                  '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
                  'beb5483e-36e1-4688-b7f5-ea07361b26a8',
                  data,
                  bytes,
                );

                // let tempDevice = [...devices];
                // let index = tempDevice.findIndex(
                //   (devicedata) => devicedata.id === device.id,
                // );
                // if (index >= 0) {
                //   tempDevice[index].status = status;
                // }
                // setDevices(tempDevice);
              } catch (error) {
                console.log(error);
                // Alert.alert('Kết Quả', error);
              }
            }
          } else {
            alert('Thiết bị chưa được kết nối');
          }
        },
      );
    } else {
      const response = await updateStatusDevice(
        homeID,
        room.id,
        device.id,
        status,
      );
      console.log(response.message);
    }
  };

  const onDeleteDevice = async () => {
    const response = await deleteDevice(homeID, room.id, chosenDevice.id);
    console.log(response.message);
    setShowConfirm(false);
  };

  const onAddNewDevice = async (device) => {
    const response = await addNewDevice(homeID, room.id, device);
    console.log(response.message);
    if (response.result) {
      BSRef.current.snapTo(1);
    }
  };

  return (
    <RootContainer safeArea={false}>
      <FastImage
        source={{uri: room.background}}
        style={styles.imgBg}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.headerContainer}>
          <IconButton
            iconName="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <BoldText style={styles.roomTitle}>{room.name}</BoldText>
          <IconButton
            iconName="camera"
            onPress={() => onChangeRoomBackground()}
          />
        </SafeAreaView>
        <View style={styles.bodyContainer}>
          <FlatList
            data={devices}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (index === devices.length - 1) {
                return (
                  <AddButton
                    onPress={() => {
                      if (hardware.WFConnection) {
                        BSRef.current.snapTo(0);
                      } else {
                        BSRef.current.snapTo(1);
                        alert(
                          'Bạn cần kết nối wifi để thực hiện chức năng này',
                        );
                      }
                    }}
                  />
                );
              }
              return (
                <DeviceButton
                  device={item}
                  onChangeStatus={onChangeStatus}
                  onDelete={(device) => {
                    chooseDevice(device);
                    setShowConfirm(true);
                  }}
                />
              );
            }}
          />
        </View>
        <LoadingModal isVisible={isLoading} />
        <ConfirmModal
          title={`${chosenDevice.name} sẽ bị xoá khỏi danh sách thiết bị`}
          isVisible={showConfirm}
          onAccept={onDeleteDevice}
          toggleModal={() => setShowConfirm(false)}
        />
        <BSAddNewDevice
          ref={BSRef}
          devices={devices}
          onAddNewDevice={onAddNewDevice}
        />
      </View>
    </RootContainer>
  );
}

const AddButton = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.btnContainer}>
        <Icon name="plus" size={fontSize.bigger} />
        <Text>Thêm thiết bị</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
