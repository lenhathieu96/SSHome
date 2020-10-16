const initialState = {
  isLogin: false,
  homeID: '',
  userID: '',
  name: '',
  phone: '',
  email: ''
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET LOGIN STATUS':
      return {...state, isLogin: action.payload}; 

    // case 'SET USER PROFILE':
    //   let user = {...state};

    //   return {...state, };
    

    default:
      return state;
  }
};

export default UserReducer;
