import React from 'react';
import {ImageBackground, View} from 'react-native';

import TextButton from '../../Components/TextButton';

import IntroBackground from '../../Assets/Images/introBackground.jpg';
import styles from './styles/index.css';
import Color from '../../Utils/Color';

export default function IntroScreen({navigation}) {
  return (
    <ImageBackground source={IntroBackground} style={styles.root}>
      <View style={styles.btnContainer}>
        <TextButton
          style={styles.btn}
          text="Chủ Nhà"
          onPress={() => navigation.navigate('master')}
        />
        <TextButton
          style={styles.btnMember}
          text="Thành Viên"
          textStyle={{color: Color.primary}}
          onPress={async () => navigation.navigate('member')}
        />
      </View>
    </ImageBackground>
  );
}
