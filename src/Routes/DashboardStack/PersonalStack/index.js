/* eslint-disable prettier/prettier */
import React from 'react';
import { Platform } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import PersonalScreen from '../../../Views/Dashboard/PersonalScreen';

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
      headerTitle: 'Thông Tin Cá Nhân',
      headerTitleStyle:{
        marginLeft: Platform.OS === 'android' ? 20 : 0,
        color: Color.primary,
        fontSize: fontSize.huge,
        alignSelf: 'flex-start',
        fontFamily:'MavenPro-Bold',
      },
      headerStyle:{
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
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
