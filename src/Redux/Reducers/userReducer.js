const initialState = {
  isLogin: false,
  name: '',
  phone: '',
  email: '',
  avatar: '',
  availableRoom: [],
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
        avatar: action.payload.avatar,
        availableRoom: action.payload.availableRoom,
      };

    case 'SET AVAILABLE ROOM':
      return {...state, availableRoom: action.payload};

    case 'SET AVATAR':
      return {...state, avatar: action.payload};

    default:
      return state;
  }
};

export default UserReducer;
