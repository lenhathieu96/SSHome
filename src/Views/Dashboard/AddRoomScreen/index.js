import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';

import Text, {ErrorText} from '../../../Components/Text';
import TextInput from '../../../Components/TextInput';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';
import BSUploadImage from '../../../Components/Modal/BSUploadImage';

import {findRealRoomID} from '../../../Api/roomAPI';

import {useNotify} from '../../../Hooks/useModal';
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

  const notify = useNotify();
  const BSChangeImageRef = useRef();

  const [roomName, setRoomName] = useState('');
  const [chosenImg, chooseImg] = useState(0);
  const [customImg, setCustomImg] = useState();
  const [txtError, setTxtError] = useState('');
  const [homeID, setHomeID] = useState('');

  const uploadImage = (imageURI) => {
    setCustomImg(imageURI);
    chooseImg(3);
    BSChangeImageRef.current.close();
  };

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem('@masterID');
      if (storage) {
        const response = await findRealRoomID(storage);
        if (response && response.result) {
          setHomeID(response.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onAddRoom = async () => {
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
            if (response_1.result) {
              dispatch(updateNewRoom(response_1.data));
            }
            notify(response_1.message, response_1.result);
            break;
          case 2:
            const response_2 = await addRoom(
              homeID,
              roomName,
              BACKGROUND_2,
              false,
            );
            if (response_2.result) {
              dispatch(updateNewRoom(response_2.data));
            }
            notify(response_2.message, response_2.result);
            break;
          case 3:
            const response_3 = await addRoom(homeID, roomName, customImg, true);
            if (response_3.result) {
              dispatch(updateNewRoom(response_3.data));
            }
            notify(response_3.message, response_3.result);
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
        <View style={styles.customImg}>
          <ImageBackground
            style={styles.img}
            resizeMode="cover"
            borderRadius={20}
            source={{uri: customImg}}>
            <IconButton
              style={styles.cameraBtn}
              iconName="camera"
              iconColor={Color.primary}
              iconSize={fontSize.bigger}
              onPress={() => BSChangeImageRef.current.open()}
            />
          </ImageBackground>
        </View>
      </View>
      <SafeAreaView style={styles.btnAddContainer}>
        <ErrorText>{txtError}</ErrorText>
        <TextButton
          text="Tạo Phòng"
          style={styles.btnAddRoom}
          onPress={() => onAddRoom()}
        />
      </SafeAreaView>

      <BSUploadImage
        ref={BSChangeImageRef}
        uploadImage={uploadImage}
        isLoading={false}
      />
    </KeyboardAvoidingView>
  );
}
