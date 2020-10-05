import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import DashboardScreen from '../../../Views/Dashboard/DashboardScreen';
import AddRoomScreen from '../../../Views/Dashboard/AddRoomScreen';

import Color from '../../../Utils/Color';

const BottomTab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <BottomTab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'AddRoom':
              iconName = 'plus';
              break;
            case 'Users':
              iconName = 'users';
              break;
            case 'Setting':
              iconName = 'settings';
              break;
            default:
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveBackgroundColor: Color.background,
        activeBackgroundColor: Color.background,
        showLabel: false,
        activeTintColor: Color.primary,
        inactiveTintColor: 'gray',
        style: {
          shadowOpacity: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}>
      <BottomTab.Screen name="Dashboard" component={DashboardScreen} />
      <BottomTab.Screen name="AddRoom" component={AddRoomScreen} />
      <BottomTab.Screen name="Setting" component={AddRoomScreen} />
      <BottomTab.Screen name="Users" component={AddRoomScreen} />
    </BottomTab.Navigator>
  );
}
