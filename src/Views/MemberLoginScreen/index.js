import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text, {ErrorText} from '../../Components/Text';
import TextButton from '../../Components/TextButton';
import RootContainer from '../../Components/RootContainer';

import {handleMemberLogin} from '../../Api/userAPI';

import {bigger} from '../../Utils/FontSize';
import Color from '../../Utils/Color';

import logoImg from '../../Assets/Images/logo.png';
import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  const inputRef = useRef();

  const [phoneNumber, setPhoneNUmber] = useState('0707366517');
  const [homeID, setHomeID] = useState();
  const [loginError, setloginError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const response = await handleMemberLogin(phoneNumber, homeID);
    if (!response.result) {
      setloginError(`Đăng nhập không thành công, ${response.message} !`);
    } else {
      navigation.navigate('otp', {confirmation: response.data});
    }
    setLoading(false);
  };

  useEffect(() => {
    inputRef.current.focus();
    if (route.params?.qrcode) {
      setHomeID(route.params.qrcode);
      setloginError('');
    }
  }, [route.params?.qrcode]);

  return (
    <RootContainer safeArea={true}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={logoImg} resizeMode="contain" />
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
            {homeID ? 'Bạn đã có mã xác nhận' : 'Quét mã xác nhận từ chủ hộ'}
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
          isLoading={isLoading}
          style={styles.btnLogin}
          text="Đăng Nhập"
          onPress={async () => {
            if (!phoneNumber) {
              setloginError('Số điện thoại không được để trống');
            } else if (!homeID) {
              setloginError('Mã xác nhận không tồn tại');
            } else {
              onLogin();
            }
          }}
        />
      </View>
    </RootContainer>
  );
}
