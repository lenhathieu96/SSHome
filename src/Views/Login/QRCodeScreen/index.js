import React, {useRef} from 'react';
import {Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles/index.css';
export default function QRCodeScreen({navigation}) {
  const {width, height} = Dimensions.get('window');
  const cameraRef = useRef();

  return (
    <QRCodeScanner
      showMarker={true}
      onRead={(qrcode) => navigation.navigate('signup', {qrcode: qrcode.data})}
    />
  );
}
