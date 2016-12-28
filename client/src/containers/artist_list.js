import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import base from '../../../config/firebase';
import { getMyInfo, setTokens, getMyTracks, getConcerts }   from '../actions/actions';
import { getArtistsArrayFirebase } from '../actions/firebase-actions';

import Artist from '../components/artist';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    
    let { artistsArray, artistsArrayFirebase } = this.props
    
    console.log('ARTIST LIST ------- render this.props', this.props)
    
    if(!artistsArray && artistsArrayFirebase){
      artistsArray = artistsArrayFirebase
    }
            
    if(!this.props.concertsDisplayListFirebase){
      return (
        <div className='artist-list col-md-12'>
          <div className="artist-list-header">
            <h2>FILTER BY ARTIST</h2>
          </div>
          <div className='list-group'>
            Loading ...
          </div>
        </div>
      )
    }
    
    const that = this;
    return (
      <div className='artist-list col-md-12'>
        <div className="artist-list-header">
          <h2>FILTER BY ARTIST</h2>
        </div>
        <div className='list-group'>
          <div></div>
          { artistsArray.map(function(artist, index) {
            return <Artist name={artist} key={index} className="artist" />
          })}
        </div>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  let { artistsArray, concertsDisplayList } = state.tracks;
  let { artistsArrayFirebase, concertsDisplayListFirebase } = state.firebase;  
  return { artistsArray, artistsArrayFirebase, concertsDisplayList, concertsDisplayListFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, getArtistsArrayFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
