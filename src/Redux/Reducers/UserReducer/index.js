const initialState = {
  isMaster: false,
  isLogin: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET LOGIN STATUS':
      let tempState = {...state};
      tempState.isLogin = action.payload;
      state = tempState;
      return state;

    case 'SET USER ROLE':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default UserReducer;
