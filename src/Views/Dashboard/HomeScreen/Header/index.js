import React from 'react';
import {View} from 'react-native';
import {BoldText} from '../../../../Components/Text';
import {useHeaderHeight} from '@react-navigation/stack';

export default function Header() {
  return (
    <View>
      <BoldText>SSHOME</BoldText>
    </View>
  );
}
