import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import {BoldText} from '../../../Components/Text';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function Header(props) {
  const {navigation} = props;
  const hardware = useSelector((state) => state.hardware);

  return (
    <SafeAreaView style={styles.container}>
      <Icon.Button
        name="menu"
        color={Color.primary}
        size={fontSize.biggest}
        backgroundColor="transparent"
        borderRadius={10}
        onPress={() => navigation.openDrawer()}
        underlayColor="transparent"
        activeOpacity={0.4}
      />
      <BoldText style={styles.headerTitle}>SSHOME</BoldText>
      <Icon.Button
        name="wifi"
        color={hardware.WFEnabled ? Color.primary : Color.background}
        size={fontSize.biggest}
        backgroundColor="transparent"
        borderRadius={10}
        underlayColor="transparent"
        activeOpacity={0.4}
      />
    </SafeAreaView>
  );
}
