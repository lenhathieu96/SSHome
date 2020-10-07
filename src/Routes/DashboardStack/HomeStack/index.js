import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../../../Views/Dashboard/HomeScreen';
import RoomScreen from '../../../Views/Dashboard/RoomScreen';
import CameraScreen from '../../../Views/Dashboard/CameraScreen';

import * as fontSize from '../../../Utils/FontSize';

const HomeStacks = createStackNavigator();

export default function HomeStack() {
  return (
    <HomeStacks.Navigator>
      <HomeStacks.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStacks.Screen
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
      <HomeStacks.Screen
        name="Camera"
        component={CameraScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          title: '',
          headerShown: false,
        })}
      />
    </HomeStacks.Navigator>
  );
}
