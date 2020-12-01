const initialState = {
  isLogin: false,
  id: '',
  name: '',
  phone: '',
  email: '',
  avatar: '',
  availableRooms: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATUS':
      return {...state, isLogin: action.payload};

    case 'SET_USER_PROFILE':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        phone: action.payload.phone.slice(3),
        email: action.payload.email,
        avatar: action.payload.avatar,
      };

    case 'SET_AVAILABLE_ROOM':
      return {...state, availableRooms: action.payload};

    case 'SET_AVATAR':
      return {...state, avatar: action.payload};

    case 'UPDATE_AVAILABLE_ROOM':
      let rooms = [...state.availableRooms];
      rooms.push(action.payload);
      return {...state, availableRooms: rooms};

    case 'REMOVE_ROOM':
      let currentRoomList = [...state.availableRooms];
      let newRoomList = currentRoomList.filter(
        (room) => room.id !== action.payload,
      );
      return {...state, availableRooms: newRoomList};

    case 'SET_ROOM_AVATAR':
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

    case 'CLEAR_USER_DATA':
      return {...initialState};

    default:
      return state;
  }
};

export default UserReducer;
