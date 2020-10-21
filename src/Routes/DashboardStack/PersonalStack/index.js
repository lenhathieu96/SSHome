/* eslint-disable prettier/prettier */
import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import PersonalScreen from '../../../Views/Dashboard/AdminScreen';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';

const PersonalStacks = createStackNavigator();

export default function PersonalStack() {
  return (
    <PersonalStacks.Navigator initialRouteName="Personal">
    <PersonalStacks.Screen
    name="Personal"
    component={PersonalScreen}
    options={({navigation}) => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerTransparent: true,
      headerTitle: 'Thông Tin Cá Nhân',
      headerTitleStyle:{
        color: Color.primary,
        fontSize: fontSize.huge,
        alignSelf: 'center',
        fontFamily:'MavenPro-Bold',
      },
      headerLeft: () => (
        <Icon.Button
          name="chevron-left"
          color= {Color.primary}
          size={fontSize.bigger}
          backgroundColor="transparent"
          borderRadius={10}
          onPress={() => navigation.goBack()}
          underlayColor="transparent"
          activeOpacity={0.4}
        />
      ),
    })}
  />
    </PersonalStacks.Navigator>
  );
}
