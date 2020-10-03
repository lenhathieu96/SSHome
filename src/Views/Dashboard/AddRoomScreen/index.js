import React, {useState, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import {TextInput} from 'react-native-paper';

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';
import RadioButton from '../../../Components/RadioButton';
import RootContainer from '../../../Components/RootContainer';

import livingRoomHeader from '../../../Assets/Images/livingRoomHeader.png';
import bedRoomHeader from '../../../Assets/Images/bedroomHeader.png';
import kitchenHeader from '../../../Assets/Images/kitchenHeader.png';
import bathRoomHeader from '../../../Assets/Images/bathroomHeader.png';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function AddRoomScreen({navigation, route}) {
  const [roomName, setRoomName] = useState();
  const [roomType, setRoomType] = useState(1);
  const [customPicture, setCustomPicture] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(livingRoomHeader);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params) {
        const {pictureUri} = route.params;
        if (pictureUri) {
          setCurrentPicture(pictureUri);
          setCustomPicture(true);
        }
      }
    });
    return unsubscribe;
  }, []);

  const setDefaultPicture = () => {
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
    <RootContainer>
      <TextInput
        label="Tên Phòng"
        mode="outlined"
        style={[styles.formController, {flex: 0.1}]}
        selectionColor={Color.primary}
        underlineColor={Color.primary}
        theme={{
          colors: {primary: Color.primary, underlineColor: 'transparent'},
        }}
        onChange={(text) => setRoomName(text)}
      />
      <View style={[styles.formController, {flex: 0.3}]}>
        <Text>Chọn loại phòng</Text>
        <View style={styles.RadioButtonsContainer}>
          <RadioButton
            title={'Phòng Khách'}
            value={1}
            option={roomType}
            onChange={() => {
              setRoomType(1);
              setCurrentPicture(livingRoomHeader);
            }}
          />
          <RadioButton
            title={'Phòng Ngủ'}
            value={2}
            option={roomType}
            onChange={() => {
              setRoomType(2);
              setCurrentPicture(bedRoomHeader);
            }}
          />
        </View>
        <View style={styles.RadioButtonsContainer}>
          <RadioButton
            title={'Phòng Bếp'}
            value={3}
            option={roomType}
            onChange={() => {
              setRoomType(3);
              setCurrentPicture(kitchenHeader);
            }}
          />
          <RadioButton
            title={'Phòng Tắm'}
            option={roomType}
            value={4}
            onChange={() => {
              setRoomType(4);
              setCurrentPicture(bathRoomHeader);
            }}
          />
        </View>
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
              navigation.navigate('cameraScr', {isFromAddNewRoom: true})
            }
          />
          <RadioButton
            title={'Chọn ảnh mặc định'}
            value={false}
            option={customPicture}
            customStyle={{alignSelf: 'flex-start'}}
            onChange={() => setDefaultPicture()}
            disabled={!customPicture}
          />
        </View>
      </View>

      <TextButton
        text="Tạo Phòng"
        style={styles.btnAddRoom}
        onPress={() => console.log('create Room')}
      />
    </RootContainer>
  );
}
