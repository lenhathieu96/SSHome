/* eslint-disable prettier/prettier */
import React from 'react';
import {Platform} from 'react-native';
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
      headerTitle: 'Thêm Phòng',
      headerTitleStyle:{
        marginLeft: Platform.OS === 'android' ? 50 : 0,
        color: Color.primary,
        fontSize: fontSize.huge,
        alignSelf: 'flex-start',
        fontFamily:'MavenPro-Bold',
        backgroundColor: 'white',
      },
      headerStyle:{
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
    </AddRoomStacks.Navigator>
  );
}
