export const setLoginStatus = (status) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: status,
  };
};

export const setUserProfile = (userProfile) => {
  return {
    type: 'SET_USER_PROFILE',
    payload: userProfile,
  };
};

export const setAvailableRoom = (roomList) => {
  return {
    type: 'SET_AVAILABLE_ROOM',
    payload: roomList,
  };
};

export const updateAvatar = (avatarURI) => {
  return {
    type: 'SET_AVATAR',
    payload: avatarURI,
  };
};

export const updateRoomAvatar = (roomID, imageURI) => {
  return {
    type: 'SET_ROOM_AVATAR',
    payload: {
      roomID,
      imageURI,
    },
  };
};

export const updateNewRoom = (room) => {
  return {
    type: 'UPDATE_AVAILABLE_ROOM',
    payload: room,
  };
};

export const removeRoom = (roomID) => {
  return {
    type: 'REMOVE_ROOM',
    payload: roomID,
  };
};

export const clearUserData = () => {
  return {
    type: 'CLEAR_USER_DATA',
  };
};
