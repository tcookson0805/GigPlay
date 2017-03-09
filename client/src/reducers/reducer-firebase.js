import { FETCH_CONCERTS_FIREBASE, UPDATE_CONCERTS_FIREBASE, FETCH_USER_INFO_FIREBASE, FETCH_ARTISTS_ARRAY_FIREBASE, ADD_TO_FILTERED_FIREBASE, REMOVE_FROM_FILTERED_FIREBASE, RESET_CONCERTS_DISPLAY_LIST_FIREBASE } from '../actions/firebase-actions';

const initialState = {};

function concertsReducer (state = initialState, action) {
  
  switch (action.type) {
  
    case FETCH_CONCERTS_FIREBASE:
      return Object.assign({}, state, {
        concertsDisplayListFirebase: action.data.concertsDisplayList
      });
    
    case UPDATE_CONCERTS_FIREBASE:
      return Object.assign({}, state, {
        concertsDisplayListFirebase: action.data.concertsDisplayList,
      });
    
    case FETCH_USER_INFO_FIREBASE:
      return Object.assign({}, state, {
        userInfoFirebase: action.data.userInfo
      });
      
    case FETCH_ARTISTS_ARRAY_FIREBASE:
      return Object.assign({}, state, {
        artistsArrayFirebase: action.data.artistsArray
      });
    
    case ADD_TO_FILTERED_FIREBASE:
      return Object.assign({}, state, {
        concertsDisplayListFirebase: action.data.concertsDisplayList,
      });

    case REMOVE_FROM_FILTERED_FIREBASE:
      return Object.assign({}, state, {
        concertsDisplayListFirebase: action.data.concertsDisplayList,
      });
    
    case RESET_CONCERTS_DISPLAY_LIST_FIREBASE:
      return Object.assign({}, state, {
        concertsDisplayListFirebase: action.data.concertsDisplayList,
      });
      
    default:
      return state;
  }
  
}

export default concertsReducer;