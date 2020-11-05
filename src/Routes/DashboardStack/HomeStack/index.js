import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import {useSelector} from 'react-redux';
import HomeScreen from '../../../Views/Dashboard/HomeScreen';
import RoomScreen from '../../../Views/Dashboard/RoomScreen';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';

const HomeStacks = createStackNavigator();

export default function HomeStack() {
  const BLController = useSelector((state) => state.hardware.BLController);
  return (
    <HomeStacks.Navigator initialRouteName="Home">
      <HomeStacks.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerTransparent: true,
          headerTitle: 'SSHOME',
          headerTitleStyle: {
            color: Color.primary,
            fontSize: fontSize.huge,
            alignSelf: 'center',
            fontFamily: 'MavenPro-Bold',
          },
          headerLeft: () => (
            <Icon.Button
              name="bar-chart-2"
              style={{transform: [{rotate: '90deg'}]}}
              color={Color.primary}
              size={fontSize.bigger}
              backgroundColor="transparent"
              borderRadius={10}
              onPress={() => navigation.openDrawer()}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name={BLController ? 'bluetooth' : 'wifi'}
              color={Color.primary}
              size={fontSize.bigger}
              backgroundColor="transparent"
              borderRadius={10}
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <HomeStacks.Screen
        name="Room"
        component={RoomScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        })}
      />
    </HomeStacks.Navigator>
  );
}
