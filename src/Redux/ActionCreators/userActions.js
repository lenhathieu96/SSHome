export const setLoginStatus = (status) => {
  return {
    type: 'SET LOGIN STATUS',
    payload: status,
  };
};

export const setUserProfile = (userProfile) => {
  return {
    type: 'SET USER PROFILE',
    payload: userProfile,
  };
};

export const setAvailableRoom = (roomList) => {
  return {
    type: 'SET AVAILABLE ROOM',
    payload: roomList,
  };
};

export const updateAvatar = (avatarURI) => {
  return {
    type: 'SET AVATAR',
    payload: avatarURI,
  };
};
