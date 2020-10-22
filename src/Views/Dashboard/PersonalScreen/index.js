import React, {useRef, useEffect, useState} from 'react';
import {View, SafeAreaView, Image, ImageBackground} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';
import ImagePicker from 'react-native-image-picker';

import Text, {BoldText} from '../../../Components/Text';
import ConfirmDelModal from '../../../Components/ConfirmDelModal';
import IconButton from '../../../Components/IconButton';
import RootContainer from '../../../Components/RootContainer';
import BSPersonal from './BSPersonal';

import {getMemberList} from '../../../Api/userAPI';

import userBlank from '../../../Assets/Images/userBlank.png';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

import MemberList from './MemberList';

export default function Personal() {
  const headerHeight = useHeaderHeight();
  const masterInfo = useSelector((state) => state.user);
  const [homeID, setHomeID] = useState();
  const [memberList, setMemberList] = useState([]);
  const [avatarSrc, setAvatarSrc] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const BSPersonalRef = useRef();

  useEffect(() => {
    getHomeID();
    getMembers();
  }, []);

  const getHomeID = async () => {
    const homeIDStorage = await AsyncStorage.getItem('homeID');
    if (homeIDStorage) {
      setHomeID(homeIDStorage);
    }
  };

  const getMembers = async () => {
    const Users = await getMemberList();
    setMemberList(Users);
    // setMemberList(MemberList);
  };

  const addNewMember = (member) => {
    console.log(member);
  };

  const showBSPersonal = () => {
    BSPersonalRef.current.snapTo(0);
  };

  const toogleModal = (isShowConfirmModal) => {
    setModalVisible(isShowConfirmModal);
  };

  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        setAvatarSrc(source);
      }
    });
  };
  return (
    <RootContainer
      safeArea={false}
      style={{marginTop: headerHeight, justifyContent: 'space-between'}}>
      {/* Master Info */}
      <View style={styles.masterInfoContainer}>
        <View style={styles.avatarContainer}>
          <ImageBackground
            source={avatarSrc ? avatarSrc : userBlank}
            style={styles.avatar}>
            <IconButton
              iconName="camera"
              onPress={() => showBSPersonal()}
              style={styles.btnCamera}
              iconSize={fontSize.biggest}
              iconColor={Color.primary}
            />
          </ImageBackground>
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
            <Text>{memberList.length}</Text>
          </View>
        </View>
      </View>
      {/* Member List */}
      {/* Home ID */}
      <SafeAreaView style={styles.QRCodeContainer}>
        <BoldText style={styles.title}>Mã Khách Hàng</BoldText>
        <QRCode value={homeID} size={4 * fontSize.biggest} />
      </SafeAreaView>
      <BSPersonal ref={BSPersonalRef} addNewMember={addNewMember} />
      <ConfirmDelModal modalVisible={modalVisible} toogleModal={toogleModal} />
    </RootContainer>
  );
}
