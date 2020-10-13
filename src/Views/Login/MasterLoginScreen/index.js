import React, {useRef, useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';


import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {setLoginStatus} from '../../../Redux/ActionCreators/userActions'

import logoApp from '../../../Assets/Images/logoApp.png'
import styles from './styles/index.css';

export default function MasterLoginScreen() {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const inputRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <RootContainer safeArea={true} style={{marginTop: headerHeight}}>
      <View style={{flex: 0.25}}>
        <Image source ={logoApp} style={{alignSelf: 'center'}}/>
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
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.txtError}>{error}</Text>
      </View>
      <TextButton
        style={styles.btnLogin}
        text="Đăng Nhập"
        onPress={() => {
          console.log('ayyo')
        }}
      />
    </RootContainer>
  );
}
