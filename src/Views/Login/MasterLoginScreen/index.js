import React, {useRef, useState} from 'react';
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

  const [email, setEmail] = useState('lenhathieu96@gmail.com');
  const [password, setPassword] = useState('Nhathieu96');
  const [loginError, setloginError] = useState('');

  const onLogin = async () => {
    const result = await handleMasterLogin(email, password);
    if (result) {
      setloginError(`Đăng nhập không thành công, ${result} !`);
    }
  };

  return (
    <RootContainer safeArea={true} style={{marginTop: headerHeight}}>
      <View style={{flex: 0.25}}>
        <Text>logo app</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          label="Tên Phòng"
          mode="outlined"
          theme={{
            colors: {primary: Color.primary, underlineColor: 'transparent'},
          }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="Tên Phòng"
          mode="outlined"
          theme={{
            colors: {primary: Color.primary, underlineColor: 'transparent'},
          }}
        />
        <Text style={styles.txtloginError}>{loginError}</Text>
        <TextButton
          style={styles.btnLogin}
          text="Đăng Nhập"
          onPress={() => {
            onLogin();
          }}
        />
        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={{alignSelf: 'center', color: 'black'}}>
              Đăng Ký Chủ Nhà
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleMasterForgotPassword('lenhathieu96@gmail.com')
            }>
            <Text style={{alignSelf: 'center', color: 'black'}}>
              Quên Mật Khẩu ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RootContainer>
  );
}
