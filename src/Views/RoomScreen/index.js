import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';
import {SharedElement} from 'react-navigation-shared-element';

import RootContainer from '../../Components/RootContainer';
import Text, {BoldText} from '../../Components/Text';
import DeviceButton from './DeviceButton';
import IconButton from '../../Components/IconButton';
import ConfirmModal from '../../Components/Modal/ConfirmDelModal';
import BSUploadImage from '../../Components/Modal/BSUploadImage';
import BSAddNewDevice from './BSAddNewDevice';

import {useNotify} from '../../Hooks/useModal';
import {useAlert} from '../../Hooks/useModal';
import {
  findRealRoomID,
  updateRoomBackground,
  updateStatusDevice,
  getUsedPorts,
  addNewDevice,
  deleteDevice,
} from '../../Api/roomAPI';
import {updateRoomAvatar} from '../../Redux/ActionCreators/userActions';

import * as fontSize from '../../Utils/FontSize';
import styles from './styles/index.css';
import AsyncStorage from '@react-native-community/async-storage';

export default function RoomDetailScreen({navigation, route}) {
  const {room} = route.params;

  const BSRef = useRef();
  const BSChangeImageRef = useRef();
  const alert = useAlert();
  const notify = useNotify();

  const [homeID, setHomeID] = useState('');
  const [devices, setDevices] = useState([]);
  const [usedPort, setUsedPort] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [chosenDevice, chooseDevice] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const hardware = useSelector((state) => state.hardware);

  useEffect(() => {
    getHomeID();
  }, []);

  useEffect(() => {
    if (homeID) {
      getPorts();
      const onValueChange = database()
        .ref(`${homeID}/${room.id}`)
        .on('value', (snapshot) => {
          let result = [{}];
          let deviceList = snapshot.val().devices;
          for (let device in deviceList) {
            result.unshift(deviceList[device]);
          }
          setDevices(result);
        });
      return () =>
        database().ref(`${homeID}/${room.id}`).off('value', onValueChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeID]);

  const getHomeID = async () => {
    const storageID = await AsyncStorage.getItem('@masterID');
    if (storageID) {
      const response = await findRealRoomID(storageID);
      if (response && response.result) {
        setHomeID(response.data);
      }
    }
  };

  const getPorts = async () => {
    let response = await getUsedPorts(homeID);
    if (response.data) {
      setUsedPort(response.data);
    }
  };
  //Change room background
  const uploadImage = async (imageURI) => {
    setLoading(true);
    const res = await updateRoomBackground(homeID, imageURI, room.id);
    if (res.result) {
      setLoading(false);
      dispatch(updateRoomAvatar(room.id, res.uri));
      navigation.goBack();
    }
  };
  // Change status device
  const onChangeStatus = async (device, status) => {
    const response = await updateStatusDevice(
      homeID,
      room.id,
      device.id,
      status,
    );
    console.log(response.message);
  };

  const onDeleteDevice = async () => {
    const response = await deleteDevice(homeID, room.id, chosenDevice.id);
    setShowConfirm(false);
    if (!response.result) {
      notify(response.message, false);
    }
  };

  const onAddNewDevice = async (device) => {
    const response = await addNewDevice(homeID, room.id, device);
    if (response && response.result) {
      let newUsedPorts = [...usedPort];
      newUsedPorts.push(device.port);
      setUsedPort(newUsedPorts);
    } else {
      notify('Thêm thiết bị thất bại', false);
    }
    BSRef.current.close();
  };

  return (
    <RootContainer safeArea={false}>
      <SharedElement id={`item.${room.id}.photo`}>
        <FastImage
          source={{uri: room.background}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.imgBg}
        />
      </SharedElement>
      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.headerContainer}>
          <IconButton
            iconName="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <BoldText style={styles.roomTitle}>{room.name}</BoldText>
          <IconButton
            iconName="camera"
            onPress={() => BSChangeImageRef.current.open()}
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
                      if (hardware.WFEnabled) {
                        BSRef.current.open();
                      } else {
                        BSRef.current.close();
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
      </View>
      <ConfirmModal
        title={`${chosenDevice.name} sẽ bị xoá khỏi danh sách thiết bị`}
        isVisible={showConfirm}
        onAccept={onDeleteDevice}
        toggleModal={() => setShowConfirm(false)}
      />
      <BSAddNewDevice
        ref={BSRef}
        ports={usedPort}
        onAddNewDevice={onAddNewDevice}
      />
      <BSUploadImage
        ref={BSChangeImageRef}
        uploadImage={uploadImage}
        isLoading={isLoading}
      />
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
