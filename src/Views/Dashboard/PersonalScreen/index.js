import React from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import Text, {BoldText} from '../../../Components/Text';
import QRCode from 'react-native-qrcode-svg';

import RootContainer from '../../../Components/RootContainer';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';
import Member from './Member';

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
  return (
    <RootContainer
      safeArea={false}
      style={{marginTop: headerHeight, justifyContent: 'space-between'}}>
      <View style={styles.masterInfoContainer}>
        <Text>chỗ này ghi thông tin chủ nhà</Text>
      </View>
      <View style={styles.memberListContainer}>
        <BoldText style={styles.title}>Danh sách thành viên</BoldText>
        <FlatList
          contentContainerStyle={styles.memberList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => <Member User={item} index={index} />}
        />
      </View>
      <SafeAreaView style={styles.QRCodeContainer}>
        <BoldText style={styles.title}>Mã Khách Hàng</BoldText>
        <QRCode value="1258HGHO646" size={4 * fontSize.biggest} />
      </SafeAreaView>
    </RootContainer>
  );
}
