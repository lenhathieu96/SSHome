import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import IntroScreen from '../../Views/IntroScreen';
import MasterLoginScreen from '../../Views/MasterLoginScreen';
import MemberLoginScreen from '../../Views/MemberLoginScreen';
import OTPScreen from '../../Views/OTPScreen';
import SignUpScreen from '../../Views/SignUpScreen';
import QRCodeScreen from '../../Views/QRCodeScreen';

import Color from '../../Utils/Color';
import * as fontSize from '../../Utils/FontSize';

const LoginStack = createStackNavigator();
export default function LoginStacks() {
  return (
    <LoginStack.Navigator initialRouteName="intro">
      <LoginStack.Screen
        name="intro"
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="master"
        component={MasterLoginScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: 'Đăng Nhập Chủ Hộ',
          headerTitleStyle: {
            color: Color.primary,
            fontSize: fontSize.huge,
            fontFamily: 'MavenPro-Bold',
            marginLeft: Platform.OS === 'android' ? 10 : 0,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              size={fontSize.huge}
              color={Color.primary}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <LoginStack.Screen
        name="member"
        component={MemberLoginScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: 'Đăng Nhập Thành Viên',
          headerTitleStyle: {
            color: Color.primary,
            fontSize: fontSize.huge,
            fontFamily: 'MavenPro-Bold',
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              size={fontSize.huge}
              color={Color.primary}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <LoginStack.Screen
        name="otp"
        component={OTPScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: 'Xác Thực OTP',
          headerTitleStyle: {
            color: Color.primary,
            fontSize: fontSize.huge,
            fontFamily: 'MavenPro-Bold',
            marginLeft: 20,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              size={fontSize.huge}
              color={Color.primary}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <LoginStack.Screen
        name="signup"
        component={SignUpScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: 'Đăng Ký',
          headerTitleStyle: {
            color: Color.primary,
            marginLeft: Platform.OS === 'android' ? 65 : 0,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              size={fontSize.huge}
              color={Color.primary}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <LoginStack.Screen
        name="qrcode"
        component={QRCodeScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              size={fontSize.huge}
              color="white"
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
    </LoginStack.Navigator>
  );
}
