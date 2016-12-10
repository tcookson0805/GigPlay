import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import base from '../../../config/firebase';
import { getMyInfo, setTokens, getMyTracks, getConcerts, getConcertsFirebase }   from '../actions/actions';

import Artist from '../components/artist';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
  }

  render() {
    
    console.log('this.props', this.props)
        
    if(!this.props.artistsArray){
      return <div>loading...</div>
    }
    const that = this;
    return (
      <div className='artist-list col-md-12'>
        <h2>Artists</h2>
        <ul className='list-group'>
          { this.props.artistsArray.map(function(artist, index) {
            return <Artist name={artist} key={index} className="artist" />
          })}
        </ul>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  const { artistsArray } = state.concerts;
  return { artistsArray }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, getConcertsFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
// export default ArtistList;