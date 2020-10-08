import React, {useRef, useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {setLoginStatus} from '../../../Redux/ActionCreators/userActions';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';
import appLogo from '../../../Assets/Images/appLogo.png';

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const inputRef = useRef();

  const [phoneNumber, setPhoneNUmber] = useState();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <RootContainer safeArea={true} style={{marginTop: headerHeight}}>
      <View style={{flex: 0.25}}>
        <Image source={appLogo} style={{alignSelf: 'center'}} />
      </View>
      <View style={styles.body}>
        <TextInput
          ref={inputRef}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNUmber(text)}
          label="Email"
          mode="outlined"
          style={[styles.formController, {flex: 0.1}]}
          theme={{
            colors: {primary: Color.primary, underlineColor: 'transparent'},
          }}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => setPhoneNUmber(text)}
          label="Mật Khẩu"
          mode="outlined"
          style={[styles.formController, {flex: 0.1}]}
          theme={{
            colors: {primary: Color.primary, underlineColor: 'transparent'},
          }}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => setPhoneNUmber(text)}
          label="Mật Khẩu"
          mode="outlined"
          style={[styles.formController, {flex: 0.1}]}
          theme={{
            colors: {primary: Color.primary, underlineColor: 'transparent'},
          }}
        />
      </View>
      <TextButton
        style={styles.btnLogin}
        text="Đăng Nhập"
        onPress={() => {
          // const confirmation = await handleMemberLogin(`+84${phoneNumber}`);
          // if (confirmation) {
          // navigation.navigate('otp', {confirmation});
          // }
          dispatch(setLoginStatus(true));

          // navigation.navigate('otp', {confirmation: 'ayyo'});
        }}
      />
    </RootContainer>
  );
}
