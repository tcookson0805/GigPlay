import axios from 'axios'
import Spotify from 'spotify-web-api-js';
import base from '../../../config/firebase';

const _ = require('underscore');
const spotifyApi = new Spotify();

export const FETCH_CONCERTS_FIREBASE = 'FETCH_CONCERTS_FIREBASE'
export const UPDATE_CONCERTS_FIREBASE = 'UPDATE_CONCERTS_FIREBASE'


export function getConcertsFirebase(context, endpoint){  
  return dispatch => {
    base.fetch(endpoint, {
      context: context
    }).then(data => {
      console.log('DATA', data)
      let payload = {
        artistsArray: data.artistsArray,
        concertsDisplayList: data.concertsDisplayList
      }  
      dispatch({'type': FETCH_CONCERTS_FIREBASE, data: payload});
    })
  }
}

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