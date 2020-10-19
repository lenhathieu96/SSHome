import React, {useRef, useEffect, useState} from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';

import Text, {BoldText} from '../../../Components/Text';

import RootContainer from '../../../Components/RootContainer';

import userBlank from '../../../Assets/Images/userBlank.png';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

import MemberList from './MemberList';

const userData = [
  {
    id: '12',
    name: 'Member1',
    phone: '032252385256',
  },
  {
    id: '13',
    name: 'Member2',
    phone: '032252385245',
  },
  {
    id: '14',
    name: 'Member3',
    phone: '032252385224',
  },
];

export default function Personal() {
  const headerHeight = useHeaderHeight();
  const masterInfo = useSelector((state) => state.user);
  const [homeID, setHomeID] = useState();

  useEffect(function () {
    getHomeID();
  }, []);

  const getHomeID = async () => {
    const homeIDStorage = await AsyncStorage.getItem('homeID');
    if (homeIDStorage) {
      setHomeID(homeIDStorage);
    }
  };

  return (
    <RootContainer
      safeArea={false}
      style={{marginTop: headerHeight, justifyContent: 'space-between'}}>
      {/* Master Info */}
      <View style={styles.masterInfoContainer}>
        <View style={styles.avatarContainer}>
          <Image source={userBlank} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.txtInfoContainer}>
            <BoldText>Tên: </BoldText>
            <Text>{masterInfo.name}</Text>
          </View>
          <View style={styles.txtInfoContainer}>
            <BoldText>Email: </BoldText>
            <Text>{masterInfo.email}</Text>
          </View>
          <View style={styles.txtInfoContainer}>
            <BoldText>Số thành viên: </BoldText>
            <Text>3</Text>
          </View>
        </View>
      </View>
      {/* Member List */}
      <View style={styles.memberListContainer}>
        <BoldText style={styles.title}>Danh sách thành viên</BoldText>
        <MemberList data={userData} />
      </View>
      {/* Home ID */}
      <SafeAreaView style={styles.QRCodeContainer}>
        <BoldText style={styles.title}>Mã Khách Hàng</BoldText>
        <QRCode value={homeID} size={4 * fontSize.biggest} />
      </SafeAreaView>
    </RootContainer>
  );
}
