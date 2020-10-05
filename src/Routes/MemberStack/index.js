import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import DashBoardScreen from '../../Views/Dashboard/DashboardScreen';
import RoomScreen from '../../Views/Dashboard/RoomScreen';
import AddRoomScreen from '../../Views/Dashboard/AddRoomScreen';
import CameraScreen from '../../Views/Dashboard/CameraScreen';

import * as fontSize from '../../Utils/FontSize';
import Color from '../../Utils/Color';

const DashboardStack = createStackNavigator();
const deviceWidth = Dimensions.get('window').width;

export default function DashBoardStacks() {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard">
      <DashboardStack.Screen
        name="Dashboard"
        component={DashBoardScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        })}
      />
      <DashboardStack.Screen
        name="Room"
        component={RoomScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              size={fontSize.huge}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="camera"
              size={fontSize.huge}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() =>
                navigation.navigate('Camera', {isFromAddNewRoom: false})
              }
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <DashboardStack.Screen
        name="Camera"
        component={CameraScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          title: '',
          headerShown: false,
        })}
      />
    </DashboardStack.Navigator>
  );
}
