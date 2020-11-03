import React from 'react';
import {View, Vibration} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles/index.css';

export default function QRCodeScreen({navigation, route}) {
  const {isFromMasterSignUp} = route.params;
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onBarCodeRead={(qrcode) => {
          Vibration.vibrate();
          navigation.navigate(isFromMasterSignUp ? 'signup' : 'member', {
            qrcode: qrcode.data,
          });
        }}
      />
    </View>
  );
}
