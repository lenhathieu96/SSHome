import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {confirmOTP} from '../../../Api/userAPI';

import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  // const {confirmation} = route.params;
  const inputRef = useRef();

  const [OTP, setOTP] = useState('');

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
        <Text>{OTP}</Text>
      </View>
      <View style={styles.body}>
        <Text style={{marginHorizontal: 5}}>Nhập mã OTP gồm có 6 chữ số</Text>

        <TextInput
          style={styles.input}
          ref={inputRef}
          textContentType="telephoneNumber"
          autoFocus={true}
          keyboardType="number-pad"
          value={OTP}
          onChangeText={(text) => setOTP(text)}
        />
      </View>
      <TextButton
        style={styles.btnLogin}
        text="Xác Thực"
        onPress={async () => {
          // const response = await confirmOTP(confirmation, OTP);
        }}
      />
    </RootContainer>
  );
}
