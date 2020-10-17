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
