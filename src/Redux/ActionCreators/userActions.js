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
