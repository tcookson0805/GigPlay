import {
  FETCH_CONCERTS
} from '../actions/actions';

/** The initial state; no tokens and no user info */
const initialState = {
  concerts: {}
};

/**
 * Our reducer
 */
function concertsReducer (state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case FETCH_CONCERTS:
    console.log('concert data', action.data);
    return Object.assign({}, state.concerts, action.data);

  default:
    return state;
  }
}

export default concertsReducer;