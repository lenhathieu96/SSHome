const initialState = {
  isMaster: false,
  isLogin: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET LOGIN STATUS':
      let login = {...state};
      login.isLogin = action.payload;
      state = login;
      return state;

    case 'SET USER ROLE':
      let role = {...state};
      role.isMaster = action.payload;
      state = role;
      return state;

    default:
      return state;
  }
};

export default UserReducer;
