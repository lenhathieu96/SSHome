import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import DeviceButton from './DeviceButton';
import IconButton from '../../../Components/IconButton';

import {updateRoomBackground} from '../../../Api/roomAPI';
import {updateRoomAvatar} from '../../../Redux/ActionCreators/userActions';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

export default function RoomDetailScreen({navigation, route}) {
  const {room} = route.params;
  const dispatch = useDispatch();
  console.log(room.id);
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
        let source = {uri: response.uri};
        const res = await updateRoomBackground(source.uri, room.id);
        if (res.result) {
          console.log('upload success');
          dispatch(updateRoomAvatar(room.id, res.uri));
          navigation.goBack();
        } else {
          console.log('upload failed');
        }
      }
    });
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
          <DeviceButton />
        </View>
      </View>
    </RootContainer>
  );
}
