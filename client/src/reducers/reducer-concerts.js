import {
  FETCH_CONCERTS
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
      data: action.data.payload,
      concertsList: action.data.concertsList
    });

  default:
    return state;
  }
}

export default concertsReducer;