const initialState = {
  isLogin: false,
  name: '',
  phone: '',
  email: '',
  avatar: '',
  availableRooms: [],
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
        availableRooms: action.payload.availableRooms,
      };

    case 'SET AVAILABLE ROOM':
      return {...state, availableRooms: action.payload};

    case 'SET AVATAR':
      return {...state, avatar: action.payload};

    case 'UPDATE_AVAILABLE_ROOM':
      let rooms = [...state.availableRooms];
      rooms.push(action.payload);
      return {...state, availableRooms: rooms};

    case 'SET ROOM AVATAR':
      let availableRooms = [...state.availableRooms];
      let index = availableRooms.findIndex(
        (room) => room.id === action.payload.roomID,
      );
      if (index >= 0) {
        availableRooms[index].background = action.payload.imageURI;
        return {...state, availableRooms};
      } else {
        return {...state};
      }

    default:
      return state;
  }
};

export default UserReducer;
