import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native';
import {BoldText} from '../../../../Components/Text';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function Header(props) {
  const {navigation} = props;

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
      <View style={{flex: 0.2}} />
    </SafeAreaView>
  );
}
