import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

import {useAlert, useNotify} from '../../../Hooks/useModal';
import {
  setUserProfile,
  removeRoom,
  clearUserData,
} from '../../../Redux/ActionCreators/userActions';
import {
  getMasterProfile,
  getMemberID,
  getCurrentWeather,
  handleLogout,
} from '../../../Api/userAPI';
import {
  updateStatusDevice,
  findRealRoomID,
  deleteRoom,
} from '../../../Api/roomAPI';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';
import {PlaceholderMedia} from '../../../Components/PlaceHolder';
import ConfirmDelModal from '../../../Components/Modal/ConfirmDelModal';

import Header from './Header';
import Weather from './Weather';
import RoomList from './RoomList';
import BSVoice from './BSVoice';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const notify = useNotify();
  const BSVoiceRef = useRef();

  const hardware = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  const [weather, setWeather] = useState({});
  const [isListening, setListening] = useState(false);
  const [homeID, setHomeID] = useState();
  const [userRole, setUserRole] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [chosenRoom, setChosenRoom] = useState({});
  const [memberID, setMemberID] = useState('');

  useEffect(() => {
    if (hardware.WFEnabled) {
      getRoleStorage();
      if (userRole === 'Master' && homeID) {
        getMasterData();
        getWeather();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.WFEnabled, userRole, homeID]);

  //get realtime member data
  useEffect(() => {
    if (hardware.WFEnabled && userRole !== 'Master') {
      getMemberData();
      if (homeID && memberID) {
        const subscriber = firestore()
          .collection('Home')
          .doc(homeID)
          .collection('Member')
          .doc(memberID)
          .onSnapshot((UserData) => {
            if (UserData.data()) {
              const result = [];
              const userAvailableRooms = UserData.data().availableRooms;
              database()
                .ref(homeID)
                .once('value')
                .then((roomList) => {
                  userAvailableRooms.forEach((roomID) => {
                    for (const room in roomList.val()) {
                      if (room === roomID) {
                        result.push(roomList.val()[room]);
                      }
                    }
                  });
                  let data = {
                    id: UserData.id,
                    name: UserData.data().name,
                    phone: UserData.data().phone,
                    email: UserData.data().email,
                    avatar: UserData.data().avatar,
                    availableRooms: result,
                  };
                  dispatch(setUserProfile(data));
                });
            } else {
              if (auth().currentUser) {
                handleLogout();
                dispatch(clearUserData());
              }
            }
          });
        return () => subscriber();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.WFEnabled, userRole, homeID, memberID]);

  const getRoleStorage = async () => {
    try {
      const roleStorage = await AsyncStorage.getItem('@userRole');
      const response = await findRealRoomID(auth().currentUser.uid);
      if (response && response.result) {
        setHomeID(response.data);
        setUserRole(roleStorage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMemberData = async () => {
    const response = await getMemberID(homeID, auth().currentUser.phoneNumber);
    if (response && response.result) {
      setMemberID(response.data);
    }
  };

  const getMasterData = async () => {
    const response = await getMasterProfile(auth().currentUser.uid);
    if (response && response.result) {
      dispatch(setUserProfile(response.data));
    }
  };

  const onRoomLongPress = async (roomID) => {
    setChosenRoom(roomID);
    toogleConfirmModal(true);
  };

  const onDeleteRoom = async () => {
    if (userRole === 'Master') {
      try {
        const response = await deleteRoom(homeID, chosenRoom.id);
        if (response && response.result) {
          dispatch(removeRoom(chosenRoom.id));
          notify('Xóa phòng thành công', true);
        } else {
          alert('Xóa phòng thất bại', false);
        }
      } catch (error) {
        notify('Xóa phòng thất bại', false);
      }
      toogleConfirmModal(false);
    }
  };

  const onRoomPress = (roomData) => {
    if (!hardware.WFEnabled) {
      alert('Vui lòng kiểm tra trạng thái wifi');
    } else {
      navigation.navigate('Room', {room: roomData});
    }
  };

  const getWeather = () => {
    console.log('alo')
    Geolocation.getCurrentPosition(async (position) => {
      const response = await getCurrentWeather(
        homeID,
        position.coords.latitude,
        position.coords.longitude,
      );
      if (response && response.result) {
        setWeather(response.data);
      }
    });
  };

  const onChangeStatus = async (roomID, deviceID, status) => {
    console.log(homeID);
    if (homeID) {
      const response = await updateStatusDevice(
        homeID,
        roomID,
        deviceID,
        status,
      );
      if (response && response.result) {
        notify('Thành công', true);
      } else {
        notify('Thất bại', false);
      }
    } else {
      notify('Lỗi không lấy được mã căn hộ', false);
    }
  };

  const voiceControl = (result, rooms) => {
    if (result === '') {
      BSVoiceRef.current.close();
      setListening(false);
    } else {
      BSVoiceRef.current.open();
      if (rooms.length > 0) {
        console.log(result);
        const roomNames = rooms.map((room) => room.name.toLowerCase());
        let isRoomExist = false;

        //findRoom
        roomNames.forEach((room) => {
          if (result.includes(room)) {
            isRoomExist = true;
            console.log('room found');
            const roomData = rooms.find(
              (item) => item.name.toLowerCase() === room,
            );
            if (roomData.hasOwnProperty('devices')) {
              let isDeviceExist = false;
              const roomID = roomData.id;
              //find Device
              for (const deviceID in roomData.devices) {
                if (
                  result.includes(roomData.devices[deviceID].name.toLowerCase())
                ) {
                  isDeviceExist = true;
                  console.log(deviceID, 'device id');
                  console.log('device found');
                  if (result.includes('mở') || result.includes('bật')) {
                    onChangeStatus(roomID, deviceID, 'on');
                  } else if (
                    result.includes('đóng') ||
                    result.includes('tắt')
                  ) {
                    onChangeStatus(roomID, deviceID, 'off');
                  } else {
                    alert('Yêu cầu của bạn không hợp lệ');
                  }
                  return;
                }
              }
              if (!isDeviceExist) {
                alert('Thiết bị không tồn tại');
              }
            } else {
              alert('Chưa có thiết bị nào được cài đặt tại phòng này');
            }
            return;
          }
        });
        if (!isRoomExist) {
          alert('Phòng bạn vừa yêu cầu không tồn tại');
        }
      }
    }
    BSVoiceRef.current.close();
  };

  const toogleConfirmModal = (isShowConfirmModal) => {
    setShowConfirm(isShowConfirmModal);
  };

  return (
    <RootContainer safeArea={false} style={{justifyContent: 'space-between'}}>
      <Header navigation={navigation} />
      {/* Info Container */}
      <Weather weather={weather} />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        {}
        {userProfile.availableRooms && userProfile.availableRooms.length > 0 ? (
          <RoomList
            onRoomPress={onRoomPress}
            data={userProfile.availableRooms}
            onRoomLongPress={onRoomLongPress}
          />
        ) : (
          <PlaceholderMedia style={styles.placeHolder} />
        )}
        <IconButton
          style={styles.floatButton}
          iconName="mic"
          iconColor={Color.primary}
          onPress={() => {
            if (hardware.WFEnabled) {
              setListening(true);
              BSVoiceRef.current.open();
            } else {
              alert('Vui lòng kiểm tra trạng thái wifi');
            }
          }}
        />
      </SafeAreaView>
      {/* BSVoice */}
      {userProfile.availableRooms && userProfile.availableRooms.length > 0 ? (
        <BSVoice
          ref={BSVoiceRef}
          isListening={isListening}
          voiceControl={voiceControl}
          availableRooms={userProfile.availableRooms}
        />
      ) : null}
      {userRole === 'Master' ? (
        <ConfirmDelModal
          isVisible={showConfirm}
          toggleModal={toogleConfirmModal}
          title={`${
            chosenRoom ? chosenRoom.name : ''
          } sẽ bị xoá khỏi danh sách phòng`}
          onAccept={onDeleteRoom}
        />
      ) : null}
    </RootContainer>
  );
}
