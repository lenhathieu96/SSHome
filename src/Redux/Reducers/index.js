import {combineReducers} from 'redux';

import hardwareReducer from './hardWareReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  hardware: hardwareReducer,
  user: userReducer,
});

export default rootReducer;
