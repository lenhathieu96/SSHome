import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {useNotify, useAlert} from '../../../Hooks/useModal';

import {setUserProfile} from '../../../Redux/ActionCreators/userActions';
import {
  getMasterProfile,
  getMemberProfile,
  getCurrentWeather,
} from '../../../Api/userAPI';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import IconButton from '../../../Components/IconButton';
import LoadingRoom from './LoadingRoom';
import LoadingModal from '../../../Components/Modal/LoadingModal';

import Header from './Header';
import Weather from './Weather';
import RoomList from './RoomList';
import BSVoice from './BSVoice';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const BSVoiceRef = useRef();

  const hardware = useSelector((state) => state.hardware);
  const userProfile = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (hardware.WFEnabled) {
      getUserProflie();
      getWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardware.WFEnabled]);

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

  const onRoomLongPress = async (roomID) => {
    // const homeID = await AsyncStorage.getItem('homeID');
    // const userRole = await AsyncStorage.getItem('userRole');
    // if(userRole==='Master'){
    //   const response = await deleteRoom(homeID, roomID);
    // }
  };

  const onRoomPress = (roomData) => {
    if (!hardware.WFEnabled) {
      alert('Vui lòng kiểm tra trạng thái wifi');
    } else {
      navigation.navigate('Room', {room: roomData});
    }
  };

  const getWeather = () => {
    Geolocation.getCurrentPosition(async (position) => {
      const result = await getCurrentWeather(
        position.coords.latitude,
        position.coords.longitude,
      );
    });
  };

  return (
    <RootContainer safeArea={false} style={{justifyContent: 'space-between'}}>
      <Header navigation={navigation} />
      {/* Info Container */}
      <Weather />
      {/* Room List */}
      <SafeAreaView style={styles.bodyContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        {userProfile ? (
          <RoomList
            onRoomPress={onRoomPress}
            data={userProfile.availableRooms}
            onRoomLongPress={onRoomLongPress}
          />
        ) : (
          <LoadingRoom />
        )}
        <IconButton
          style={styles.floatButton}
          iconName="mic"
          iconColor={Color.primary}
          onPress={() =>
            hardware.WFEnabled
              ? BSVoiceRef.current.open()
              : alert('Vui lòng kiểm tra trạng thái wifi')
          }
        />
      </SafeAreaView>
      {/* BSBlueTooth */}
      <BSVoice ref={BSVoiceRef} />
      <LoadingModal isVisible={isLoading} />
    </RootContainer>
  );
}
