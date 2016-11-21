import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import authReducer from './reducer-auth';

const rootReducer = combineReducers({
  auth: authReducer,
  routing: routerReducer
});

export default rootReducer;