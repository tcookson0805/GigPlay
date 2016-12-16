import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import firebaseReducer from './reducer-firebase'
import authReducer from './reducer-auth';
import concertsReducer from './reducer-concerts';
import tracksReducer from './reducer-tracks'

const rootReducer = combineReducers({
  auth: authReducer,
  tracks: tracksReducer,
  concerts: concertsReducer,
  firebase: firebaseReducer,
  routing: routerReducer
});

export default rootReducer;