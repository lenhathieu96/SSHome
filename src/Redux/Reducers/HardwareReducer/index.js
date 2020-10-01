const initialState = {
  BLConnection: false,
  WFConnection: false,
};

const hadwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET BLUETOOTH CONNECTION': {
      let tempState = {...state};
      tempState.BLConnection = action.payload;
      state = tempState;
      return state;
    }

    case 'SET INTERNET CONNECTION': {
      let tempState = {...state};
      tempState.WFConnection = action.payload;
      state = tempState;
      return state;
    }
    default: {
      return state;
    }
  }
};

export default hadwareReducer;
