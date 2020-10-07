import React, {useRef, useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';

import Text, {BoldText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';
import {handleMemberLogin} from '../../../Api/loginApi';

import VNFlag from '../../../Assets/Images/vietnam.png';
import styles from './styles/index.css';

export default function MemberLoginScreen({navigation}) {
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
        <Text style={{marginHorizontal: 5}}>
          Nhập số điện thoại của bạn để đăng nhập
        </Text>
        <View style={styles.inputController}>
          <View style={styles.areaCodeContainer}>
            <Image source={VNFlag} />
            <BoldText>+84</BoldText>
          </View>

          <TextInput
            theme={{
              colors: {primary: 'transparent'},
            }}
            underlineColor={'transparent'}
            style={styles.input}
            ref={inputRef}
            textContentType="telephoneNumber"
            autoFocus={true}
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNUmber(text)}
          />
        </View>
      </View>
      <TextButton
        style={styles.btnLogin}
        text="Đăng Nhập"
        onPress={async () => {
          // const confirmation = await handleMemberLogin(`+84${phoneNumber}`);
          // if (confirmation) {
          // navigation.navigate('otp', {confirmation});
          // }
          navigation.navigate('otp', {confirmation: 'ayyo'});
        }}
      />
    </RootContainer>
  );
}
