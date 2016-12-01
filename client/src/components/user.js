import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getMyInfo, setTokens, getMyTracks, getMyArtists, getMyPlaylists, getPlaylistTracks }   from '../actions/actions';
import { getMyInfo, setTokens, getMyTracks, getConcerts }   from '../actions/actions';
const _ = require('underscore');

/**
 * Our user page
 * Displays the user's information
 */
 
const list = ["Pearl Jam", "Toto", "Dave Matthews Band", "WALK THE MOON", "Mike Posner", "Coldplay", "Foo Fighters", "Eddie Vedder", "Jimmy Fallon", "Jessi Malay"]
 
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalTracks: 0,
      trackCalls: 0,
      artistsArray: [],
      artistsObj: {},
      tracks: {},
      runGetConcerts: false
    }
  }
 
  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentWillMount() {
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    this.props.setTokens({accessToken, refreshToken});
    this.props.getMyInfo();
    this.props.getMyTracks();
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalTracks: nextProps.totalTracks, 
      trackCalls: nextProps.trackCalls, 
      artistsArray: nextProps.artistsArray,
      artistsObj: nextProps.artistsObj,
      tracks: nextProps.tracks
    })
    // console.log('nextProps.totalTracks', nextProps.totalTracks);
    // console.log('nextProps.tracksLoaded', nextProps.tracksLoaded);
    if(nextProps.totalTracks === nextProps.tracksLoaded && this.state.runGetConcerts === false){
      this.setState({runGetConcerts: true})
      console.log('nextProps', nextProps)
      this.props.getConcerts(nextProps.artistsArray);
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    // console.log('this.props', this.props)
    // console.log('nextProps', nextProps); 
  }
  
  componentDidUpdate(prevProps, prevState){
    
    // console.log('prevProps', prevProps);
    // console.log('this.props', this.props);
    // console.log('prevState', prevState);
    // console.log('this.state', this.state);
  }
  

  /** Render the user's info */
  render() {
    const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj  } = this.props;
    const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    const imageUrl = images[0] ? images[0].url : "";
  
    // console.log('render this.props', this.props)
    // if we're still loading, indicate such
    if (loading) {
      return <h2>Loading...</h2>;
    }
  
    return (
      <div className="user">
        <h2>{`Logged in as ${display_name}`}</h2>
        <div className="user-content">
          <img src={imageUrl} />
          <ul>
            <li><span>Display name: </span><span>{display_name}</span></li>
            <li><span>Id: </span><span>{id}</span></li>
            <li><span>Email: </span><span>{email}</span></li>
            <li><span>Spotify URI: </span><span><a href={external_urls.spotify}>{external_urls.spotify}</a></span></li>
            <li><span>Link: </span><span><a href={href}>{href}</a></span></li>
            <li><span>Profile Image: </span><span><a href={imageUrl}>{imageUrl}</a></span></li>
            <li><span>Country: </span><span>{country}</span></li>
            <li><span>Product: </span><span>{product}</span></li>
          </ul>
        </div>
        <div>
          <ul>
          </ul>
        </div>
        <div>
          <ul>
            {artistsArray.map(function(artist, index) {
              return <li key={index}>{artist}</li>
            })}
          </ul>
        </div>
      </div>
    );

  }
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { data, concertsList } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, data, concertsList }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);