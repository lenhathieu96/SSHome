import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native';
import {BoldText} from '../../../../Components/Text';
import {useSelector} from 'react-redux';
import {useAlert} from '../../../../Hooks/useModal';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function Header(props) {
  const {navigation, hanldeStartScan} = props;
  const hardware = useSelector((state) => state.hardware);
  const alert = useAlert();

  return (
    <SafeAreaView style={styles.container}>
      <Icon.Button
        name="bar-chart-2"
        style={{transform: [{rotate: '90deg'}]}}
        color={Color.primary}
        size={fontSize.bigger}
        backgroundColor="transparent"
        borderRadius={10}
        onPress={() => navigation.openDrawer()}
        underlayColor="transparent"
        activeOpacity={0.4}
      />
      <BoldText style={styles.headerTitle}>SSHOME</BoldText>
      <Icon.Button
        name={hardware.BLController ? 'bluetooth' : 'wifi'}
        color={
          hardware.BLController
            ? hardware.BLEnabled
              ? Color.primary
              : Color.background
            : hardware.WFEnabled
            ? Color.primary
            : Color.background
        }
        size={fontSize.bigger}
        backgroundColor="transparent"
        borderRadius={10}
        underlayColor="transparent"
        activeOpacity={0.4}
        onPress={() => {
          if (hardware.BLController) {
            if (hardware.BLEnabled) {
              hanldeStartScan();
            } else {
              alert('Vui lòng kiểm tra trạng thái bluetooth');
            }
          }
        }}
      />
    </SafeAreaView>
  );
}
