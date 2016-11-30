import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import authReducer from './reducer-auth';
// import concertReducer from './reducer-concerts';

const rootReducer = combineReducers({
  auth: authReducer,
  routing: routerReducer
});

export default rootReducer;