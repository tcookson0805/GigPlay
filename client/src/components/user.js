import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyInfo, setTokens, getMyTracks, getConcerts }   from '../actions/actions';
import { routeActions } from 'react-router-redux';
import base from '../../../config/firebase';

const _ = require('underscore');
// const testList = ["The Lumineers", "Coldplay", "Drake", "Empire of the Sun"]
const testList = ["Empire of the Sun"]
 
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tracks: {},
      totalTracks: 0,
      trackCalls: 0,
      artistsArray: [],
      artistsObj: {},
      runGetConcerts: false,
      saveToFirebase: false,
      concertsList: [],
      concertsDisplayList: [], 
      artistsObjTM: {}, 
      artistsIdArray: [], 
      artistsIdString: ''
    }
    this.goToMainPage = this.goToMainPage.bind(this);
    this.loadFirebaseEndpoint = this.loadFirebaseEndpoint.bind(this);
    this.removeFirebaseEndpoint = this.removeFirebaseEndpoint.bind(this);
  }
 
  goToMainPage(evet) {
    this.props.router.push('/main');
  }
 
 //////// FIREBASE RELATED FUNCTIONS  ////////
 
  removeFirebaseEndpoint(endpoint){
    base.remove(endpoint, function(err) {
      if(!err){
        Router.transitionTo('dashboard');
      }
    })
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
 
 
  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentWillMount() {
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    this.props.setTokens({accessToken, refreshToken});
    this.props.getMyInfo();
    this.props.getMyTracks();
    
    // this.loadFirebaseEndpoint('users/tcookson0805');    
    // this.removeFirebaseEndpoint('users/tcookson0805');
  }
  
  componentWillReceiveProps(nextProps) {

    if(this.props.user.id !== null){
      this.setState({
        tracks: nextProps.tracks,
        totalTracks: nextProps.totalTracks, 
        trackCalls: nextProps.trackCalls, 
        artistsArray: nextProps.artistsArray,
        artistsObj: nextProps.artistsObj,

      // }, () => {
        
        // NEED THIS ONE FOR MAIN ////////
        // base.syncState(`users/${this.props.user.id}/artistsArray`, {
        //   context: this,
        //   state: 'artistsArray',
        //   asArray: true
        // });
        
        // base.syncState(`users/${this.props.user.id}/artistsObj`, {
        //   context: this,
        //   state: 'artistsObj'
        // });
        
        // base.syncState(`users/${this.props.user.id}/concertsList`, {
        //   context: this,
        //   state: 'concertsList'
        // });
        
        // NEED THIS ONE FOR MAIN ///////
        // base.syncState(`users/${this.props.user.id}/concertsDisplayList`, {
        //   context: this,
        //   state: 'concertsDisplayList'
        // });
        
        // base.syncState(`users/${this.props.user.id}/artistsObjTM`, {
        //   context: this,
        //   state: 'artistsObjTM'
        // });
        
        // base.syncState(`users/${this.props.user.id}/artistsIdArray`, {
        //   context: this,
        //   state: 'artistsIdArray'
        // });
        
        // base.syncState(`users/${this.props.user.id}/artistsIdString`, {
        //   context: this,
        //   state: 'artistsIdString'
        // });
      
      });
    }
    
    if(nextProps.saveToFirebase){
      this.setState({  
        concertsList: nextProps.concertsList,
        concertsDisplayList: nextProps.concertsDisplayList, 
        artistsObjTM: nextProps.artistsObjTM, 
        artistsIdArray: nextProps.artistsIdArray, 
        artistsIdString: nextProps.artistsIdString,
        saveToFirebase: nextProps.saveToFirebase 
      })   
    }
    
    if(nextProps.totalTracks === nextProps.tracksLoaded && this.state.runGetConcerts === false){   
      this.setState({runGetConcerts: true})

      // ########################################################
      this.props.getConcerts(testList);
      // this.props.getConcerts(nextProps.artistsArray);
      // ########################################################
    } 

  }

  /** Render the user's info */
  render() {

    const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsIdString, artistsIdArray, artistsObj, saveToFirebase  } = this.props;
    const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    const imageUrl = images[0] ? images[0].url : "";
    
  
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
          <button onClick={this.goToMainPage}>Go To Main Page</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { concertsList, concertsDisplayList, artistsObjTM, artistsIdArray, artistsIdString, saveToFirebase } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, concertsList, concertsDisplayList, artistsObjTM, artistsIdArray, artistsIdString, saveToFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, routeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);