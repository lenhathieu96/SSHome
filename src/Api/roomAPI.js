import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';

export const addRoom = async () => {
  const homeID = await AsyncStorage.getItem('homeID');
  const roomID = `R${homeID.slice(2, 5)}${createID()}`;
  let roomData = {
    [roomID]: {
      name: 'Phòng Khách',
      id: roomID,
    },
  };
  try {
    await database().ref(homeID).update(roomData);
  } catch (error) {
    console.log(error);
  }
};

export const updateRoomBackground = async (homeID, imageURI, roomID) => {
  try {
    const reference = storage().ref(`/${homeID}/Rooms/${roomID}`);
    await reference.putFile(imageURI);
    const URL = await reference.getDownloadURL();
    await database().ref(`/${homeID}/${roomID}`).update({background: URL});
    return {result: true, uri: URL};
  } catch (error) {
    console.log(error);
    return {result: false, message: 'Cập nhập hình thất bại'};
  }
};

export const addNewDevice = async (homeID, roomID, device) => {
  try {
    let deviceID = `DV${homeID.slice(2, 5)}${createID()}`;
    let uploadDevice = {...device, id: deviceID};
    await database()
      .ref(`/${homeID}/${roomID}/devices/${deviceID}`)
      .set(uploadDevice);
    return {result: true, message: 'Thêm Thành Công'};
  } catch (error) {
    return {result: false, message: 'Thêm Thất bại'};
  }
};

export const updateStatusDevice = async (homeID, roomID, deviceID, status) => {
  try {
    await database()
      .ref(`/${homeID}/${roomID}/devices/${deviceID}`)
      .update({status});
    return {result: true, message: 'Cập Nhập Trạng Thái Thành công'};
  } catch (error) {
    console.log(error);
    return {result: false, message: 'Cập Nhập Trạng Thái Thất bại'};
  }
};

export const deleteDevice = async (homeID, roomID, deviceID) => {
  try {
    await database().ref(`/${homeID}/${roomID}/devices/${deviceID}`).remove();
    return {result: true, message: 'Xoá Thiết Bi Thành công'};
  } catch (error) {
    console.log(error);
    return {result: false, message: 'Xoá  Thiết Bị Thất bại'};
  }
};

function createID() {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}
