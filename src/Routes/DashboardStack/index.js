import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import DashBoardScreen from '../../Views/Dashboard/DashboardScreen';
import RoomDetailScreen from '../../Views/Dashboard/RoomDetailScreen';
import AddRoomScreen from '../../Views/Dashboard/AddRoomScreen';
import CameraScreen from '../../Views/Dashboard/CameraScreen';

import * as fontSize from '../../Utils/FontSize';
import Color from '../../Utils/Color';

const DashboardStack = createStackNavigator();
export default function DashBoardStacks() {
  const connectionStatus = useSelector((state) => state.hardware);

  return (
    <DashboardStack.Navigator initialRouteName="DashboardScr">
      <DashboardStack.Screen
        name="DashboardScr"
        component={DashBoardScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          title: 'SSHOME',
          headerStyle: {
            backgroundColor: 'transparent',
            height: 80,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: Color.primary,
          headerTitleStyle: {
            fontSize: fontSize.larger,
            fontFamily: 'MavenPro-Bold',
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon.Button
              name="bluetooth-b"
              size={fontSize.huge}
              color={
                connectionStatus.BLConnection ? Color.green : Color.unactive
              }
              backgroundColor="transparent"
              // disabled={!BLE}
              // onPress={() => navigation.goBack()}
              underlayColor="transparent"
              activeOpacity={0.4}
              style={{marginLeft: 30}}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="wifi"
              size={fontSize.huge}
              backgroundColor="transparent"
              color={
                connectionStatus.WFConnection ? Color.green : Color.unactive
              }
              // onPress={() =>
              //   navigation.navigate('cameraScr', {isFromAddNewRoom: false})
              // }
              underlayColor="transparent"
              activeOpacity={0.4}
              style={{marginRight: 30}}
            />
          ),
        })}
      />
      <DashboardStack.Screen
        name="roomScr"
        component={RoomDetailScreen}
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
                navigation.navigate('cameraScr', {isFromAddNewRoom: false})
              }
              underlayColor="transparent"
              activeOpacity={0.4}
            />
          ),
        })}
      />
      <DashboardStack.Screen
        name="addroomScr"
        component={AddRoomScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        })}
      />
      <DashboardStack.Screen
        name="cameraScr"
        component={CameraScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          title: '',
          headerTransparent: true,
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
        })}
      />
    </DashboardStack.Navigator>
  );
}
