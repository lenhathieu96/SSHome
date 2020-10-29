import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';

import {addRoom} from '../../../Api/roomAPI';

import roomBg1 from '../../../Assets/Images/roomBackground1.jpg';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function AddRoomScreen({navigation, route}) {
  const headerHeight = useHeaderHeight();

  const [roomName, setRoomName] = useState();

  return (
    <KeyboardAvoidingView style={{flex: 1, marginTop: headerHeight}}>
      <TextInput
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
        label="Tên Phòng"
        mode="outlined"
        style={[styles.formController, {flex: 0.1}]}
        theme={{
          colors: {primary: Color.primary, underlineColor: 'transparent'},
        }}
        onChange={(text) => setRoomName(text)}
      />
      <View style={styles.groupImageContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={roomBg1}
            style={{flex: 1, width: null, height: null}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.imgContainer}>
          <Image
            source={roomBg1}
            style={{flex: 1, width: null, height: null}}
            resizeMode="contain"
          />
        </View>
      </View>
      <TextButton
        text="Tạo Phòng"
        style={styles.btnAddRoom}
        onPress={() => {}}
      />
    </KeyboardAvoidingView>
  );
}
