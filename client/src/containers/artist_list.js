import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import base from '../../../config/firebase';
import { getMyInfo, setTokens, getMyTracks, getConcerts }   from '../actions/actions';
import { getArtistsArrayFirebase } from '../actions/firebase-actions';
import Loading from 'react-loading'

import Artist from '../components/artist';
import ArtistAll from '../components/artist_all.js';
import ArtistNone from '../components/artist_none.js';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    console.log('ARTIST LIST ------- componentWillMount this.props', this.props)
  }  

  render() {
    
    const { artistsArray, artistsArrayFirebase, concertsDisplayList, concertsDisplayListFirebase } = this.props
    
    console.log('ARTIST LIST ------- render this.props', this.props)
    
    const artistsList = artistsArrayFirebase || artistsArray;
    const displayList = concertsDisplayListFirebase || concertsDisplayList;
    let totalList;
    let filteredList;
    let filteredObj;
    let totalObj;

    if(displayList) {
      totalList = displayList.totalList || [];
      filteredList = displayList.filteredList || [];
      filteredObj = displayList.filteredObj || {};
      totalObj = displayList.totalObj || {}
    }

    if(!displayList) {
      return (
        <div className='artist-list col-md-12'>
          <div className="artist-list-header">
            <h2>FILTER BY ARTIST</h2>
          </div>
          <div className='list-group'>


            <div className="loading">
              Loading 
            </div>
            
            <div className="loader">
              <img src="../../style/images/loading.svg" alt=""/>
            </div>
            
          </div>
        </div>
      )    
    }

    return (
      <div className='artist-list col-md-12'>
        <div className="artist-list-header">
          <h2>FILTER BY ARTIST</h2>
        </div>
        <div className='list-group'>
          <div></div>
          { artistsList.map(function(artist, index) {
            if(artist === 'ALL ARTISTS') {
              return <ArtistAll name={artist} key={index} concerts={totalList} filtered={filteredObj[artist]} className="artist" />
            } else {
              if(!totalObj[artist] || !totalObj[artist].length){
                return <ArtistNone name={artist} key={index} filtered={filteredObj[artist]} className="artist" />
              } else {
                return <Artist name={artist} key={index} concerts={totalObj[artist]} filtered={filteredObj[artist]} className="artist" />
              } 
            }
          })}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { artistsArray } = state.tracks;
  const { concertsDisplayList } = state.concerts;
  const { artistsArrayFirebase, concertsDisplayListFirebase } = state.firebase;  
  return { artistsArray, artistsArrayFirebase, concertsDisplayList, concertsDisplayListFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, getArtistsArrayFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
