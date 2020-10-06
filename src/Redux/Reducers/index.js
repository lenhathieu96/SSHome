import {combineReducers} from 'redux';
import hardwareReducer from './HardwareReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
  hardware: hardwareReducer,
  user: userReducer,
});

export default rootReducer;
