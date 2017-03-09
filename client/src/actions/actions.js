import axios from 'axios'
import Spotify from 'spotify-web-api-js';
import base from '../../../config/firebase';

const _ = require('underscore');
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const FETCH_TRACKS = 'FETCH_TRACKS';


// setting the app's access and refresh tokens 
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

// getting the user's info from the /me api
export function getMyInfo() { 
  return dispatch => {
    // console.log('getMyInfo running')
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      // console.log('getMyInfo data', data)
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}


export function getMyTracks(offset) {
  return dispatch => {
    
    // console.log('getMyTracks running')
    let tracksLoaded = 0;
        
    spotifyApi.getMySavedTracks({'limit': 50}).then( tracks => {
      // console.log('getMySavedTracks first call', tracks);
      const totalTracks  = tracks.total;
      const trackCalls  = Math.ceil(tracks.total / 50);
      const artistsArray = [];
      const artistsObj = {};
      
      tracks.items.forEach(function(item, index) {
        tracksLoaded++
        // console.log(item.track.artists[0].name)
        
        let artistNameFirst = item.track.artists[0].name.replace('.','').replace('$','').replace('#','').replace('[','').replace(']','');            
        let artistName = artistNameFirst.replace('.','').replace('$','').replace('#','').replace('[','').replace(']','');
        
        // console.log(artistName)
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
      
    })
    
    .then( data => {     
      // console.log('getMySavedTracks first call return', data)
        
      let { tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = data
      const allTracks = tracks.items
      let arrayHold = [];
      let objHold = {}

      for(var i = 1; i <= trackCalls; i++) {
        spotifyApi.getMySavedTracks({'limit': 50, 'offset': i*50}).then( info => {
          info.items.forEach(function(item, index) {
            tracksLoaded++
            
            let artistNameFirst = item.track.artists[0].name.replace('.','').replace('$','').replace('#','').replace('[','').replace(']',''); 
            let artistName = artistNameFirst.replace('.','').replace('$','').replace('#','').replace('[','').replace(']','');

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
          
        })
        .then ( obj => {        
          // console.log('getMySavedTracks last call return', obj);         
          const tracks = obj.allTracks    
          const artistsArrayUniq = _.uniq(obj.artistsArray);
          // console.log('artistsArrayUniq',artistsArrayUniq)
          const artistsArray = _.sortBy(artistsArrayUniq)
          artistsArray.unshift('ALL ARTISTS')
          // console.log('artistsArray', artistsArray)
          let payload = {artistsArray, artistsObj, totalTracks, trackCalls, tracks, tracksLoaded}
          
          // console.log('getMySaved Tracks final payload', payload);
          if(payload.tracks.length === payload.totalTracks){
            dispatch({'type': FETCH_TRACKS, 'data': payload})            
          }
        })
      }
    })
  };
}

export const FETCH_CONCERTS = 'FETCH_CONCERTS';
import { TICKETMASTER_ROOT, TICKETMASTER_KEY, TICKETMASTER_SECRET, TICKETMASTER_REQUEST } from '../../../config/ticketmaster';

if(!TICKETMASTER_ROOT){
  const TICKETMASTER_ROOT = process.env.TICKETMASTER_ROOT; 
  const TICKETMASTER_KEY = process.env.TICKETMASTER_KEY;
  const TICKETMASTER_SECRET = process.env.TICKETMASTER_SECRET;
  const TICKETMASTER_REQUEST = process.env.TICKETMASTER_REQUEST;
}


export function getConcerts(artistsArray) {
  
  return dispatch => {
    
    console.log('getConcerts starting to run');

    // setting up info to be returned
    let artistsObjTM = {}
    let concertsList = [];
    let concertsDisplayList = {
      totalList: [],
      totalObj: {},
      filteredList: [],
      filteredObj: {}
    };
    let artistsIdArray = [];
    let artistsDone = 0;
    const artistsNum = artistsArray.length;

    // looping through each artist
    for(var i = 0; i < artistsNum; i++) {
      
      // creating key for each artist set to object that will contain their ticketmaster info in artistsObjTM
      let artistName = artistsArray[i];
      artistsObjTM[artistName] = {
        ticketmaster_id: null,
        ticketmaster_images: null,
        ticketmaster_url: null,
        ticketmaster_classifications: null,
        eventsArray: []
      }
      
      // adding key for each artist set to array that will include their events (if they have any) in 
      // the totalObj in our concertsDisplayList
      concertsDisplayList.totalObj[artistName] = [];
      
      // creating the proper url to make each ticketmaster request
      const attractionsUrl = `${TICKETMASTER_ROOT}attractions.json?keyword=${artistName}&apikey=${TICKETMASTER_KEY}`
      
      // making our ticketmaster request
      axios.get(attractionsUrl).then( response => {
        
        // making sure the response we get has a data._embedded property
        // which is where all relevant attractions info will be contained 
        if(response.data._embedded){
          let attractions = response.data._embedded.attractions          
          attractions.forEach(function(item, index) {

            // KEY CHECK POINT
            // The attractions we receive is an array that includes attractions that don't always exactly match the name
            // of the artist and sometimes, even when they do, they are duplicates. When we have duplicates, it appears that
            // only one of them actually has a link to the artist's page on ticketmaster. Therefore the 'test' I created 
            // requires not only that the item's name exactly match the artist's name, but also that the item has a link
            // to an artist's page on ticketmaster. This has resulted, atleast for my spotify, only 117 of my 137 artists
            // meeting this test. I am not sure what is happening with the other 20, but due to ticketmaster's quota I will
            // come back later and see what is going on.
            
            if(item.name === artistName && item.url){
              artistsIdArray.push(response.data._embedded.attractions[index].id)
              artistsObjTM[artistName].ticketmaster_id = response.data._embedded.attractions[index].id;
              artistsObjTM[artistName].ticketmaster_images = response.data._embedded.attractions[index].images || [];
              artistsObjTM[artistName].ticketmaster_url = response.data._embedded.attractions[index].url || [];
              artistsObjTM[artistName].ticketmaster_classifications = response.data._embedded.attractions[index].classifications || []; 
            }
          })
        }
        artistsDone++
        return
      })
      .then( data => {
        
        // console.log('getConcerts first run', data);

        // Important step....by making sure that we have gotten all the artists information first before making
        // our request to ticketmaster, we can use that information to create an id string of all the artists and
        // send ONE batched call to ticketmaster to get all events. This means we only send one request for all artists
        // instead of one request for each artist.
        
        if(artistsDone === artistsNum) {
          const artistsIdString = artistsIdArray.toString()          
          const eventUrl = `${TICKETMASTER_ROOT}events.json?attractionId=${artistsIdString}&apikey=${TICKETMASTER_KEY}&size=500`
          const eventUrl2 = `${TICKETMASTER_ROOT}events.json?attractionId=${artistsIdString}&apikey=${TICKETMASTER_KEY}&size=500&page=1`          

          // Sending our request to ticketmaster
          axios.get(eventUrl).then( evts => {
            
            evts.data._embedded.events.forEach(function(item, index) {        
              const location = item._embedded.venues[0].location || {};
              // console.log('location', location)
              if(location.hasOwnProperty('latitude') && location.hasOwnProperty('longitude')) {

                concertsList.push(item)                
                const location = item._embedded.venues[0].location                
                const attractions = item._embedded.attractions
                let artist
                let city = item._embedded.venues[0].city ? item._embedded.venues[0].city.name : '';
                let state = item._embedded.venues[0].state ? item._embedded.venues[0].state.name : '';
                let date = item.dates.start.localDate;
                
                let lat = location.latitude ? location.latitude : null;
                let long = location.longitude ? location.longitude : null;
                let time = item.dates.start.localTime || 'tbd'
                let venue = item._embedded.venues[0].name ? item._embedded.venues[0].name : '';
                let event = item.name || '';
                let url = item.url;
                let display = true;
                
                //loop over item._embedded.attractions to grab correct artist name
                attractions.forEach(function(attraction, index) {
                  const name = attraction.name;
                  if(artistsObjTM[name]) {
                    artist = name;
                  }
                })
                
                // This is just to eliminate duplication of concerts since Ticketmaster sends back
                // a separate event for each different ticket package for the same concert
                let duplicate = false;
                concertsDisplayList['totalList'].forEach(function(concert, index) {
                  if(concert.artist === artist && concert.city === city && concert.date === date){
                    duplicate = true
                  }
                })
                console.log('artist', artist);
                if(!duplicate && artist){
                  concertsDisplayList['totalList'].push({artist, city, state, date, lat, long, time, venue, event, url, display});
                  concertsDisplayList['totalObj'][artist].push({artist, city, state, date, lat, long, time, venue, event, url, display});
                }  
            
              }
            
            })
            const sorted = _.sortBy(concertsDisplayList['totalList'], 'date');
            concertsDisplayList.totalList = sorted;
            concertsDisplayList.totalObj['ALL ARTISTS'] = sorted;
            const payload = { concertsList, artistsObjTM, artistsIdArray, artistsIdString, concertsDisplayList }
            console.log('getConcerts payload', payload);
            dispatch({'type': FETCH_CONCERTS, data: payload});  
          })
        }
      }) 
    }
  }
}


const MAP_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const MAP_API_KEY = 'AIzaSyDOW-uZgD8XhxaRqeVfQB_c62UCthL3PGU';

export const FETCH_CITY = 'FETCH_CITY';

export function fetchCity(city) {
  const request = axios.get(`${MAP_ROOT_URL}address=${city}&key=${MAP_API_KEY}`)
  return {
    type: FETCH_CITY,
    payload: request
  }
}

