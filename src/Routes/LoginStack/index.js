import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import IntroScreen from '../../Views/Login/IntroScreen';
import MasterLoginScreen from '../../Views/Login/MasterLoginScreen';
import MemberLoginScreen from '../../Views/Login/MemberLoginScreen';
import OTPScreen from '../../Views/Login/OTPScreen';
import SignUpScreen from '../../Views/Login/SignUpScreen';

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
          headerTransparent: true,
          headerTitle: 'Đăng Nhập Chủ Nhà',
          headerTitleStyle: {
            color: Color.primary,
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
          headerTransparent: true,
          headerTitle: 'Đăng Nhập Thành Viên',
          headerTitleStyle: {
            color: Color.primary,
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
          headerTransparent: true,
          headerTitle: 'Xác Thực OTP',
          headerTitleStyle: {
            color: Color.primary,
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
          headerTransparent: true,
          headerTitle: 'Đăng Nhập Thành Viên',
          headerTitleStyle: {
            color: Color.primary,
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
    </LoginStack.Navigator>
  );
}
