import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import TextButton from '../../Components/TextButton';

import styles from './styles/index.css';
import Color from '../../Utils/Color';
import RootContainer from '../../Components/RootContainer';
import {BoldText} from '../../Components/Text';

export default function IntroScreen({navigation}) {
  return (
    <RootContainer safeArea={false} style={styles.root}>
      <View style={styles.lottie}>
        <LottieView
          source={require('../../Assets/Images/Lottie/introLottie.json')}
          autoPlay
          loop
        />
      </View>
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
    </RootContainer>
  );
}
