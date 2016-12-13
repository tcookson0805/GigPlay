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
      const artistsObj = {};
      
      tracks.items.forEach(function(item, index) {
        tracksLoaded++
        
        let artistName = item.track.artists[0].name.replace('.','').replace('$','').replace('#','').replace('[','').replace(']','');            
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
            
            let artistName = item.track.artists[0].name.replace('.','').replace('$','').replace('#','').replace('[','').replace(']',''); 
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
    
          const tracks = obj.allTracks    
          const artistsArray = _.uniq(obj.artistsArray);
         
          let payload = {artistsArray, artistsObj, totalTracks, trackCalls, tracks, tracksLoaded}
          dispatch({'type': FETCH_TRACKS, 'data': payload})
        })
      }
    })
  };
}

export const FETCH_CONCERTS = 'FETCH_CONCERTS';

import { TICKETMASTER_ROOT, TICKETMASTER_KEY, TICKETMASTER_SECRET, TICKETMASTER_REQUEST } from '../../../config/ticketmaster';

export function getConcerts(artistsArray) {
  
  return dispatch => {
    
    let artistsObjTM = {}
    let concertsList = [];
    let concertsDisplayList = {
      totalList: [],
      filteredList: []
    };
    let artistsIdArray = [];
    let artistsDone = 0;
    const artistsNum = artistsArray.length
    // console.log('action ---- artistsArray', artistsArray)
    // console.log('action ---- artistsNum', artistsNum)
    for(var i = 0; i < artistsNum; i++) {
      let artistName = artistsArray[i];
      artistsObjTM[artistName] = {
        ticketmaster_id: null,
        ticketmaster_images: null,
        ticketmaster_url: null,
        ticketmaster_classifications: null,
        eventsArray: []
      }
      
      const attractionsUrl = `${TICKETMASTER_ROOT}attractions.json?keyword=${artistName}&apikey=${TICKETMASTER_KEY}`
      
      axios.get(attractionsUrl).then( response => {

        if(response.data._embedded){
          let attractions = response.data._embedded.attractions
          
          // console.log('actions ----- attractions.length', attractions.length)
          
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
        
        if(artistsDone === artistsNum) {
          // console.log('heyheyhey')
          // console.log('artistsIdArray', artistsIdArray)
          let page = 1
          const artistsIdString = artistsIdArray.toString()
          
          // console.log('artistsIdString', artistsIdString)
          const eventUrl = `${TICKETMASTER_ROOT}events.json?attractionId=${artistsIdString}&apikey=${TICKETMASTER_KEY}&size=500`
          const eventUrl2 = `${TICKETMASTER_ROOT}events.json?attractionId=${artistsIdString}&apikey=${TICKETMASTER_KEY}&size=500&page=1`          

          axios.get(eventUrl).then( evts => {
            
            
            evts.data._embedded.events.forEach(function(item, index) {        
                concertsList.push(item)
                
                const attractions = item._embedded.attractions
                let artist
                let city = item._embedded.venues[0].city ? item._embedded.venues[0].city.name : '';
                let state = item._embedded.venues[0].state ? item._embedded.venues[0].state.name : '';
                let date = item.dates.start.localDate;
                let lat = item._embedded.venues[0].location ? item._embedded.venues[0].location.latitude : undefined;
                let long = item._embedded.venues[0].location ? item._embedded.venues[0].location.longitude : undefined;
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
                
                if(!duplicate){
                  concertsDisplayList['totalList'].push({artist, city, state, date, lat, long, time, venue, event, url, display})
                }
                
            })
            
            _.sortBy(concertsDisplayList['totalList'], 'date');

            const payload = { concertsList, artistsObjTM, artistsIdArray, artistsIdString, concertsDisplayList }
            console.log('concertsDisplayList', concertsDisplayList);
            console.log('concertsList', concertsList)
            console.log('artistsObjTM', artistsObjTM)
            console.log('artistsIdArray', artistsIdArray);
            console.log('artistsIdString', artistsIdString);
            console.log('events', evts);
            console.log('payload', payload);
            
            dispatch({'type': FETCH_CONCERTS, data: payload});  
            
          })
        }
      }) 
    }
  }
}

export const FETCH_CONCERTS_FIREBASE = 'FETCH_CONCERTS_FIREBASE'

export function getConcertsFirebase(context, endpoint){
  
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    }).then(data => {
      console.log('DATA', data)
      const payload = {
        artistsArray: data.artistsArray,
        concertsDisplayList: data.concertsDisplayList
      }
      dispatch({'type': FETCH_CONCERTS_FIREBASE, data: payload});
    })
    
  }
}

export const UPDATE_CONCERTS_FIREBASE = 'UPDATE_CONCERTS_FIREBASE'


export function updateConcertsDisplayList( endpoint, context, artistName, selected) {
  
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    }).then(data => {
      
      if(!data.concertsDisplayList.filteredList){
        data.concertsDisplayList['filteredList'] = []
      }
      return data
    }).then(data => {
      let payload = data
      
      const remove = selected;
      console.log('remove', remove)
      
      if(!remove){
        let hold = payload.concertsDisplayList.filteredList
        payload.concertsDisplayList.totalList.forEach(function(item, index) {
          if(item.artist === artistName){
            hold.push(item);
          }
        })
        payload.concertsDisplayList.filteredList = hold;
        return payload;
      } else {
        const hold = _.filter(payload.concertsDisplayList.filteredList, function(item){ return item.artist !== artistName })
        payload.concertsDisplayList.filteredList = hold;
        return payload;
      }
    
    }).then( data => {
      // putting filteredList in chronological order  
      let payload = data
      let hold = _.sortBy(payload.concertsDisplayList.filteredList, 'date');
      payload.concertsDisplayList.filteredList = hold
      return payload
      
    }).then( data => {
      let payload = data
      base.post(endpoint, {
        data: {
          artistsArray: data.artistsArray,
          concertsDisplayList: data.concertsDisplayList
        }
      })
      dispatch({'type': UPDATE_CONCERTS_FIREBASE, data: payload});
    })
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

