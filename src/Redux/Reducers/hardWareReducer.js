const initialState = {
  BLEnabled: false,
  WFEnabled: false,
  BLController: false,
};

const hadwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET BLUETOOTH CONNECTION': {
      return {...state, BLEnabled: action.payload};
    }

    case 'SET INTERNET CONNECTION': {
      return {...state, WFEnabled: action.payload};
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
