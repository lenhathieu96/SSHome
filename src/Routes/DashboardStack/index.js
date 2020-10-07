import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {BoldText} from '../../Components/Text';
import Icon from 'react-native-vector-icons/Feather';

import * as fontSize from '../../Utils/FontSize';
import Color from '../../Utils/Color';

import HomeStack from './HomeStack';
import AddRoomScreen from '../../Views/Dashboard/AddRoomScreen';

const DashboardDrawer = createDrawerNavigator();

export default function DashboardStack() {
  return (
    <DashboardDrawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Đăng Xuất"
              labelStyle={{fontFamily: 'MavenPro-Regular', fontWeight: 'bold'}}
              icon={({focused, color, size}) => (
                <Icon color={color} size={size} name="log-out" />
              )}
            />
            <DrawerItem
              label="Chế Độ Bluetooth"
              labelStyle={{
                fontFamily: 'MavenPro-Regular',
                fontWeight: 'bold',
                color: 'black',
              }}
              icon={({focused}) => (
                <Icon
                  color={focused ? 'red' : 'black'}
                  size={fontSize.bigger}
                  name="bluetooth"
                />
              )}
            />
          </DrawerContentScrollView>
        );
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        itemStyle: {borderBottomWidth: 1, borderColor: '#e8e8e8'},
      }}>
      <DashboardDrawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerLabel: () => <BoldText>Trang Chủ</BoldText>,
          drawerIcon: ({focused}) => (
            <Icon
              color={focused ? 'red' : 'black'}
              size={fontSize.bigger}
              name="home"
            />
          ),
        }}
      />
      <DashboardDrawer.Screen
        name="addRoom"
        component={AddRoomScreen}
        options={{
          drawerLabel: () => <BoldText>Thêm Phòng</BoldText>,
          drawerIcon: ({focused, color, size}) => (
            <Icon color={color} size={size} name="plus" />
          ),
        }}
      />
      <DashboardDrawer.Screen
        name="Users"
        component={AddRoomScreen}
        options={{
          drawerLabel: () => <BoldText>Thành Viên</BoldText>,
          drawerIcon: ({focused, color, size}) => (
            <Icon color={color} size={size} name="users" />
          ),
        }}
      />
    </DashboardDrawer.Navigator>
  );
}
