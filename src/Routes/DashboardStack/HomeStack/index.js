import React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import HomeScreen from '../../../Views/Dashboard/HomeScreen';
import RoomScreen from '../../../Views/Dashboard/RoomScreen';

const HomeStacks = createSharedElementStackNavigator();

export default function HomeStack() {
  return (
    <HomeStacks.Navigator initialRouteName="Home">
      <HomeStacks.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <HomeStacks.Screen
        name="Room"
        component={RoomScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </HomeStacks.Navigator>
  );
}
