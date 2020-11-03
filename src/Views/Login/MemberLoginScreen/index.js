import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text, {ErrorText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

import {handleMemberLogin} from '../../../Api/userAPI';

import {bigger} from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  const inputRef = useRef();

  const [phoneNumber, setPhoneNUmber] = useState('0707366517');
  const [homeID, setHomeID] = useState();
  const [loginError, setloginError] = useState('');

  const getHomeIDFromStorage = async () => {
    const homeIDStorage = await AsyncStorage.getItem('homeID');
    setHomeID(homeIDStorage);
  };

  useEffect(() => {
    inputRef.current.focus();
    if (route.params?.qrcode) {
      console.log(route.params.qrcode, 'qrcode');
      setHomeID(route.params.qrcode);
    } else {
      getHomeIDFromStorage();
    }
  }, [route.params?.qrcode]);

  return (
    <RootContainer safeArea={true}>
      <View style={{flex: 0.25}}>
        <Text>Chỗ này để logo</Text>
      </View>
      <View style={styles.body}>
        <Text style={{marginHorizontal: 5, marginVertical: 10}}>
          Nhập số điện thoại của bạn để đăng nhập
        </Text>

        <TextInput
          style={styles.input}
          ref={inputRef}
          textContentType="telephoneNumber"
          autoFocus={true}
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNUmber(text)}
        />

        <View>
          <Text style={styles.txtInfo}>
            {homeID ? 'Bạn đã có mã xác nhận' : 'Quét mã xác nhận từ chủ nhà'}
          </Text>
          <Icon.Button
            name="qrcode"
            size={bigger}
            color={Color.primary}
            style={{alignSelf: 'center'}}
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() =>
              navigation.navigate('qrcode', {isFromMasterSignUp: false})
            }
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <ErrorText style={styles.txtError}>{loginError}</ErrorText>
        <TextButton
          style={styles.btnLogin}
          text="Đăng Nhập"
          onPress={async () => {
            // const response = await handleMemberLogin(phoneNumber, homeID);
            // if (!response.result) {
            //   setloginError(
            //     `Đăng nhập không thành công, ${response.message} !`,
            //   );
            // } else {
            // navigation.navigate('otp', {confirmation: response.data});
            // }
            navigation.navigate('otp');
          }}
        />
      </View>
    </RootContainer>
  );
}
