import React, {useRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';


import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {setLoginStatus} from '../../../Redux/ActionCreators/userActions'

import styles from './styles/index.css';

export default function MasterLoginScreen() {
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
        <Text>Chỗ này để logo</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          theme={{
            colors: {primary: 'transparent'},
          }}
          placeholder="Email"
          textContentType="emailAddress"
          underlineColor={'transparent'}
          style={styles.input}
          ref={inputRef}
          autoFocus={true}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNUmber(text)}
        />
        <TextInput
          theme={{
            colors: {primary: 'transparent'},
          }}
          placeholder="Mật Khẩu"
          textContentType="password"
          secureTextEntry={true}
          underlineColor={'transparent'}
          style={styles.input}
          ref={inputRef}
          autoFocus={true}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNUmber(text)}
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
