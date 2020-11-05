import {combineReducers} from 'redux';

import hardwareReducer from './hardWareReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  hardware: hardwareReducer,
  user: userReducer,
  modal: modalReducer,
});

export default rootReducer;
