import {
  FETCH_CONCERTS, FETCH_CONCERTS_FIREBASE, UPDATE_CONCERTS_FIREBASE, REMOVE_FILTERED_CONCERTS_FIREBASE
} from '../actions/actions';

/** The initial state; no tokens and no user info */
const initialState = {

};

/**
 * Our reducer
 */
function concertsReducer (state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case FETCH_CONCERTS:
    console.log('heeeeeeyyyy')
    console.log('action.data', action.data)
    return Object.assign({}, state, {
      concertsList: action.data.concertsList,
      concertsDisplayList: action.data.concertsDisplayList,
      artistsObjTM: action.data.artistsObjTM,
      artistsIdArray: action.data.artistsIdArray,
      artistsIdString: action.data.artistsIdString,
      saveToFirebase: true
    });
    
  case FETCH_CONCERTS_FIREBASE:
    console.log('action.data', action.data)
    return Object.assign({}, state, {
      artistsArray: action.data.artistsArray,
      concertsDisplayList: action.data.concertsDisplayList,
    });
  
  case UPDATE_CONCERTS_FIREBASE:
    console.log('update concerts firebase data', action.data)
    return Object.assign({}, state, {
      artistsArray: action.data.artistsArray,
      concertsDisplayList: action.data.concertsDisplayList,
    });
  
  default:
    return state;
  }
}

export default concertsReducer;