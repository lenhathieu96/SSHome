import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';

import Text, {ErrorText} from '../../../Components/Text';
import TextInput from '../../../Components/TextInput';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';
import NotifyModal from '../../../Components/Modal/NotificationModal';

import {addRoom} from '../../../Api/roomAPI';
import {updateNewRoom} from '../../../Redux/ActionCreators/userActions';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

const BACKGROUND_1 =
  'https://firebasestorage.googleapis.com/v0/b/sshome-6d962.appspot.com/o/EjAcqoniSmyL2Iu4wkjR%2FRooms%2FBg1.jpeg?alt=media&token=090fcca1-7c54-4cfc-b0fa-ff295935e0f1';
const BACKGROUND_2 =
  'https://firebasestorage.googleapis.com/v0/b/sshome-6d962.appspot.com/o/EjAcqoniSmyL2Iu4wkjR%2FRooms%2FBg2.jpg?alt=media&token=b23dd9e7-26bf-4351-b49b-0ac174ba5df1';

export default function AddRoomScreen() {
  const dispatch = useDispatch();

  const [roomName, setRoomName] = useState('');
  const [chosenImg, chooseImg] = useState(0);
  const [customImg, setCustomImg] = useState();
  const [txtError, setTxtError] = useState('');

  const [apiResponse, setApiResponse] = useState('');
  const [showNotify, setShowNotify] = useState(false);

  const takeCustomImg = () => {
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
        let source = {uri: response.uri};
        setCustomImg(source.uri);
        chooseImg(3);
      }
    });
  };

  const showNotifyModal = (response) => {
    setApiResponse(response.message);
    setShowNotify(true);
    setTimeout(() => {
      setShowNotify(false);
      setApiResponse('');
    }, 2000);
  };

  const onAddRoom = async () => {
    const homeID = await AsyncStorage.getItem('homeID');
    if (homeID) {
      if (!roomName) {
        setTxtError('Tên phòng không đưọc để trống');
      } else if (!customImg && chosenImg === 0) {
        setTxtError('Bạn phải chọn ảnh đại diện cho phòng');
      } else {
        switch (chosenImg) {
          case 1:
            const response_1 = await addRoom(
              homeID,
              roomName,
              BACKGROUND_1,
              false,
            );
            showNotifyModal(response_1);
            if (response_1.result) {
              dispatch(updateNewRoom(response_1.room));
            }
            break;
          case 2:
            const response_2 = await addRoom(
              homeID,
              roomName,
              BACKGROUND_2,
              false,
            );
            showNotifyModal(response_2);
            if (response_2.result) {
              dispatch(updateNewRoom(response_2.room));
            }
            break;
          case 3:
            const response_3 = await addRoom(homeID, roomName, customImg, true);
            showNotifyModal(response_3);
            if (response_3.result) {
              dispatch(updateNewRoom(response_3.room));
            }
            break;
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root}>
      <TextInput
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
        label="Tên Phòng"
        style={styles.formController}
      />
      <View style={styles.textContainer}>
        <Text>Chọn ảnh mặc định</Text>
      </View>
      <View style={styles.groupImageContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            chooseImg(1);
          }}>
          <FastImage
            source={{uri: BACKGROUND_1}}
            style={chosenImg === 1 ? styles.chosenImg : styles.defaultImg}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => chooseImg(2)}>
          <FastImage
            source={{uri: BACKGROUND_2}}
            style={chosenImg === 2 ? styles.chosenImg : styles.defaultImg}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.customImgContainer}>
        <Text>Chọn ảnh của riêng bạn</Text>
        <ImageBackground
          style={styles.customImg}
          borderRadius={20}
          source={{uri: customImg}}>
          <IconButton
            style={styles.cameraBtn}
            iconName="camera"
            iconColor={Color.primary}
            iconSize={fontSize.bigger}
            onPress={() => takeCustomImg()}
          />
        </ImageBackground>
      </View>
      <SafeAreaView style={styles.btnAddContainer}>
        <ErrorText>{txtError}</ErrorText>
        <TextButton
          text="Tạo Phòng"
          style={styles.btnAddRoom}
          onPress={() => onAddRoom()}
        />
      </SafeAreaView>
      <NotifyModal isVisible={showNotify} title={apiResponse} />
    </KeyboardAvoidingView>
  );
}
