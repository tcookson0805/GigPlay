import axios from 'axios'
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

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
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

const FETCH_TRACKS = 'FETCH_TRACKS';

export function getMyTracks() {

  return dispatch => {
    dispatch({ type: FETCH_TRACKS});
    spotifyApi.getMySavedTracks()
      .then( (data) => {
        console.log('data', data)
      })
  }
}

// const FETCH_ARTISTS = 'FETCH_ARTISTS';

// export function getMyArtists() {
//   return dispatch => {
//     dispatch({ type: FETCH_ARTISTS });
//     spotifyApi.isFollowingArtists()
//       .then( (data) => {
//         console.log('artists', data)
//       })
//   }
// }

const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS';

export function getMyPlaylists() {
  return dispatch => {
    dispatch({ type: FETCH_PLAYLISTS });
    spotifyApi.getUserPlaylists()
      .then( (data) => {
        console.log('playlists', data)
      })
  }
}

const FETCH_PLAYLIST_TRACKS = 'FETCH_PLAYLIST_TRACKS';

export function getPlaylistTracks() {
  return dispatch => {
    dispatch({ type: FETCH_PLAYLIST_TRACKS });
    spotifyApi.getPlaylistTracks('tcookson0805', '0w7glpzRjxZ7liQgumxhFv')
      .then( (data) => {
        console.log('playlist tracks', data)
      })
  }
}
