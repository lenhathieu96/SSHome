/* eslint-disable prettier/prettier */
import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import AddRoomScreen from '../../../Views/Dashboard/AddRoomScreen';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';

const AddRoomStacks = createStackNavigator();

export default function AddRoomStack() {
  return (
    <AddRoomStacks.Navigator>
    <AddRoomStacks.Screen
    name="addRoom"
    component={AddRoomScreen}
    options={({navigation}) => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerTransparent: true,
      headerTitle: 'Thêm Phòng',
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
    </AddRoomStacks.Navigator>
  );
}