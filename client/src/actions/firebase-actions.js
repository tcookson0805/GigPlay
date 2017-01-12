import axios from 'axios'
import Spotify from 'spotify-web-api-js';
import base from '../../../config/firebase';
import Rebase from 're-base';

const FIREBASE_KEY = process.env.FIREBASE_KEY 
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN
const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID

if(!base) {
  const base = Rebase.createClass({
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
  });
}

const _ = require('underscore');
const spotifyApi = new Spotify();

export const FETCH_CONCERTS_FIREBASE = 'FETCH_CONCERTS_FIREBASE'
export const UPDATE_CONCERTS_FIREBASE = 'UPDATE_CONCERTS_FIREBASE'
export const FETCH_ARTISTS_ARRAY_FIREBASE = 'FETCH_ARTISTS_ARRAY_FIREBASE'
export const FETCH_USER_INFO_FIREBASE = 'FETCH_USER_INFO_FIREBASE'
export const RESET_CONCERTS_DISPLAY_LIST_FIREBASE = 'RESET_CONCERTS_DISPLAY_LIST_FIREBASE'

export function getConcertsFirebase(context, endpoint){  
  return dispatch => {

    console.log('getConcertsFirebase starting to run')

    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
    
      // console.log('getConcertsFirebase first run', data)
      let payload = data
      payload.concertsDisplayList.filteredList = [];
      payload.concertsDisplayList.filteredObj = {};
      return payload
    })
    .then( data => {
      // console.log('getConcertsFirebase second run', data)
      let payload = {
        concertsDisplayList: data.concertsDisplayList,
      }
      // console.log('getConcertsFirebase payload', payload)
      dispatch({'type': FETCH_CONCERTS_FIREBASE, data: payload});
    });
  }
}

export function getArtistsArrayFirebase(context, endpoint) {
  return dispatch => {
    // console.log('getArtistsArrayFirebase starting to run')
    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      // console.log('getArtistsArrayFirebase first run', data);
      let payload = {
        artistsArray: data.artistsArray
      }
      // console.log('getArtistsArrayFirebase payload', payload);
      dispatch({'type': FETCH_ARTISTS_ARRAY_FIREBASE, data: payload});
    })
  }
}

export function getUserInfoFirebase(context, endpoint) {
  return dispatch => {
    console.log('getUserInfoFirebase starting to run')
    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      // console.log('getUserInfoFirebase first run', data)
      let payload = {
        userInfo: data.userInfo
      }
      // console.log('getUserInfoFirebase payload', payload)
      dispatch({'type': FETCH_USER_INFO_FIREBASE, data: payload});
    })
  }
}


export function updateConcertsDisplayList(endpoint, context, artistName, selected) {
  return dispatch => {
    
    console.log('updateConcertsDisplayList starting to run')

    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      const x = data
      console.log('updateConcertsDisplayList data', x)
      let payload = data;
      
      if(!payload.concertsDisplayList.filteredList){
        payload.concertsDisplayList.filteredList = [];
      }      
      if(!payload.concertsDisplayList.filteredObj){
        payload.concertsDisplayList.filteredObj = {};
      }
      
      // console.log('payload', payload)
      return payload
      
    })
    .then(data => {
      let payload = data;
      // console.log('payload', payload)
      if(!payload.concertsDisplayList.filteredObj[artistName]){
        payload.concertsDisplayList.filteredObj[artistName] = payload.concertsDisplayList.totalObj[artistName]
        payload.concertsDisplayList.filteredList.push(payload.concertsDisplayList.totalObj[artistName])
        let hold = _.flatten(payload.concertsDisplayList.filteredList);
        let hold2 = _.sortBy(hold, 'date')
        payload.concertsDisplayList.filteredList = hold2
        return payload
      } else {
        return payload
      }
    })
    .then(data => {
      let payload = data
      // console.log('payload', payload)
      // console.log('selected', selected)
      if(selected){
        delete payload.concertsDisplayList.filteredObj[artistName];
        let hold3 = _.filter(payload.concertsDisplayList.filteredList, function(item){ return item.artist !== artistName })
        payload.concertsDisplayList.filteredList = hold3;
      }
      return payload
    })
    .then(data => {
      // console.log('data', data)
      let payload = data
      
      base.post(endpoint, {
        data: {
          artistsArray: payload.artistsArray,
          concertsDisplayList: payload.concertsDisplayList,
          userInfo: payload.userInfo
        }
      })
      dispatch({'type': UPDATE_CONCERTS_FIREBASE, data: payload});

    })
  }
}


export const ADD_TO_FILTERED_FIREBASE = 'ADD_TO_FILTERED_FIREBASE'

export function addToFilteredFirebase(endpoint, context, artistName){
  return dispatch => {
    
    console.log('addToFilteredFirebase is starting to run')

    base.fetch(endpoint, {
      context: context
    })
    .then( data => {
      console.log('data', data)
      if(!data.concertsDisplayList.filteredList){
        data.concertsDisplayList['filteredList'] = []
      }
      
      if(!data.concertsDisplayList.filteredObj){
        data.concertsDisplayList['filteredObj'] = {}
      }
      return data
    })
    .then( data => {
      console.log('data', data)
      let payload = data;
      let artistObj = payload.concertsDisplayList.totalObj[artistName]
      
      let holdArray = payload.concertsDisplayList.filteredList;
      holdArray.push(artistObj)
      
      let flattened = _.flatten(holdArray);
      let ordered = _.sortBy(flattened, 'date');

       payload.concertsDisplayList.filteredList = ordered;
       payload.concertsDisplayList.filteredObj[artistName] = artistObj;
       return payload
    })
    .then( data => {
      
      let payload = data;
        
      base.post(endpoint, {
        data: {
          concertsDisplayList: payload.concertsDisplayList
        }
      })
      dispatch({'type': ADD_TO_FILTERED_FIREBASE, data: payload});
    })
  }
}


export const REMOVE_FROM_FILTERED_FIREBASE = 'REMOVE_FROM_FILTERED_FIREBASE'

export function removeFromFilteredFirebase(endpoint, context, artistName) {
  return dispatch => {
    
    console.log('addToFilteredFirebase is starting to run')

    base.fetch(endpoint, {
      context: context
    })
    .then( data => {
      console.log('data', data)
      let payload = data;
      let list = payload.concertsDisplayList.filteredList;
      let hold = [];

      list.forEach(function(concert){
        console.log(concert.artist);
        if(concert.artist !== artistName){
          hold.push(concert);
        }
      })

      payload.concertsDisplayList.filteredList = hold;

      delete payload.concertsDisplayList.filteredObj[artistName];
      return payload
    })
    .then( data => {
      
      let payload = data;
        
      base.post(endpoint, {
        data: {
          concertsDisplayList: payload.concertsDisplayList
        }
      })
      dispatch({'type': ADD_TO_FILTERED_FIREBASE, data: payload});
    })
  }
}

export function resetConcertsDisplayList(endpoint, context){
  return dispatch => {

    console.log('resetConcertsDisplayList is starting to run')

    base.fetch(endpoint, {
      context: context
    }).then(data => {
      let payload = data
      payload.concertsDisplayList.filteredList = [];
      payload.concertsDisplayList.filteredObj = {};
      base.post(endpoint, {
        data: {
          artistsArray: payload.artistsArray,
          concertsDisplayList: payload.concertsDisplayList,
          userInfo: payload.userInfo
        }
      });
      dispatch({'type': RESET_CONCERTS_DISPLAY_LIST_FIREBASE, data: payload});
    })
  }
}