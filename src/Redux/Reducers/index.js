import {combineReducers} from 'redux';
import hardwareReducer from './HardwareReducer';

const rootReducer = combineReducers({
  hardware: hardwareReducer,
});

export default rootReducer;
