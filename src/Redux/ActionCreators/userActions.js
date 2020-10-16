export const setLoginStatus = (status) => {
  return {
    type: 'SET LOGIN STATUS',
    payload: status,
  };
};

export const setUserID = (userProfile, homeID) => {
  return {
    type: 'SET USER PROFILE',
    payload: userID,
  };
};

