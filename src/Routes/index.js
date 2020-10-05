import React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import LoginStack from './LoginStack';
import MasterStack from './MasterStack';
import MemberStack from './MemberStack';

// import {AuthContext} from '../Contexts/AuthContext';

const AuthStack = createStackNavigator();

export default function MainRoute() {
  //   const context = useContext(AuthContext);

  //   const restoreToken = async () => {
  //     try {
  //       let token = await AsyncStorage.getItem('accessToken');
  //       context.setLogin(token ? true : false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     restoreToken();
  //   }, []);

  return (
    <AuthStack.Navigator initialRouteName="LoginStack">
      {/*  {!context.isLogin ? ( */}
      <AuthStack.Screen
        name="LoginStack"
        component={LoginStack}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      {/*   ) : ( */}
      <AuthStack.Screen
        name="MemberStack"
        component={MemberStack}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <AuthStack.Screen
        name="MasterStack"
        component={MasterStack}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      {/* )} */}
    </AuthStack.Navigator>
  );
}
