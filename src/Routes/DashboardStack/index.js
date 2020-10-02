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
  const connectionStatus = useSelector((state) => state.hardware);

  return (
    <DashboardStack.Navigator initialRouteName="DashboardScr">
      <DashboardStack.Screen
        name="DashboardScr"
        component={DashBoardScreen}
        options={({navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
          title: 'SSHOME',
          headerTransparent: true,
          headerTintColor: Color.primary,
          headerTitleStyle: {
            fontSize: fontSize.larger,
            fontFamily: 'MavenPro-Bold',
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
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
              style={{marginLeft: deviceWidth * 0.1}}
            />
          ),
          headerRight: () => (
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
              style={{marginRight: deviceWidth * 0.1}}
            />
          ),
        })}
      />
      <DashboardStack.Screen
        name="roomScr"
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
          headerShown: false,
        })}
      />
    </DashboardStack.Navigator>
  );
}
