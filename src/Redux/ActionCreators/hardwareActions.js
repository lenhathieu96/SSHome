export const setInternetConnection = (isConnect) => {
  return {
    type: 'SET INTERNET CONNECTION',
    payload: isConnect,
  };
};
