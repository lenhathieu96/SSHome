import React, {useRef} from 'react';
import {View, SafeAreaView, Animated, Image, Dimensions} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text, {BoldText} from '../../../Components/Text';
import QRCode from 'react-native-qrcode-svg';

import RootContainer from '../../../Components/RootContainer';

import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';
import Member from './Member';
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
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('window');
  const headerHeight = useHeaderHeight();

  //Add Button Container
  const btnAdd_width = scrollX.interpolate({
    inputRange: [0, 0.3 * width],
    outputRange: [0.3 * width, 50],
    extrapolate: 'clamp',
  });
  const btnAdd_height = scrollX.interpolate({
    inputRange: [0, 0.3 * width],
    outputRange: [0.5 * width, 50],
    extrapolate: 'clamp',
  });
  const btnAdd_position_top = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 60],
    extrapolate: 'clamp',
  });
  const btnAdd_position_left = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });
  const btnAdd_border_left_radius = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  //Add Button Image Container
  const imageContainer_height = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 40],
    extrapolate: 'clamp',
  });
  const imageContainer_margin = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 4],
    extrapolate: 'clamp',
  });
  const imageContainer_border_radius = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  //Call to Action
  const _cta_container_padding_top = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [20, -20],
    extrapolate: 'clamp',
  });
  const _cta_container_opacity = scrollX.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // icon
  const _icon_scale = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.6],
    extrapolate: 'clamp',
  });
  const _icon_position_top = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [-15, -28],
    extrapolate: 'clamp',
  });
  const _icon_position_right = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [33, -3],
    extrapolate: 'clamp',
  });

  return (
    <RootContainer
      safeArea={false}
      style={{marginTop: headerHeight, justifyContent: 'space-between'}}>
      <View style={styles.masterInfoContainer}>
        <Text>chỗ này ghi thông tin chủ nhà</Text>
      </View>
      <View style={styles.memberListContainer}>
        <BoldText style={styles.title}>Danh sách thành viên</BoldText>
        <MemberList />
      </View>
      <SafeAreaView style={styles.QRCodeContainer}>
        <BoldText style={styles.title}>Mã Khách Hàng</BoldText>
        <QRCode value="1258HGHO646" size={4 * fontSize.biggest} />
      </SafeAreaView>
    </RootContainer>
  );
}
