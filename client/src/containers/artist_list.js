import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Artist from '../components/artist';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      artistsArray : ["Dave Mathews", "Pearl Jam", "Metallica", "The Weeknd"]
    };
  }
  
  componentWillMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps)
    // if(nextProps) {
    //   this.setState({artistArray: nextProps.artistArray})
    // }
  }
  
  render() {
    return (
      <div className='artist-list col-md-12'>
        <h5>Artists</h5>
        <ul className='list-group'>
          { this.props.artistsArray.map(function(artist, index) {
            return <Artist name={artist} key={index} />
          })}
        </ul>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { data, concertsList } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, data, concertsList }
}

export default connect(mapStateToProps)(ArtistList);
// export default ArtistList;