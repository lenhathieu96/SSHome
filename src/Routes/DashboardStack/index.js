import React from 'react';
import {View, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import {handleLogout} from '../../Api/userAPI'
import Text, {BoldText} from '../../Components/Text';

import HomeStack from './HomeStack';
import AddRoomStack from './AddRoomStack';
import PersonalStack from './PersonalStack';

import styles from './styles/index.css';
import * as fontSize from '../../Utils/FontSize';
import Color from '../../Utils/Color';
import flagVn from '../../Assets/Images/vietnam.png';

const DashboardDrawer = createDrawerNavigator();

export default function DashboardStack() {
  return (
    <DashboardDrawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            {/* Header */}
            <View style={styles.drawerHeaderContainer}>
              <Image source={flagVn} style={styles.avatar} />
              <View style={styles.userInfoContainer}>
                <BoldText style={styles.userName}>LeeNhaHie</BoldText>
                <Text style={styles.userInfo}>(+84) 0329599586</Text>
                <Text style={styles.userInfo}>Chủ Nhà</Text>
              </View>
            </View>
            {/* Body */}
            <View style={styles.drawerBodyContainer}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Chế Độ Bluetooth"
                labelStyle={styles.label}
                icon={({focused}) => (
                  <Icon
                    color={'black'}
                    size={fontSize.bigger}
                    name="bluetooth"
                  />
                )}
              />
              <DrawerItem
                label="Trợ Giúp"
                labelStyle={styles.label}
                icon={({focused}) => (
                  <Icon
                    color={'black'}
                    size={fontSize.bigger}
                    name="help-circle"
                  />
                )}
              />
            </View>
            {/* Footer */}
            <View style={styles.drawerFooterContainer}>
              <DrawerItem
                label="Đăng Xuất"
                labelStyle={[styles.label, {color: Color.red}]}
                icon={({focused, color, size}) => (
                  <Icon
                    color={Color.red}
                    size={fontSize.bigger}
                    name="log-out"
                  />
                )}
                onPress={() => handleLogout()}
              />
              <Text style={styles.txtVersion}>SSHome v1.0.1</Text>
            </View>
          </DrawerContentScrollView>
        );
      }}
      drawerContentOptions={{activeTintColor: Color.primary}}>
      {/* Screens */}
      <DashboardDrawer.Screen
        name="home"
        component={HomeStack}
        options={{
          drawerLabel: () => <BoldText>Trang Chủ</BoldText>,
          drawerIcon: ({focused}) => (
            <Icon color={'black'} size={fontSize.bigger} name="home" />
          ),
        }}
      />
      <DashboardDrawer.Screen
        name="addRoom"
        component={AddRoomStack}
        options={{
          drawerLabel: () => <BoldText>Thêm Phòng</BoldText>,
          drawerIcon: ({focused, color, size}) => (
            <Icon color={'black'} size={fontSize.bigger} name="plus" />
          ),
        }}
      />
      <DashboardDrawer.Screen
        name="personal"
        component={PersonalStack}
        options={{
          drawerLabel: () => <BoldText>Cá Nhân</BoldText>,
          drawerIcon: ({focused}) => (
            <Icon color={'black'} size={fontSize.bigger} name="user" />
          ),
        }}
      />
    </DashboardDrawer.Navigator>
  );
}
