import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

export const addRoom = async (homeID, name, imageURI, isCustomImage) => {
  const roomID = `R${homeID.slice(2, 5)}${createID()}`;
  try {
    const reference = storage().ref(`/${homeID}/Rooms/${roomID}`);
    let URL;
    if (isCustomImage) {
      await reference.putFile(imageURI);
      URL = await reference.getDownloadURL();
    } else {
      URL = imageURI;
    }
    let roomData = {
      [roomID]: {
        name,
        id: roomID,
        background: URL,
      },
    };
    await database().ref(homeID).update(roomData);
    return {
      result: true,
      message: 'Tạo phòng thành công',
      room: roomData[roomID],
    };
  } catch (error) {
    console.log(error);
    return {result: false, message: 'Tạo phòng thất bại'};
  }
};

export const deleteRoom = async (homeID, roomID) => {
  try {
    await database().ref(`${homeID}/${roomID}`).remove();
  } catch (error) {
    console.log(error);
    return {result: false, message: 'Tạo phòng thất bại'};
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

export const getUsedPorts = async (homeID) => {
  try {
    if (homeID) {
      const homeData = await database().ref(`/${homeID}`).once('value');
      const ports = [];
      const rooms = homeData.val();
      delete rooms.DHT22;
      for (let roomID in rooms) {
        let deviceList = rooms[roomID].devices;
        for (let device in deviceList) {
          ports.push(deviceList[device].port);
        }
      }
      return {
        result: true,
        message: 'Lấy danh sách cổng thành công',
        data: ports,
      };
    }
  } catch (error) {
    console.log(error);
    return {result: false, message: 'Lấy danh sách cổng thất bại'};
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
    const exits = await database()
      .ref(`/${homeID}/${roomID}/devices/${deviceID}`)
      .once('value');
    if (!exits.val()) {
      return {result: false, message: 'Thiết bị không tồn tại'};
    }
    await database().ref(`/${homeID}/${roomID}/devices/${deviceID}`).remove();
    return {result: true, message: 'Xoá thiết bị thành công'};
  } catch (error) {
    return {result: false, message: 'Xoá  thiết bị thất bại'};
  }
};

function createID() {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}
