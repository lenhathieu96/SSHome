import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import Text, {ErrorText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';
import TextInput from '../../../Components/TextInput';
import {
  handleMasterLogin,
  handleMasterForgotPassword,
} from '../../../Api/userAPI';

import styles from './styles/index.css';

export default function MasterLoginScreen({navigation}) {
  const [email, setEmail] = useState('lenhathieu96@gmail.com');
  const [password, setPassword] = useState('Nhathieu96');
  const [loginError, setloginError] = useState('');

  const onLogin = async () => {
    const response = await handleMasterLogin(email, password);
    if (!response.result) {
      setloginError(`Đăng nhập không thành công, ${response.message} !`);
    } else {
      setloginError('');
    }
  };

  return (
    <RootContainer safeArea={true}>
      <View style={{flex: 0.25}}>
        <Image style={{alignSelf: 'center'}} resizeMode="cover" />
      </View>
      <View style={styles.body}>
        <TextInput
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
      </View>
      <ErrorText>{loginError}</ErrorText>
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
          onPress={() => handleMasterForgotPassword('lenhathieu96@gmail.com')}>
          <Text style={{alignSelf: 'center', color: 'black'}}>
            Quên Mật Khẩu ?
          </Text>
        </TouchableOpacity>
      </View>
    </RootContainer>
  );
}
