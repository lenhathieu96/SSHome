export const setBLConnection = (isConnect) => {
  return {
    type: 'SET BLUETOOTH CONNECTION',
    payload: isConnect,
  };
};

export const setInternetConnection = (isConnect) => {
  return {
    type: 'SET INTERNET CONNECTION',
    payload: isConnect,
  };
};
