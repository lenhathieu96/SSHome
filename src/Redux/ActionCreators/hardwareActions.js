export const getBlueToothConnection = () => {
  return {
    type: 'GET BLUETOOTH CONNECTION',
  };
};

export const setBlueToothConnection = (isConnect) => {
  return {
    type: 'SET BLUETOOTH CONNECTION',
    payload: isConnect,
  };
};
