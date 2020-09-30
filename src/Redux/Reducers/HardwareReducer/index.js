const initialState = {
  bluConnection: false,
  internetConnection: false,
};

const hadwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET BLUETOOTH CONNECTION': {
      state.bluConnection = action.payload.typeConnection;
      return state.bluConnection;
    }

    case 'GET BLUETOOTH CONNECTION': {
      return state.bluConnection;
    }
    default:
      return state;
  }
};

export default hadwareReducer;
