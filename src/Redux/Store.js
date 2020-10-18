import {createStore, applyMiddleware} from 'redux';
import rootReducer from './Reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  composeWithDevTools(),
);

export default store;
