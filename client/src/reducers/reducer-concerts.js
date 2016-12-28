import { FETCH_CONCERTS } from '../actions/actions';

const initialState = {

};


function concertsReducer (state = initialState, action) {

  switch (action.type) {

  case FETCH_CONCERTS:
    console.log('FETCH_CONCERTS action.data', action.data)
    return Object.assign({}, state, {
      concertsList: action.data.concertsList,
      concertsDisplayList: action.data.concertsDisplayList,
      artistsObjTM: action.data.artistsObjTM,
      artistsIdArray: action.data.artistsIdArray,
      artistsIdString: action.data.artistsIdString,
      getConcertsRan: true
    });
    
  default:
    return state;
  }
}

export default concertsReducer;