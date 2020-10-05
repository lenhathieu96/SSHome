import React from 'react';
import {ImageBackground, View} from 'react-native';

import RootContainer from '../../../Components/RootContainer';
import TextButton from '../../../Components/TextButton';
import {BoldText} from '../../../Components/Text';

import IntroBackground from '../../../Assets/Images/introBackground.jpg';
import styles from './styles/index.css';
import Color from '../../../Utils/Color';

export default function LoginScreen({navigation}) {
  return (
    <ImageBackground source={IntroBackground} style={{flex: 1}}>
      <RootContainer safeArea={true}>
        <View style={styles.headerContainer}>
          <BoldText style={{fontSize: 32}}>App Logo</BoldText>
          <BoldText style={{fontSize: 32}}>App Title</BoldText>
        </View>

        <View style={styles.btnContainer}>
          <TextButton
            style={styles.btn}
            text="Master Login"
            onPress={() => navigation.navigate('master')}
          />
          <TextButton
            style={styles.btnMember}
            text="Member Login"
            textStyle={{color: Color.primary}}
            onPress={() => navigation.navigate('member')}
          />
        </View>
      </RootContainer>
    </ImageBackground>
  );
}
