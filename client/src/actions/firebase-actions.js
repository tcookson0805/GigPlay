import axios from 'axios'
import Spotify from 'spotify-web-api-js';
import base from '../../../config/firebase';

const _ = require('underscore');
const spotifyApi = new Spotify();

export const FETCH_CONCERTS_FIREBASE = 'FETCH_CONCERTS_FIREBASE'
export const UPDATE_CONCERTS_FIREBASE = 'UPDATE_CONCERTS_FIREBASE'
export const FETCH_ARTISTS_ARRAY_FIREBASE = 'FETCH_ARTISTS_ARRAY_FIREBASE'
export const FETCH_USER_INFO_FIREBASE = 'FETCH_USER_INFO_FIREBASE'
export const RESET_CONCERTS_DISPLAY_LIST_FIREBASE = 'RESET_CONCERTS_DISPLAY_LIST_FIREBASE'

export function getConcertsFirebase(context, endpoint){  
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      console.log('DATA', data)
      let payload = data
      payload.concertsDisplayList.filteredList = [];
      payload.concertsDisplayList.filteredObj = {};
      return payload
    })
    .then( data => {
      console.log('data', data)
      let payload = {
        concertsDisplayList: data.concertsDisplayList,
      }
      dispatch({'type': FETCH_CONCERTS_FIREBASE, data: payload});
    });
  }
}

export function getArtistsArrayFirebase(context, endpoint) {
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      let payload = {
        artistsArray: data.artistsArray
      }
      dispatch({'type': FETCH_ARTISTS_ARRAY_FIREBASE, data: payload});
    })
  }
}

export function getUserInfoFirebase(context, endpoint) {
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      console.log('DATA', data)
      let payload = {
        userInfo: data.userInfo
      }
      dispatch({'type': FETCH_USER_INFO_FIREBASE, data: payload});
    })
  }
}


export function updateConcertsDisplayList(endpoint, context, artistName, selected) {
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    })
    .then(data => {
      let payload = data;
      
      if(!payload.concertsDisplayList.filteredList){
        payload.concertsDisplayList.filteredList = [];
      }      
      if(!payload.concertsDisplayList.filteredObj){
        payload.concertsDisplayList.filteredObj = {};
      }
      
      return payload
      
    })
    .then(data => {
      let payload = data;
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
      console.log('selected', selected)
      if(selected){
        delete payload.concertsDisplayList.filteredObj[artistName];
        let hold3 = _.filter(payload.concertsDisplayList.filteredList, function(item){ return item.artist !== artistName })
        payload.concertsDisplayList.filteredList = hold3;
      }
      return payload
    })
    .then(data => {
      console.log('data', data)
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
    base.fetch(endpoint, {
      context: context
    })
    .then( data => {
      if(!data.concertsDisplayList.filteredList){
        data.concertsDisplayList['filteredList'] = []
      }
      
      if(!data.concertsDisplayList.filteredObj){
        data.concertsDisplayList['filteredObj'] = {}
      }
      return data
    })
    .then( data => {
       let payload = data;
       payload.concertsDisplayList.filteredList.push(artistName);
       
       dispatch({'type': ADD_TO_FILTERED_FIREBASE, data: payload});
    })
  }
}


export function resetConcertsDisplayList(endpoint, context){
  return dispatch => {
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