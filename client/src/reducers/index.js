import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import authReducer from './reducer-auth';
import concertsReducer from './reducer-concerts';

const rootReducer = combineReducers({
  auth: authReducer,
  concerts: concertsReducer,
  routing: routerReducer
});

export default rootReducer;