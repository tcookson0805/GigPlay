import axios from 'axios'
import Spotify from 'spotify-web-api-js';
const _ = require('underscore');
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

export const FETCH_TRACKS = 'FETCH_TRACKS';

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

export function getMyTracks(offset) {
  return dispatch => {
    
    spotifyApi.getMySavedTracks({'limit': 50}).then( tracks => {

      const totalTracks  = tracks.total;
      const trackCalls  = Math.ceil(tracks.total / 50);
      const artistsArray = [];
      const artistsObj = {}
      
      tracks.items.forEach(function(item, index) {
        let artistName = item.track.artists[0].name;
        artistsArray.push(artistName);
        
        if(artistsObj[artistName]){
          artistsObj[artistName].songs = artistsObj[artistName].songs + 1
        } else {
          artistsObj[artistName] = {
            'songs': 1,
            'ticketmaster_id': null
          }
        }
      })
      
      return { tracks, totalTracks, trackCalls, artistsArray, artistsObj};
    }).then( data => {
      
      let { tracks, totalTracks, trackCalls, artistsArray, artistsObj } = data
      const allTracks = tracks.items
      let arrayHold = [];
      let objHold = {}
      
      for(var i = 1; i < trackCalls; i++) {
        spotifyApi.getMySavedTracks({'limit': 50, 'offset': i*50}).then( info => {
          info.items.forEach(function(item, index) {
            let artistName = item.track.artists[0].name;
            allTracks.push(item)
            artistsArray.push(artistName);
            
            if(artistsObj[artistName]){
              artistsObj[artistName].songs = artistsObj[artistName].songs + 1
            } else {
              artistsObj[artistName] = {
                'songs': 1,
                'ticketmaster_id': null
              }
            }
            
          })
          return { artistsArray, artistsObj, allTracks }
        }).then ( obj => {
          const tracks = obj.allTracks    
          const artistsArray = _.uniq(obj.artistsArray)
          let payload = {artistsArray, artistsObj, totalTracks, trackCalls, tracks}
          dispatch({'type': FETCH_TRACKS, 'data': payload})
        })
      }
    })
  };
}

export const FETCH_CONCERTS = 'FETCH_CONCERTS';

const TICKETMASTER_ROOT = 'https://app.ticketmaster.com/discovery/v2/'
const TICKETMASTER_KEY = 'p4iiDkyq3OFMKaCcAZoK5RGnoOGbExwd';
const TICKETMASTER_SECRET = 'eZN3erRaBDLnWBH3';

// const TICKETMASTER_REQUEST = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=p4iiDkyq3OFMKaCcAZoK5RGnoOGbExwd'

export function getConcerts(keyword) {
  return dispatch => {
    
    
    
    
    const url = `${TICKETMASTER_ROOT}events.json?keyword=${keyword}&apikey=${TICKETMASTER_KEY}`
  // const request = axios.get(url).then(function(response) { console.log(response)})
  
  // console.log('Request:', request);
  
  // dispatch({
  //   type: FETCH_CONCERTS,
  //   data: request
  // })
  
    axios.get(url).then( response => {
      console.log('data', data)
      const data = response.data._embedded.events
      dispatch({
        type: FETCH_CONCERTS,
        data: data
      })
      
    })
  
  
  }

}


