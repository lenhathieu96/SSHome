import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {useSelector} from 'react-redux';
import HomeScreen from '../../../Views/Dashboard/HomeScreen';
import RoomScreen from '../../../Views/Dashboard/RoomScreen';

const HomeStacks = createStackNavigator();

export default function HomeStack() {
  return (
    <HomeStacks.Navigator initialRouteName="Home">
      <HomeStacks.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        })}
      />
      <HomeStacks.Screen
        name="Room"
        component={RoomScreen}
        options={() => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        })}
      />
    </HomeStacks.Navigator>
  );
}
