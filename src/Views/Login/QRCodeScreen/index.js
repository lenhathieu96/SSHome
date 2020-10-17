import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';

import styles from './styles/index.css';

export default function QRCodeScreen({navigation, route}) {
  const {isFromMasterSignUp} = route.params;
  return (
    <QRCodeScanner
      showMarker={true}
      markerStyle={styles.marker}
      topViewStyle={styles.content}
      bottomViewStyle={styles.content}
      cameraStyle={styles.camera}
      onRead={(qrcode) =>
        navigation.navigate(isFromMasterSignUp ? 'signup' : 'member', {
          qrcode: qrcode.data,
        })
      }
    />
  );
}
