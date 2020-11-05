const initialState = {
  isVisible: false,
  text: '',
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {...state, isVisible: true};
    case 'HIDE_MODAL':
      let temp = {...state};
      temp.isVisible = true;
      temp.text = '';
      state = temp;
      return state;
    default:
      return state;
  }
};

export default modalReducer;
