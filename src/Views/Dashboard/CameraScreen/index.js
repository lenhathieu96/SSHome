import React, {useRef} from 'react';
import {RNCamera} from 'react-native-camera';

import TextButton from '../../../Components/TextButton';
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
    <RootContainer safeArea={false}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        style={styles.picture}
      />
      <IconButton
        iconName="camera"
        iconSize={2 * fontSize.biggest}
        onPress={() => takePicture()}
        style={styles.btnTakePicture}
      />
    </RootContainer>
  );
}
