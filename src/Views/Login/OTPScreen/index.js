import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';

import Text, {ErrorText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {confirmOTP} from '../../../Api/userAPI';

import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  // const {confirmation} = route.params;
  const inputRef = useRef();

  const [OTP, setOTP] = useState('');
  const [loginError, setloginError] = useState('');

  useEffect(() => {
    inputRef.current.focus();
    // if (route.params?.qrcode) {
    //   console.log(route.params.qrcode, 'qrcode');
    //   setHomeID(route.params.qrcode);
    // } else {
    //   getHomeIDFromStorage();
    // }
  }, [route.params?.qrcode]);

  return (
    <RootContainer safeArea={true}>
      <View style={{flex: 0.25}}>
        <Text>Chỗ này để logo</Text>
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
            // const response = await confirmOTP(confirmation, OTP);
          }}
        />
      </View>
    </RootContainer>
  );
}
