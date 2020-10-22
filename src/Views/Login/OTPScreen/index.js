import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {confirmOTP} from '../../../Api/userAPI';

import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  const {confirmation} = route.params;
  const headerHeight = useHeaderHeight();
  const inputRef0 = useRef();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();

  const OTPInputs = [
    inputRef0,
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
    inputRef5,
  ];

  const [OTP, setOTP] = useState('');

  useEffect(function () {
    OTPInputs[0].current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusNext = (index, value) => {
    if (index < OTPInputs.length - 1) {
      OTPInputs[index + 1].current.focus();
      setOTP(OTP + value);
    }
    if (index === OTPInputs.length - 1) {
      OTPInputs[index].current.blur();
    }
  };

  const focusPrevios = (key, index) => {
    console.log(key);
    if (index !== 0 && key === 'Backspace') {
      OTPInputs[index - 1].current.focus();
    }
  };

  return (
    <RootContainer safeArea={true} style={{marginTop: headerHeight}}>
      <View style={{flex: 0.25}}>
        <Text>Chỗ này để logo</Text>
        <Text>{OTP}</Text>
      </View>
      <View style={styles.body}>
        <Text style={{marginHorizontal: 5}}>Nhập mã OTP gồm có 6 chữ số</Text>
        <View style={styles.inputController}>
          {OTPInputs.map((item, index) => (
            <TextInput
              key={index.toString()}
              ref={item}
              theme={{
                colors: {primary: 'transparent'},
              }}
              autoFocus={index === 0 ? true : false}
              underlineColor={'transparent'}
              style={styles.input}
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              value={OTP ? OTP[index] : ''}
              onChangeText={(text) => focusNext(index, text)}
              onKeyPress={(e) => focusPrevios(e.nativeEvent.key, index)}
            />
          ))}
        </View>
      </View>
      <TextButton
        style={styles.btnLogin}
        text="Xác Thực"
        onPress={async () => {
          const response = await confirmOTP(confirmation, OTP);
          if (response) {
            console.log('ayyo');
          }
          navigation.navigate('otp', {confirmation: 'ayyo'});
        }}
      />
    </RootContainer>
  );
}
