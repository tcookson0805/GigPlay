import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import base from '../../../config/firebase';


import Artist from '../components/artist';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadFirebaseEndpoint = this.loadFirebaseEndpoint.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  loadFirebaseEndpoint(endpoint){
    base.fetch(endpoint, {
      context: this
    }).then(data => {
      console.log('DATA', data)
      this.setState({
        artistsArray: data.artistsArray,
        concertsDisplayList: data.concertsDisplayList
      })
    })
  } 
  
  componentWillMount() {
    this.loadFirebaseEndpoint('users/tcookson0805');    
  }
  
  componentWillReceiveProps(nextProps) {
    // if(nextProps) {
    //   this.setState({artistArray: nextProps.artistArray})
    // }
  }
  
  handleClick(){
    console.log('hey')
  }
  
  render() {
        
    if(!this.state.artistsArray){
      return <div>loading...</div>
    }
    const that = this;
    return (
      <div className='artist-list col-md-12'>
        <h2>Artists</h2>
        <ul className='list-group'>
          { this.state.artistsArray.map(function(artist, index) {
            return <Artist name={artist} key={index} onClick={that.handleClick} className="artist" />
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