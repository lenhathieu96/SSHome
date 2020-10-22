import React, {useState, useEffect} from 'react';
import {View, ImageBackground, KeyboardAvoidingView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RadioButton, TextInput} from 'react-native-paper';

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';

import {addRoom, getRoom_Master} from '../../../Api/roomAPI';

import livingRoomHeader from '../../../Assets/Images/livingRoomHeader.png';
import bedRoomHeader from '../../../Assets/Images/bedroomHeader.png';
import kitchenHeader from '../../../Assets/Images/kitchenHeader.png';
import bathRoomHeader from '../../../Assets/Images/bathroomHeader.png';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';
import RootContainer from '../../../Components/RootContainer';

export default function AddRoomScreen({navigation, route}) {
  const headerHeight = useHeaderHeight();

  const [roomName, setRoomName] = useState();
  const [roomType, setRoomType] = useState(1);
  const [customPicture, setCustomPicture] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(livingRoomHeader);

  useEffect(() => {
    setDefaultPicture();
    if (route.params?.pictureUri) {
      setCustomPicture(true);
      setCurrentPicture(route.params.pictureUri);
    }
  }, [route.params?.pictureUri]);

  const setDefaultPicture = (roomType) => {
    if (roomType) {
      setRoomType(roomType);
    }
    setCustomPicture(false);
    switch (roomType) {
      case 1:
        setCurrentPicture(livingRoomHeader);
        break;
      case 2:
        setCurrentPicture(bedRoomHeader);
        break;
      case 3:
        setCurrentPicture(kitchenHeader);
        break;
      case 4:
        setCurrentPicture(bathRoomHeader);
        break;
      default:
        setCurrentPicture(livingRoomHeader);
        break;
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
      <View style={[styles.formController, {flex: 0.3}]}>
        <Text>Chọn loại phòng</Text>
        <RadioButton.Group
          value={roomType}
          onValueChange={(value) => setDefaultPicture(value)}>
          <View style={styles.radioBtnRowContainer}>
            <View style={styles.radioBtnContainer}>
              <RadioButton.Android value={1} />
              <Text>Phòng Khách</Text>
            </View>
            <View style={styles.radioBtnContainer}>
              <RadioButton.Android value={2} />
              <Text>Phòng Ngủ</Text>
            </View>
          </View>
          <View style={styles.radioBtnRowContainer}>
            <View style={styles.radioBtnContainer}>
              <RadioButton.Android value={3} />
              <Text>Phòng Bếp</Text>
            </View>
            <View style={styles.radioBtnContainer}>
              <RadioButton.Android value={4} />
              <Text>Phòng Tắm</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <View style={[styles.formController, {flex: 0.6}]}>
        <Text>Hình ảnh Phòng</Text>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={customPicture ? {uri: currentPicture} : currentPicture}
            style={[styles.picture, {backgroundColor: 'black'}]}
            resizeMode="stretch"
          />
          <IconButton
            style={styles.btnCamera}
            iconName="camera"
            iconColor={Color.primary}
            iconSize={fontSize.biggest}
            onPress={() =>
              navigation.navigate('Camera', {isFromAddNewRoom: true})
            }
          />
        </View>
        <View style={styles.radioBtnContainer}>
          <RadioButton.Android
            value={customPicture}
            status={!customPicture ? 'checked' : 'unchecked'}
            onPress={() => setDefaultPicture()}
            disabled={!customPicture}
          />
          <Text>Chọn ảnh mặc định</Text>
        </View>
      </View>

      <TextButton
        text="Tạo Phòng"
        style={styles.btnAddRoom}
        onPress={() => getRoom_Master()}
      />
    </KeyboardAvoidingView>
  );
}
