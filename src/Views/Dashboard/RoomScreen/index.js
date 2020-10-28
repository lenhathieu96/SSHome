import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';

import RootContainer from '../../../Components/RootContainer';
import Text, {BoldText} from '../../../Components/Text';
import DeviceButton from './DeviceButton';
import IconButton from '../../../Components/IconButton';
import LoadingModal from '../../../Components/Modal/LoadingModal';

import {updateRoomBackground} from '../../../Api/roomAPI';
import {updateRoomAvatar} from '../../../Redux/ActionCreators/userActions';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';
import AsyncStorage from '@react-native-community/async-storage';

export default function RoomDetailScreen({navigation, route}) {
  const {room} = route.params;

  const [isLoading, setLoading] = useState(false);
  const [homeID, setHomeID] = useState('');
  const [devices, setDevices] = useState([]);

  const dispatch = useDispatch();
  const selectPhotoTapped = () => {
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
        const res = await updateRoomBackground(source.uri, room.id);
        if (res.result) {
          console.log('upload success');
          dispatch(updateRoomAvatar(room.id, res.uri));
          navigation.goBack();
        }
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getHomeID();
    const onValueChange = database()
      .ref(`${homeID}/${room.id}`)
      .on('value', (snapshot) => {
        let result = [{}];
        let deviceList = snapshot.val().devices;
        // console.log(snapshot.val().devices);
        for (let device in deviceList) {
          result.unshift(deviceList[device]);
        }
        setDevices(result);
      });
    return () =>
      database().ref(`${homeID}/${room.id}`).off('value', onValueChange);
  });

  const getHomeID = async () => {
    const homeIDStorage = await AsyncStorage.getItem('homeID');
    if (homeIDStorage) {
      setHomeID(homeIDStorage);
    }
  };

  return (
    <RootContainer safeArea={false}>
      <SharedElement id={`item.${room.id}.photo`}>
        <FastImage
          source={{uri: room.background}}
          style={styles.imgBg}
          resizeMode={FastImage.resizeMode.cover}
        />
      </SharedElement>
      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.headerContainer}>
          <IconButton
            iconName="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <BoldText style={styles.roomTitle}>{room.name}</BoldText>
          <IconButton iconName="camera" onPress={() => selectPhotoTapped()} />
        </SafeAreaView>
        <View style={styles.bodyContainer}>
          <FlatList
            data={devices}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (index === devices.length - 1) {
                return <AddButton />;
              }
              return <DeviceButton />;
            }}
          />
        </View>
        <LoadingModal isVisible={isLoading} />
      </View>
    </RootContainer>
  );
}

const AddButton = () => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.btnContainer}>
        <Icon name="plus" size={fontSize.bigger} />
        <Text>Thêm thiết bị</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
