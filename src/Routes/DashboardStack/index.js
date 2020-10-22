import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import {handleLogout} from '../../Api/userAPI';
import {setController} from '../../Redux/ActionCreators/hardwareActions';

import Text, {BoldText} from '../../Components/Text';

import HomeStack from './HomeStack';
import AddRoomStack from './AddRoomStack';
import PersonalStack from './PersonalStack';

import styles from './styles/index.css';
import * as fontSize from '../../Utils/FontSize';
import Color from '../../Utils/Color';

const DashboardDrawer = createDrawerNavigator();

export default function DashboardStack() {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.user);
  const BlController = useSelector((state) => state.hardware.BLController);

  const [userRole, setUserRole] = useState();

  useEffect(() => {
    getUserRole();
  }, []);

  const getUserRole = async () => {
    const userRoleStorage = await AsyncStorage.getItem('userRole');
    setUserRole(userRoleStorage);
  };

  return (
    <DashboardDrawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            {/* Header */}
            <View style={styles.drawerHeaderContainer}>
              <Image source={{uri: UserProfile.avatar}} style={styles.avatar} />
              <View style={styles.userInfoContainer}>
                <BoldText style={styles.userName}>{UserProfile.name}</BoldText>
                <Text style={styles.userInfo}>(+84) {UserProfile.phone}</Text>
                <Text style={styles.userInfo}>
                  {userRole === 'Master' ? 'Chủ Nhà' : 'Thành Viên'}
                </Text>
              </View>
            </View>
            {/* Body */}
            <View style={styles.drawerBodyContainer}>
              <DrawerItemList {...props} />
              <DrawerItem
                label={BlController ? 'Chế độ Wifi' : 'Chế độ BlueTooth'}
                labelStyle={styles.label}
                icon={({focused}) => (
                  <Icon
                    color={'black'}
                    size={fontSize.bigger}
                    name="bluetooth"
                  />
                )}
                onPress={() => dispatch(setController())}
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
                onPress={() => {
                  handleLogout();
                }}
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
      {userRole === 'Master' ? (
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
      ) : null}
      {userRole === 'Master' ? (
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
      ) : null}
    </DashboardDrawer.Navigator>
  );
}
