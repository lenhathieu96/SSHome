import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import RoomScreen from '../../Views/Dashboard/RoomScreen';
import CameraScreen from '../../Views/Dashboard/CameraScreen';
import TabStack from './TabStack';

import * as fontSize from '../../Utils/FontSize';

const MasterStacks = createStackNavigator();

export default function MasterStack() {
  return (
    <MasterStacks.Navigator initialRouteName={'Dashboard'}>
      <MasterStacks.Screen
        name="Dashboard"
        component={TabStack}
        options={{headerShown: false}}
      />
      <MasterStacks.Screen
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
      <MasterStacks.Screen
        name="Camera"
        component={CameraScreen}
        options={{headerShown: false}}
      />
    </MasterStacks.Navigator>
  );
}
