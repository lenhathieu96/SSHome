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
import LinearGradient from 'react-native-linear-gradient';

import OneSignal from 'react-native-onesignal';

import {handleLogout} from '../../Api/userAPI';
import {clearUserData} from '../../Redux/ActionCreators/userActions';

import Text, {BoldText} from '../../Components/Text';

import HomeStack from './HomeStack';
import AddRoomStack from './AddRoomStack';
import PersonalStack from './PersonalStack';

import profileAvatar from '../../Assets/Images/profile.png';
import styles from './styles/index.css';
import * as fontSize from '../../Utils/FontSize';
import Color from '../../Utils/Color';

const DashboardDrawer = createDrawerNavigator();

export default function DashboardStack() {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    OneSignal.setAppId('cfdd7d78-2f55-4452-9895-2664e8058b87');
    OneSignal.setLogLevel(6, 0);
    getUserRole();
  }, []);

  const getUserRole = async () => {
    const userRoleStorage = await AsyncStorage.getItem('@userRole');
    setUserRole(userRoleStorage);
  };

  return (
    <DashboardDrawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            {/* Header */}
            <View style={styles.drawerHeaderContainer}>
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={[Color.secondary, Color.primary]}
                style={styles.avatarContainer}>
                <Image
                  source={
                    UserProfile.avatar && UserProfile.avatar !== ''
                      ? {uri: UserProfile.avatar}
                      : profileAvatar
                  }
                  style={styles.avatar}
                  resizeMode="cover"
                  borderRadius={50}
                />
              </LinearGradient>

              <View style={styles.userInfoContainer}>
                <BoldText style={styles.userName}>{UserProfile.name}</BoldText>
                <Text style={styles.userInfo}>(+84) {UserProfile.phone}</Text>
                <Text style={styles.userInfo}>
                  {userRole === 'Master' ? 'Chủ Hộ' : 'Thành Viên'}
                </Text>
              </View>
            </View>
            {/* Body */}
            <View style={styles.drawerBodyContainer}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Thông báo"
                labelStyle={styles.label}
                icon={({focused}) => (
                  <Icon color={'black'} size={fontSize.bigger} name="mail" />
                )}
              />
              <DrawerItem
                label="Trò chuyện"
                labelStyle={styles.label}
                icon={({focused}) => (
                  <Icon
                    color={'black'}
                    size={fontSize.bigger}
                    name="message-circle"
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
                onPress={() => {
                  dispatch(clearUserData());
                  handleLogout(userRole, UserProfile.id);
                }}
              />
              <Text style={styles.txtVersion}>SSHome v1.0.1</Text>
            </View>
          </DrawerContentScrollView>
        );
      }}
      drawerContentOptions={{activeTintColor: Color.unactive}}>
      {/* Screens */}
      <DashboardDrawer.Screen
        name="home"
        component={HomeStack}
        options={{
          drawerLabel: ({focused}) => (
            <BoldText style={{color: focused ? Color.primary : 'black'}}>
              Trang Chủ
            </BoldText>
          ),
          drawerIcon: ({focused}) => (
            <Icon
              color={focused ? Color.primary : 'black'}
              size={fontSize.bigger}
              name="home"
            />
          ),
        }}
      />
      {userRole === 'Master' ? (
        <DashboardDrawer.Screen
          name="addRoom"
          component={AddRoomStack}
          options={{
            drawerLabel: ({focused}) => (
              <BoldText style={{color: focused ? Color.primary : 'black'}}>
                Thêm Phòng
              </BoldText>
            ),
            drawerIcon: ({focused, color, size}) => (
              <Icon
                color={focused ? Color.primary : 'black'}
                size={fontSize.bigger}
                name="plus"
              />
            ),
          }}
        />
      ) : null}

      <DashboardDrawer.Screen
        name="personal"
        component={PersonalStack}
        options={{
          drawerLabel: ({focused}) => (
            <BoldText style={{color: focused ? Color.primary : 'black'}}>
              Cá Nhân
            </BoldText>
          ),
          drawerIcon: ({focused}) => (
            <Icon
              color={focused ? Color.primary : 'black'}
              size={fontSize.bigger}
              name="user"
            />
          ),
        }}
      />
    </DashboardDrawer.Navigator>
  );
}
