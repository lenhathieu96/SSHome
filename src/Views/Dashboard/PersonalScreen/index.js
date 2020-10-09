import React from 'react';
import {View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import QRCode from 'react-native-qrcode-svg';

import RootContainer from '../../../Components/RootContainer';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

export default function Personal() {
  const headerHeight = useHeaderHeight();
  return (
    <RootContainer safeArea={false} style={{marginTop: headerHeight}}>
      <View style={styles.QRCodeContainer}>
        <QRCode value="1258HGHO646" size={4 * fontSize.biggest} />
      </View>
    </RootContainer>
  );
}
