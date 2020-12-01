import React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import HomeScreen from '../../../Views/HomeScreen';
import RoomScreen from '../../../Views/RoomScreen';

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
        sharedElements={(route, otherRoute, showing) => {
          const {room} = route.params;
          return [`item.${room.id}.photo`];
        }}
      />
    </HomeStacks.Navigator>
  );
}
