const initialState = {
  WFEnabled: false,
};

const hadwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET INTERNET CONNECTION': {
      return {...state, WFEnabled: action.payload};
    }
    default: {
      return state;
    }
  }
};

export default hadwareReducer;
