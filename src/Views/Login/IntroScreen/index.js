import React from 'react';
import {ImageBackground, View, Image, TouchableOpacity} from 'react-native';

import RootContainer from '../../../Components/RootContainer';
import TextButton from '../../../Components/TextButton';
import Text, {BoldText} from '../../../Components/Text';

import appLogo from '../../../Assets/Images/appLogo.png';
import IntroBackground from '../../../Assets/Images/introBackground.jpg';
import styles from './styles/index.css';
import Color from '../../../Utils/Color';

export default function LoginScreen({navigation}) {
  return (
    <ImageBackground source={IntroBackground} style={{flex: 1}}>
      <RootContainer safeArea={true}>
        <View style={styles.headerContainer}>
          <Image source={appLogo} />
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
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={{alignSelf: 'center', color: 'black'}}>
              Đăng Ký Chủ Nhà
            </Text>
          </TouchableOpacity>
        </View>
      </RootContainer>
    </ImageBackground>
  );
}
