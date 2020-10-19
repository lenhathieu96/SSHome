const initialState = {
  isLogin: false,
  name: '',
  phone: '',
  email: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET LOGIN STATUS':
      return {...state, isLogin: action.payload};

    case 'SET USER PROFILE':
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone.slice(3),
        email: action.payload.email,
      };

    default:
      return state;
  }
};

export default UserReducer;
