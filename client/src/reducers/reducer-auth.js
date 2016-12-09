import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE, FETCH_TRACKS
} from '../actions/actions';

/** The initial state; no tokens and no user info */
const initialState = {
  totalTracks: 0,
  trackCalls: 0,
  artistsArray: [],
  artistsIdArray: [],
  artistsObj: {},
  loading: false,
  tracksLoaded: false,
  tracks: {
    trackLoading: false,
    href: null,
    items: [],
    limit: null,
    next: null,
    offset: null,
    previous: null,
    total: 0
  },
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  }
};

/**
 * Our reducer
 */
function authReducer (state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action.payload;
    return Object.assign({}, state, {accessToken, refreshToken})

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, {loading: true})
    });

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, action.data, {loading: false})
    });

  // currently no failure state :(
  case SPOTIFY_ME_FAILURE:
    return state;
    
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

export default authReducer;