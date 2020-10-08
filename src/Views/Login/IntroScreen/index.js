import React from 'react';
import {ImageBackground, View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import RootContainer from '../../../Components/RootContainer';
import TextButton from '../../../Components/TextButton';
import Text, {BoldText} from '../../../Components/Text';

import {setUserRole} from '../../../Redux/ActionCreators/userActions';

import appLogo from '../../../Assets/Images/appLogo.png'
import IntroBackground from '../../../Assets/Images/introBackground.jpg';
import styles from './styles/index.css';
import Color from '../../../Utils/Color';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
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
            onPress={() => {
              dispatch(setUserRole(true));
              navigation.navigate('master');
            }}
          />
          <TextButton
            style={styles.btnMember}
            text="Thành Viên"
            textStyle={{color: Color.primary}}
            onPress={() => {
              dispatch(setUserRole(false));
              navigation.navigate('member');
            }}
          />
          <TouchableOpacity>
            <Text style={{alignSelf: 'center', color: 'black'}}>Đăng Ký Chủ Nhà</Text>
          </TouchableOpacity>
        </View>
      </RootContainer>
    </ImageBackground>
  );
}
