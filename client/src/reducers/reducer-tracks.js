import { FETCH_TRACKS } from '../actions/actions';

const initialState = {
};

function tracksReducer (state = initialState, action) {
  switch (action.type) {
    
  case FETCH_TRACKS:
    return Object.assign({}, state, {
      tracks: Object.assign({}, state.tracks, action.data.tracks),
      totalTracks: action.data.totalTracks,
      trackCalls: action.data.trackCalls,
      artistsArray: action.data.artistsArray,
      artistsObj: Object.assign({}, state.artistsObj, action.data.artistsObj),
      tracksLoaded: action.data.tracksLoaded
    });
  
  default:
    return state;
  }
}

export default tracksReducer;