import React, {useRef, useEffect, useState} from 'react';
import {View, SafeAreaView, ImageBackground, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';
import auth from '@react-native-firebase/auth';

import Text, {BoldText} from '../../../Components/Text';
import ConfirmDelModal from '../../../Components/Modal/ConfirmDelModal';
import IconButton from '../../../Components/IconButton';
import RootContainer from '../../../Components/RootContainer';
import BSUploadImage from '../../../Components/Modal/BSUploadImage';

import {
  PlaceholderLine,
  PlaceholderMedia,
} from '../../../Components/PlaceHolder';
import BSPersonal from './BSPersonal';

import {useNotify, useAlert} from '../../../Hooks/useModal';
import {
  uploadMasterAvatar,
  uploadMemberAvatar,
  configMember,
  deleteMember,
} from '../../../Api/userAPI';
import {findRealRoomID} from '../../../Api/roomAPI';
import {updateAvatar} from '../../../Redux/ActionCreators/userActions';

import profileAvatar from '../../../Assets/Images/profile.png';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

import MemberList from './MemberList';

export default function Personal() {
  const {width} = Dimensions.get('window');

  const dispatch = useDispatch();
  const notify = useNotify();
  const alert = useAlert();
  const userInfo = useSelector((state) => state.user);
  const hardware = useSelector((state) => state.hardware);

  const [homeID, setHomeID] = useState();
  const [userRole, setUserRole] = useState();
  const [masterID, setMasterID] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [chosenUser, setChosenUser] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const BSPersonalRef = useRef();
  const BSChangeImageRef = useRef();

  useEffect(() => {
    getStorage();
    if (hardware.WFEnabled && userRole === 'Master') {
      const subscriber = firestore()
        .collection('Home')
        .doc(homeID)
        .collection('Member')
        .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setMemberList(users);
        });
      return () => subscriber();
    }
    setLoading(false);
  }, [homeID, userRole, hardware.WFEnabled]);

  const getStorage = async () => {
    try {
      const storage = await AsyncStorage.multiGet(['@masterID', '@userRole']);
      const response = await findRealRoomID(storage[0][1]);
      if (response && response.result) {
        setHomeID(response.data);
        setMasterID(storage[0][1]);
        setUserRole(storage[1][1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toogleConfirmModal = (isShowConfirmModal) => {
    setShowConfirm(isShowConfirmModal);
  };

  const onPressMember = (user) => {
    setChosenUser(user);
    BSPersonalRef.current.open();
  };

  const onLongPressMember = (user) => {
    setChosenUser(user);
    toogleConfirmModal(true);
  };

  const onDelMember = async () => {
    toogleConfirmModal(false);
    setLoading(true);
    const response = await deleteMember(chosenUser.id);
    notify(response.message, response.result);
  };

  const onConfigMember = async (member, isUpdate) => {
    if (hardware.WFEnabled) {
      const response = await configMember(member, isUpdate);
      BSPersonalRef.current.close();
      notify(response.message, response.result);
    } else {
      alert('Bạn cần kết nối wifi để thực hiện chức năng này');
    }
  };

  const uploadImage = async (imageURI) => {
    setLoading(true);

    const res =
      userRole === 'Master'
        ? await uploadMasterAvatar(imageURI)
        : await uploadMemberAvatar(userInfo.id, imageURI);
    if (res.result) {
      setLoading(false);
      dispatch(updateAvatar(res.uri));
    }
    BSChangeImageRef.current.close();
    notify(res.message, res.result);
  };

  return (
    <RootContainer
      safeArea={false}
      style={userRole === 'Master' ? styles.masterRoot : styles.memberRoot}>
      {/* User Info */}
      <View style={[styles.userInfoContainer]}>
        <View style={styles.avatarContainer}>
          <ImageBackground
            source={
              userInfo.avatar !== '' ? {uri: userInfo.avatar} : profileAvatar
            }
            resizeMode="cover"
            style={styles.avatar}>
            <IconButton
              iconName="camera"
              onPress={() => {
                if (hardware.WFEnabled) {
                  BSChangeImageRef.current.open();
                } else {
                  alert('Bạn cần kết nối wifi để thực hiện chức năng này');
                }
              }}
              style={styles.btnCamera}
              iconSize={fontSize.biggest}
              iconColor={Color.primary}
            />
          </ImageBackground>
        </View>
        {isLoading ? (
          <View style={styles.infoContainer}>
            <PlaceholderLine
              style={[
                styles.txtInfoContainer,
                {width: 0.5 * width, height: fontSize.normal},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.txtInfoContainer,
                {width: 0.5 * width, height: fontSize.normal},
              ]}
            />
            <PlaceholderLine
              style={[
                styles.txtInfoContainer,
                {width: 0.5 * width, height: fontSize.normal},
              ]}
            />
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <View style={styles.txtInfoContainer}>
              <BoldText>Tên: </BoldText>
              <Text>{userInfo.name}</Text>
            </View>
            {userRole !== 'Master' ? (
              <View style={styles.txtInfoContainer}>
                <BoldText>Số điện thoại: </BoldText>
                <Text>{userInfo.phone}</Text>
              </View>
            ) : (
              <View style={styles.txtInfoContainer}>
                <BoldText>Số thành viên: </BoldText>
                <Text>{memberList.length}</Text>
              </View>
            )}

            {userRole !== 'Master' ? null : (
              <View style={styles.txtInfoContainer}>
                <BoldText>Email: </BoldText>
                <Text>{userInfo.email}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      {/* Member List */}
      {userRole === 'Master' ? (
        <View style={styles.memberListContainer}>
          <BoldText style={styles.title}>Danh sách thành viên</BoldText>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.placeholderContainer}>
                <PlaceholderMedia style={styles.placeholderAvatar} />
                <PlaceholderLine style={styles.placeholderNameContainer} />
              </View>
            </View>
          ) : (
            <MemberList
              data={memberList}
              onPressMember={onPressMember}
              onLongPressMember={onLongPressMember}
            />
          )}
        </View>
      ) : null}

      {/* Home ID */}
      {userRole === 'Master' && masterID  ? (
        <SafeAreaView style={styles.QRCodeContainer}>
          <BoldText style={styles.title}>Mã Khách Hàng</BoldText>
          <QRCode value={masterID} size={4 * fontSize.biggest} />
        </SafeAreaView>
      ) : null}

      {userRole === 'Master' ? (
        <BSPersonal
          ref={BSPersonalRef}
          onConfigMember={onConfigMember}
          roomList={userInfo.availableRooms}
          memberProfile={chosenUser}
        />
      ) : null}

      {userRole === 'Master' ? (
        <ConfirmDelModal
          isVisible={showConfirm}
          toggleModal={toogleConfirmModal}
          title={`${
            chosenUser ? chosenUser.name : ''
          } sẽ bị xoá khỏi danh sách thành viên`}
          onAccept={onDelMember}
        />
      ) : null}

      <BSUploadImage
        ref={BSChangeImageRef}
        uploadImage={uploadImage}
        isLoading={isLoading}
      />
    </RootContainer>
  );
}
