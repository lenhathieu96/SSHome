const initialState = {
  BLConnection: false,
  WFConnection: false,
  BLController: true,
};

const hadwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET BLUETOOTH CONNECTION': {
      return {...state, BLConnection: action.payload};
    }

    case 'SET INTERNET CONNECTION': {
      return {...state, WFConnection: action.payload};
    }

    case 'SET CONTROLLER': {
      return {...state, BLController: !state.BLController};
    }

    default: {
      return state;
    }
  }
};

export default hadwareReducer;
