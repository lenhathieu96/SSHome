import React, {useRef} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import IconButton from '../../../Components/IconButton';
import RootContainer from '../../../Components/RootContainer';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

export default function CameraScreen({navigation, route}) {
  const cameraRef = useRef();

  const {isFromAddNewRoom} = route.params;

  const takePicture = async () => {
    const options = {
      quality: 0.5,
      base64: true,
      fixOrientation: true,
    };
    const picture = await cameraRef.current.takePictureAsync(options);
    navigation.navigate(isFromAddNewRoom ? 'addroomScr' : 'roomScr', {
      pictureUri: picture.uri,
    });
  };

  return (
    <RootContainer safeArea={false} style={styles.rootContainer}>
      <IconButton
        iconName="chevron-left"
        iconSize={fontSize.bigger}
        onPress={() => navigation.goBack()}
        style={styles.btnBack}
      />
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        style={styles.picture}
      />
      <View style={styles.btnTakePictureContainer}>
        <IconButton
          iconName="dot-circle"
          iconSize={1.5 * fontSize.biggest}
          onPress={() => takePicture()}
          style={styles.btnTakePicture}
        />
      </View>
    </RootContainer>
  );
}
