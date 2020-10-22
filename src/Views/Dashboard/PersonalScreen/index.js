import React, {useRef, useEffect, useState} from 'react';
import {View, SafeAreaView, ImageBackground} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';
import ImagePicker from 'react-native-image-picker';

import Text, {BoldText} from '../../../Components/Text';
import ConfirmDelModal from '../../../Components/ConfirmDelModal';
import IconButton from '../../../Components/IconButton';
import RootContainer from '../../../Components/RootContainer';
import BSPersonal from './BSPersonal';

import {getMemberList, uploadMasterAvatar} from '../../../Api/userAPI';
import {updateAvatar} from '../../../Redux/ActionCreators/userActions';

import profileAvatar from '../../../Assets/Images/profile.png';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

import MemberList from './MemberList';

export default function Personal() {
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const masterInfo = useSelector((state) => state.user);

  const [homeID, setHomeID] = useState();
  const [memberList, setMemberList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenUser, setChosenUser] = useState();

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

  const onChoseUser = (user) => {
    setChosenUser(user);
    toogleModal(true);
  };

  const delUser = () => {
    toogleModal(false);
    console.log(chosenUser.id);
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
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        const res = await uploadMasterAvatar(source.uri);
        if (res.result) {
          console.log('upload success');
          dispatch(updateAvatar(res.uri));
        } else {
          console.log('upload failed');
        }
      }
    });
  };

  return (
    <RootContainer
      safeArea={false}
      style={{
        marginTop: headerHeight,
        justifyContent: 'space-between',
      }}>
      {/* Master Info */}
      <View style={styles.masterInfoContainer}>
        <View style={styles.avatarContainer}>
          <ImageBackground
            source={
              masterInfo.avatar !== ''
                ? {uri: masterInfo.avatar}
                : profileAvatar
            }
            style={styles.avatar}>
            <View style={styles.btnCameraContainer}>
              <IconButton
                iconName="camera"
                onPress={() => selectPhotoTapped()}
                style={styles.btnCamera}
                iconSize={fontSize.biggest}
                iconColor={Color.primary}
              />
            </View>
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
      <View style={styles.memberListContainer}>
        <BoldText style={styles.title}>Danh sách thành viên</BoldText>
        <MemberList
          data={memberList}
          showBSPersonal={showBSPersonal}
          onChoseUser={onChoseUser}
        />
      </View>
      {/* Home ID */}
      <SafeAreaView style={styles.QRCodeContainer}>
        <BoldText style={styles.title}>Mã Khách Hàng</BoldText>
        <QRCode value={homeID} size={4 * fontSize.biggest} />
      </SafeAreaView>

      <BSPersonal
        ref={BSPersonalRef}
        addNewMember={addNewMember}
        roomList={masterInfo.availableRoom}
      />
      <ConfirmDelModal
        modalVisible={modalVisible}
        toggleModal={toogleModal}
        title={`${
          chosenUser ? chosenUser.name : ''
        } sẽ bị xoá khỏi danh sách thành viên`}
        onAccept={delUser}
      />
    </RootContainer>
  );
}
