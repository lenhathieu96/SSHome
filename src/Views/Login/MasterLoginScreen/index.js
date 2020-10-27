import React, {useRef, useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';
import {
  handleMasterLogin,
  handleMasterForgotPassword,
} from '../../../Api/userAPI';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';
import appLogo from '../../../Assets/Images/appLogo.png';

export default function MasterLoginScreen({navigation}) {
  const headerHeight = useHeaderHeight();
  const inputRef = useRef();

  const [email, setEmail] = useState('lenhathieu96@gmail.com');
  const [password, setPassword] = useState('Nhathieu96');
  const [loginError, setloginError] = useState('');

  const onLogin = async () => {
    const result = await handleMasterLogin(email, password);
    if (result) {
      setloginError(`Đăng nhập không thành công, ${result} !`);
    }
  };

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
          value={email}
          onChangeText={(text) => setEmail(text)}
          label="Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="Mật Khẩu"
          style={styles.input}
        />
        <Text style={styles.txtloginError}>{loginError}</Text>
      </View>
      <TextButton
        style={styles.btnLogin}
        text="Đăng Nhập"
        onPress={() => {
          onLogin();
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={{alignSelf: 'center', color: 'black'}}>
          Đăng Ký Chủ Nhà
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleMasterForgotPassword('lenhathieu96@gmail.com')}>
        <Text style={{alignSelf: 'center', color: 'black'}}>Quên Mật Khẩu</Text>
      </TouchableOpacity>
    </RootContainer>
  );
}
