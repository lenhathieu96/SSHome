import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput, Image} from 'react-native';

import Text, {ErrorText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {confirmOTP} from '../../../Api/userAPI';

import logoImg from '../../../Assets/Images/logo.jpg';
import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  const {confirmation} = route.params;
  const inputRef = useRef();

  const [OTP, setOTP] = useState('');
  const [loginError, setloginError] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <RootContainer safeArea={true}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={logoImg} resizeMode="contain" />
      </View>
      <View style={styles.body}>
        <Text style={styles.txtInfo}>Nhập mã OTP gồm 6 chữ số</Text>
        <TextInput
          style={styles.input}
          ref={inputRef}
          autoFocus={true}
          keyboardType="number-pad"
          value={OTP}
          onChangeText={(text) => setOTP(text)}
        />
      </View>
      <View style={{padding: 10}}>
        <ErrorText style={styles.txtError}>{loginError}</ErrorText>
        <TextButton
          style={styles.btnLogin}
          text="Đăng Nhập"
          onPress={async () => {
            const response = await confirmOTP(confirmation, OTP);
          }}
        />
      </View>
    </RootContainer>
  );
}
