import axios from 'axios'
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const FETCH_TRACKS_BEGIN = 'FETCH_TRACKS_BEGIN';
export const FETCH_TRACKS = 'FETCH_TRACKS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE'


/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  console.log('set Tokens ran')
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { 
    type: SPOTIFY_TOKENS,
    payload: { accessToken, refreshToken }
  }
}

/* get the user's info from the /me api */
export function getMyInfo() { 
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      console.log('infoDATA', data)
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}


export function getMyTracks(num) {
  return dispatch => {
    dispatch({ type: FETCH_TRACKS_BEGIN});
    spotifyApi.getMySavedTracks({'limit': 50, 'offset': num}).then( data => {
        console.log('tracksDATA', data)
        dispatch({ type: FETCH_TRACKS, data: data})
      }).catch(e => {
        dispatch({ type: FETCH_TRACKS_FAILURE, error: e});
      });
  };
}

// export function getMyTracks() {
//   return spotifyApi.getMySavedTracks().then( tracks => {
//     return {
//       type: FETCH_TRACKS,
//       data: data
//     }
//   })
// }


