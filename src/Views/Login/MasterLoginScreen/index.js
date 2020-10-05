import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

export default function MasterLoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <RootContainer safeArea={true}>
      <TextInput label="Email" />
      <TextInput label="Password" />
      <TextButton text="Đăng Nhập" onPress={() => console.log('ay yo')} />
    </RootContainer>
  );
}
