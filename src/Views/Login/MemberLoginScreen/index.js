import React, {useRef, useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Text, {BoldText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';
import RootContainer from '../../../Components/RootContainer';

import {setUserProfile} from '../../../Redux/ActionCreators/userActions';
import {handleMemberLogin} from '../../../Api/userAPI';

import VNFlag from '../../../Assets/Images/vietnam.png';
import {bigger} from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function MemberLoginScreen({navigation, route}) {
  const headerHeight = useHeaderHeight();
  const inputRef = useRef();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNUmber] = useState('707366517');
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

        <View>
          <Text style={styles.txtInfo}>
            {homeID ? 'Bạn đã có mã xác nhận' : 'Quét mã xác nhận từ chủ nhà'}
          </Text>
          <IconButton
            iconName="qrcode"
            iconSize={bigger}
            iconColor={Color.primary}
            onPress={() =>
              navigation.navigate('qrcode', {isFromMasterSignUp: false})
            }
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.txtError}>{loginError}</Text>
        <TextButton
          style={styles.btnLogin}
          text="Đăng Nhập"
          onPress={async () => {
            const result = await handleMemberLogin(phoneNumber, homeID);
            if (result.error) {
              setloginError(`Đăng nhập không thành công, ${result.error} !`);
            } else {
              if (result.success !== null) {
                let User = {name: '', phone: phoneNumber, email: ''};
                dispatch(setUserProfile(User));
                navigation.navigate('otp', {confirmation: result.success});
              }
            }
          }}
        />
      </View>
    </RootContainer>
  );
}
