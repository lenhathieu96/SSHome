export const setBLEnabled = (isConnect) => {
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

export const setController = () => {
  return {
    type: 'SET CONTROLLER',
  };
};
