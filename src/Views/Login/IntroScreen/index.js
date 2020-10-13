import React from 'react';
import {ImageBackground, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import RootContainer from '../../../Components/RootContainer';
import TextButton from '../../../Components/TextButton';
import {BoldText} from '../../../Components/Text';

import {setUserRole} from '../../../Redux/ActionCreators/userActions';

import appLogo from '../../../Assets/Images/logoApp.png'
import IntroBackground from '../../../Assets/Images/introBackground.jpg';
import styles from './styles/index.css';
import Color from '../../../Utils/Color';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <ImageBackground source={IntroBackground} style={{flex: 1}}>
      <RootContainer safeArea={true}>
        <View style={styles.headerContainer}>
          <Image source={appLogo}/>
        </View>

        <View style={styles.btnContainer}>
          <TextButton
            style={styles.btn}
            text="Master Login"
            onPress={() => {
              dispatch(setUserRole(true));
              navigation.navigate('master');
            }}
          />
          <TextButton
            style={styles.btnMember}
            text="Member Login"
            textStyle={{color: Color.primary}}
            onPress={() => {
              dispatch(setUserRole(false));
              navigation.navigate('member');
            }}
          />
        </View>
      </RootContainer>
    </ImageBackground>
  );
}
