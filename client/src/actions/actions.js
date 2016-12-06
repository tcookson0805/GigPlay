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
    
    let tracksLoaded = 0;
        
    spotifyApi.getMySavedTracks({'limit': 50}).then( tracks => {

      const totalTracks  = tracks.total;
      const trackCalls  = Math.ceil(tracks.total / 50);
      const artistsArray = [];
      const artistsObj = {}

      
      tracks.items.forEach(function(item, index) {
        tracksLoaded++
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
      
      return { tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded};
    }).then( data => {
      
      let { tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = data
      const allTracks = tracks.items
      let arrayHold = [];
      let objHold = {}
      
      for(var i = 1; i < trackCalls; i++) {
        spotifyApi.getMySavedTracks({'limit': 50, 'offset': i*50}).then( info => {
          info.items.forEach(function(item, index) {
            tracksLoaded++
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
          return { artistsArray, artistsObj, allTracks, tracksLoaded }
        }).then ( obj => {
          // console.log('tracksLoaded', tracksLoaded);
          // console.log('totalTracks', totalTracks);
          const tracks = obj.allTracks    
          const artistsArray = _.uniq(obj.artistsArray)          
          let payload = {artistsArray, artistsObj, totalTracks, trackCalls, tracks, tracksLoaded}
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

export function getConcerts(artistsArray) {

  return dispatch => {
    
    // setting up payload to return
    let payload = {}
    let concertsList = []
    let artistsDone = 0;
    const artistsNum = artistsArray.length

    for(var i = 0; i < artistsNum; i++) {      
      let artistName = artistsArray[i]
      payload[artistName] = {
          ticketmaster_id: null,
          ticketmaster_images: null,
          ticketmaster_url: null,
          ticketmaster_classifications: null,
          eventsArray: []
        }
      // console.log(artistName)
      const attractionsUrl = `${TICKETMASTER_ROOT}attractions.json?keyword=${artistName}&apikey=${TICKETMASTER_KEY}`
      
      axios.get(attractionsUrl).then( response => {
        // console.log('response.data', response.data)
        if(response.data._embedded){
          let attractions = response.data._embedded.attractions
          
          attractions.forEach(function(item, index) {
            if(item.name === artistName && item.url){
              // console.log('data', response.data._embedded.attractions)
              // console.log('attractionsIndex', index)
              payload[artistName].ticketmaster_id = response.data._embedded.attractions[index].id;
              payload[artistName].ticketmaster_images = response.data._embedded.attractions[index].images;
              payload[artistName].ticketmaster_url = response.data._embedded.attractions[index].url;
              payload[artistName].ticketmaster_classifications = response.data._embedded.attractions[index].classifications; 
            }
          })
        }
        
        return
      })
      .then( data => {
        // console.log('payload', payload)
        // console.log(artistsDone);
        const id = payload[artistName].ticketmaster_id
        const eventUrl = `${TICKETMASTER_ROOT}events.json?attractionId=${id}&apikey=${TICKETMASTER_KEY}`
        
        if(id !== null){
          axios.get(eventUrl).then( events => {
            artistsDone++
            // console.log('events', events)
            if(events.data._embedded){
              const eventsArr = events.data._embedded.events
              payload[artistName].eventsArray = eventsArr
              eventsArr.forEach(function(item, index){
                if(item._embedded && item._embedded.venues[0].state){
                  concertsList.push({
                    artist: artistName,
                    event: item.name,
                    venue: item._embedded.venues[0].name,
                    city: item._embedded.venues[0].city.name,
                    state: item._embedded.venues[0].state.name,
                    lat: item._embedded.venues[0].location.latitude,
                    long: item._embedded.venues[0].location.longitude,
                    date: item.dates.start.localDate,
                    time: item.dates.start.localTime,
                  })  
                }
              })
            }

            if(artistsDone === artistsNum){
              let data = { 
                'payload': payload,
                'concertsList': concertsList 
              }
              // console.log('data', data);
              // console.log('payload', payload);
              // console.log('FINISHED!!!!')
              dispatch({'type': FETCH_CONCERTS, data: data});          
            }
          })
        } else {
          artistsDone++
        }
      })
    }
  }
}

const MAP_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?'
const MAP_API_KEY = 'AIzaSyDOW-uZgD8XhxaRqeVfQB_c62UCthL3PGU'

export const FETCH_CITY = 'FETCH_CITY'

export function fetchCity(city) {

  const request = axios.get(`${MAP_ROOT_URL}address=${city}&key=${MAP_API_KEY}`)
    
  return {
    type: FETCH_CITY,
    payload: request
  }
  
}

