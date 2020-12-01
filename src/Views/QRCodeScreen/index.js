import React, {useState} from 'react';
import {View, Vibration, Animated} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';

import * as fontSize from '../../Utils/FontSize';
import styles from './styles/index.css';

export default function QRCodeScreen({navigation, route}) {
  const {isFromMasterSignUp} = route.params;

  const opacity = new Animated.Value(0);
  const [shouldReadBarcode, setReadBarcode] = useState(true);

  useFocusEffect(() => {
    fadeIcon();
    setReadBarcode(true);
  });

  const fadeIcon = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => fadeIcon());
    });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        onBarCodeRead={(qrcode) => {
          if (shouldReadBarcode) {
            Vibration.vibrate();
            navigation.navigate(isFromMasterSignUp ? 'signup' : 'member', {
              qrcode: qrcode.data,
            });
            setReadBarcode(false);
          }
        }}>
        <View style={styles.QRMask}>
          <View style={styles.QRMask_CornerTopRight} />
          <View style={styles.QRMask_CornerBottomRight} />
          <View style={styles.QRMask_CornerTopLeft} />
          <View style={styles.QRMask_CornerBottomLeft} />
          <Animated.View style={[styles.target, {opacity}]}>
            <Icon name="plus" size={2.5 * fontSize.biggest} color={'white'} />
          </Animated.View>
        </View>
      </RNCamera>
    </View>
  );
}
