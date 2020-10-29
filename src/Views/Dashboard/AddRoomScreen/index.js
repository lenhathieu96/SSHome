import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

import Text, {ErrorText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';

import roomBg1 from '../../../Assets/Images/roomBackground1.jpg';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function AddRoomScreen({navigation, route}) {
  const headerHeight = useHeaderHeight();

  const [roomName, setRoomName] = useState('');
  const [chosenImg, chooseImg] = useState(0);
  const [customImg, setCustomImg] = useState();
  const [txtError, setTxtError] = useState('');

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
      }
    });
  };

  const onAddRoom = () => {
    if (roomName !== '') {
      setTxtError('Tên không đưọc để trống');
    } else if (!customImg && chosenImg === 0) {
      setTxtError('Bạn phải chọn ảnh đại diện cho phòng');
    } else {
      console.log('bingo');
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, marginTop: headerHeight}}>
      <TextInput
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
        label="Tên Phòng"
        mode="outlined"
        style={[styles.formController, {flex: 0.1}]}
        theme={{
          colors: {primary: Color.primary, underlineColor: 'transparent'},
        }}
        onChange={(text) => setRoomName(text)}
      />
      <View style={styles.groupImageContainer}>
        <TouchableWithoutFeedback onPress={() => chooseImg(1)}>
          <ImageBackground
            source={roomBg1}
            style={chosenImg === 1 ? styles.chosenImg : styles.defaultImg}
            borderRadius={20}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => chooseImg(2)}>
          <ImageBackground
            source={roomBg1}
            style={chosenImg === 2 ? styles.chosenImg : styles.defaultImg}
            borderRadius={20}
            resizeMode="contain"
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
    </KeyboardAvoidingView>
  );
}
