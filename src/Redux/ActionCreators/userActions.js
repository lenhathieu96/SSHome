export const setLoginStatus = (status) => {
  return {
    type: 'SET LOGIN STATUS',
    payload: status,
  };
};

export const setUserRole = (isMaster) => {
  return {
    type: 'SET USER ROLE',
    payload: isMaster,
  };
};

export const setUserID = (userID) => {
  return {
    type: 'SET USER ID',
    payload: userID,
  };
};

